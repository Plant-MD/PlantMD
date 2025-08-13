import { NextResponse } from 'next/server';
import { checkDatabaseHealth, getReadyStateDescription } from '@/lib/dbHealth';
import dns from 'node:dns/promises';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dbHealth = await checkDatabaseHealth();

    // Resolve which env var is set and sanitize URI for debugging
    const uri =
      process.env.MONGODB_URI ||
      process.env.DATABASE_URL ||
      process.env.MONGODB_ATLAS_URI ||
      process.env.NEXT_PUBLIC_MONGODB_URI || '';

    const selectedEnvVar = process.env.MONGODB_URI
      ? 'MONGODB_URI'
      : process.env.DATABASE_URL
      ? 'DATABASE_URL'
      : process.env.MONGODB_ATLAS_URI
      ? 'MONGODB_ATLAS_URI'
      : process.env.NEXT_PUBLIC_MONGODB_URI
      ? 'NEXT_PUBLIC_MONGODB_URI'
      : 'NONE';

    const sanitizedURI = uri ? uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') : '';
    const host = (() => {
      try {
        const withoutProtocol = uri.replace(/^mongodb(\+srv)?:\/\//, '');
        const atSplit = withoutProtocol.split('@');
        const hostAndDb = (atSplit.length > 1 ? atSplit[1] : atSplit[0]).split('/');
        return hostAndDb[0];
      } catch {
        return 'unknown';
      }
    })();

    // If mongodb+srv, attempt SRV DNS lookup to expose common local DNS issues
    let dnsSrvCheck: any = null;
    if (/^mongodb\+srv:/.test(uri) && host) {
      try {
        const record = await dns.resolveSrv(`_mongodb._tcp.${host}`);
        dnsSrvCheck = { ok: true, targets: record.map(r => `${r.name}:${r.port}`) };
      } catch (err: any) {
        dnsSrvCheck = { ok: false, error: err?.message || String(err) };
      }
    }
    
    const healthStatus = {
      status: dbHealth.isConnected ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: dbHealth.isConnected,
        readyState: dbHealth.readyState,
        readyStateDescription: getReadyStateDescription(dbHealth.readyState),
        host: dbHealth.host || 'unknown',
        error: dbHealth.error
      },
      env: {
        selectedEnvVar,
        sanitizedURI,
        hasMONGODB_URI: Boolean(process.env.MONGODB_URI),
        hasDATABASE_URL: Boolean(process.env.DATABASE_URL),
        hasMONGODB_ATLAS_URI: Boolean(process.env.MONGODB_ATLAS_URI),
        hasNEXT_PUBLIC_MONGODB_URI: Boolean(process.env.NEXT_PUBLIC_MONGODB_URI),
        nodeEnv: process.env.NODE_ENV,
      },
      dnsSrvCheck,
      services: {
        api: 'operational',
        analysis: 'operational'
      }
    };

    const statusCode = dbHealth.isConnected ? 200 : 503;
    
    return NextResponse.json(healthStatus, { status: statusCode });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message
    }, { status: 500 });
  }
}