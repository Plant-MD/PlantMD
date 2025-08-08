import { NextResponse } from 'next/server';
import { checkDatabaseHealth, getReadyStateDescription } from '@/lib/dbHealth';

export async function GET() {
  try {
    const dbHealth = await checkDatabaseHealth();
    
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