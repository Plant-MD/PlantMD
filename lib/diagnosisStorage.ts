/**
 * Diagnosis Storage Utility
 * Manages localStorage for plant disease diagnosis data
 */

export interface PredictionData {
  class: string;
  confidence: number;
}

export interface DiagnosisSession {
  id: string;
  timestamp: number;
  plantType: 'tomato' | 'corn';
  imageData?: string;
  predictions: PredictionData[];
  status: 'analyzing' | 'completed' | 'error';
  error?: string;
}

export interface EnhancedDiseaseData {
  success: boolean;
  disease: {
    _id: string;
    disease_code: string;
    disease_name: string;
    scientific_name: string;
    common_plants: string[];
    category: string;
    risk_factor: string;
  };
  cure: {
    _id: string;
    disease_id: string;
    disease: string;
    cure: string[];
    createdAt: string;
    updatedAt: string;
  };
  confidence: number;
}

const STORAGE_KEY = 'plant_diagnosis_session';
const STORAGE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export class DiagnosisStorage {
  /**
   * Create a new diagnosis session
   */
  static createSession(plantType: 'tomato' | 'corn', imageData?: string): string {
    const sessionId = `diagnosis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const session: DiagnosisSession = {
      id: sessionId,
      timestamp: Date.now(),
      plantType,
      imageData,
      predictions: [],
      status: 'analyzing'
    };

    this.saveSession(session);
    return sessionId;
  }

  /**
   * Update session with predictions from analysis
   */
  static updateSessionWithPredictions(sessionId: string, predictions: PredictionData[]): void {
    const session = this.getSession(sessionId);
    if (session) {
      session.predictions = predictions;
      session.status = 'completed';
      this.saveSession(session);
    }
  }

  /**
   * Update session with error
   */
  static updateSessionWithError(sessionId: string, error: string): void {
    const session = this.getSession(sessionId);
    if (session) {
      session.status = 'error';
      session.error = error;
      this.saveSession(session);
    }
  }

  /**
   * Get current session
   */
  static getCurrentSession(): DiagnosisSession | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const session: DiagnosisSession = JSON.parse(stored);
      
      // Check if session is expired
      if (Date.now() - session.timestamp > STORAGE_EXPIRY) {
        this.clearSession();
        return null;
      }

      return session;
    } catch (error) {
      console.error('Error reading diagnosis session:', error);
      return null;
    }
  }

  /**
   * Get session by ID
   */
  static getSession(sessionId: string): DiagnosisSession | null {
    const current = this.getCurrentSession();
    return current?.id === sessionId ? current : null;
  }

  /**
   * Save session to localStorage
   */
  private static saveSession(session: DiagnosisSession): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch (error) {
      console.error('Error saving diagnosis session:', error);
    }
  }

  /**
   * Clear current session
   */
  static clearSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing diagnosis session:', error);
    }
  }

  /**
   * Store enhanced disease data for offline access
   */
  static storeDiseaseData(sessionId: string, diseaseData: EnhancedDiseaseData[]): void {
    try {
      const key = `disease_data_${sessionId}`;
      localStorage.setItem(key, JSON.stringify({
        timestamp: Date.now(),
        data: diseaseData
      }));
    } catch (error) {
      console.error('Error storing disease data:', error);
    }
  }

  /**
   * Get stored disease data
   */
  static getDiseaseData(sessionId: string): EnhancedDiseaseData[] | null {
    try {
      const key = `disease_data_${sessionId}`;
      const stored = localStorage.getItem(key);
      if (!stored) return null;

      const parsed = JSON.parse(stored);
      
      // Check if data is expired (1 hour)
      if (Date.now() - parsed.timestamp > 60 * 60 * 1000) {
        localStorage.removeItem(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.error('Error reading disease data:', error);
      return null;
    }
  }

  /**
   * Clean up old sessions and data
   */
  static cleanup(): void {
    try {
      const keys = Object.keys(localStorage);
      const now = Date.now();

      keys.forEach(key => {
        if (key.startsWith('disease_data_') || key === STORAGE_KEY) {
          try {
            const stored = localStorage.getItem(key);
            if (stored) {
              const parsed = JSON.parse(stored);
              const expiry = key === STORAGE_KEY ? STORAGE_EXPIRY : 60 * 60 * 1000;
              
              if (now - parsed.timestamp > expiry) {
                localStorage.removeItem(key);
              }
            }
          } catch {
            // Remove corrupted data
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }
}

// Auto cleanup on page load
if (typeof window !== 'undefined') {
  DiagnosisStorage.cleanup();
}