import mongoose from 'mongoose';
import dbConnect from './dbConnect';

export interface DatabaseHealth {
  isConnected: boolean;
  readyState: number;
  host?: string;
  error?: string;
  lastChecked: string;
}

export async function checkDatabaseHealth(): Promise<DatabaseHealth> {
  const health: DatabaseHealth = {
    isConnected: false,
    readyState: mongoose.connection.readyState,
    lastChecked: new Date().toISOString()
  };

  try {
    // If not connected, try to connect
    if (mongoose.connection.readyState !== 1) {
      await dbConnect();
    }

    health.isConnected = mongoose.connection.readyState === 1;
    health.readyState = mongoose.connection.readyState;
    health.host = mongoose.connection.host;

    // Test with a simple query if connected
    if (health.isConnected) {
      await mongoose.connection.db.admin().ping();
    }
  } catch (error: any) {
    health.error = error.message;
    health.isConnected = false;
  }

  return health;
}

export function getReadyStateDescription(state: number): string {
  switch (state) {
    case 0: return 'Disconnected';
    case 1: return 'Connected';
    case 2: return 'Connecting';
    case 3: return 'Disconnecting';
    default: return 'Unknown';
  }
}