// Minimal mock disease + cure data for local development fallback
// Used only when database is unavailable and NODE_ENV !== 'production'

export type MockDisease = {
  _id: string
  disease_code: string
  disease_name: string
  scientific_name: string
  common_plants: string[]
  category: string
  risk_factor: string
}

export type MockCure = {
  _id: string
  disease_id: string
  disease: string
  cure: string[]
  createdAt: string
  updatedAt: string
}

type MockEntry = {
  disease: MockDisease
  cure: MockCure
}

// Generated lightweight IDs for dev only
const id = (seed: string) => `mock_${seed}`

export const MOCK_DISEASE_DATA: Record<string, MockEntry> = {
  Late_blight: {
    disease: {
      _id: id('late_blight_d'),
      disease_code: 'LB',
      disease_name: 'Late_blight',
      scientific_name: 'Phytophthora infestans',
      common_plants: ['Tomato', 'Potato'],
      category: 'Fungal',
      risk_factor: 'High',
    },
    cure: {
      _id: id('late_blight_c'),
      disease_id: id('late_blight_d'),
      disease: 'Late_blight',
      cure: [
        'Remove and destroy infected leaves',
        'Avoid overhead watering; water at soil level',
        'Apply copper-based fungicide as labeled',
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  Early_blight: {
    disease: {
      _id: id('early_blight_d'),
      disease_code: 'EB',
      disease_name: 'Early_blight',
      scientific_name: 'Alternaria solani',
      common_plants: ['Tomato', 'Potato'],
      category: 'Fungal',
      risk_factor: 'Medium',
    },
    cure: {
      _id: id('early_blight_c'),
      disease_id: id('early_blight_d'),
      disease: 'Early_blight',
      cure: [
        'Prune lower leaves to improve airflow',
        'Mulch to reduce soil splash',
        'Rotate crops and avoid planting in the same spot yearly',
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  Bacterial_spot: {
    disease: {
      _id: id('bacterial_spot_d'),
      disease_code: 'BS',
      disease_name: 'Bacterial_spot',
      scientific_name: 'Xanthomonas spp.',
      common_plants: ['Tomato', 'Pepper'],
      category: 'Bacterial',
      risk_factor: 'Medium',
    },
    cure: {
      _id: id('bacterial_spot_c'),
      disease_id: id('bacterial_spot_d'),
      disease: 'Bacterial_spot',
      cure: [
        'Remove infected plant material',
        'Use copper-based sprays preventively',
        'Practice strict garden hygiene; sanitize tools',
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  Tomato_Yellow_Leaf_Curl_Virus: {
    disease: {
      _id: id('tylcv_d'),
      disease_code: 'TYLCV',
      disease_name: 'Tomato_Yellow_Leaf_Curl_Virus',
      scientific_name: 'Begomovirus (TYLCV)',
      common_plants: ['Tomato'],
      category: 'Viral',
      risk_factor: 'High',
    },
    cure: {
      _id: id('tylcv_c'),
      disease_id: id('tylcv_d'),
      disease: 'Tomato_Yellow_Leaf_Curl_Virus',
      cure: [
        'Control whiteflies; use insect-proof netting',
        'Remove and destroy infected plants',
        'Use resistant varieties when available',
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  healthy: {
    disease: {
      _id: id('healthy_d'),
      disease_code: 'HEALTHY',
      disease_name: 'healthy',
      scientific_name: 'None',
      common_plants: ['Tomato', 'Corn'],
      category: 'None',
      risk_factor: 'None',
    },
    cure: {
      _id: id('healthy_c'),
      disease_id: id('healthy_d'),
      disease: 'healthy',
      cure: ['Plant appears healthy. Maintain regular care.'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
}


