import { Leaf, Heart, MessageCircle } from 'lucide-react';

export interface FeedbackType {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export const createFeedbackTypes = (): FeedbackType[] => [
  { id: 'suggestion', label: 'Suggestion', icon: <Leaf className="w-4 h-4" />, color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'compliment', label: 'Compliment', icon: <Heart className="w-4 h-4" />, color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { id: 'issue', label: 'Issue', icon: <MessageCircle className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700 border-blue-200' },
];

export const feedbackTypes = createFeedbackTypes();

export const getRatingText = (currentRating: number): string => {
  const texts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  return texts[currentRating] || '';
};

export interface FeedbackFormData {
  rating: number;
  feedback: string;
  selectedType: string;
}

export interface FeedbackErrors {
  rating?: string;
  feedback?: string;
  type?: string;
}

export const validateFeedbackForm = (formData: FeedbackFormData): { isValid: boolean; errors: FeedbackErrors } => {
  const errors: FeedbackErrors = {};
  
  if (!formData.rating) {
    errors.rating = 'Please select a rating';
  }
  
  if (!formData.feedback.trim()) {
    errors.feedback = 'Please write your feedback';
  } else if (formData.feedback.trim().length < 5) {
    errors.feedback = 'Please provide more detailed feedback (at least 5 characters)';
  } else if (formData.feedback.trim().length > 500) {
    errors.feedback = 'Feedback cannot exceed 500 characters';
  }
  
  if (!formData.selectedType) {
    errors.type = 'Please select a feedback type';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const submitFeedback = async (params: {
  email: string;
  userID: string;
  stars: number;
  description: string;
  type: string;
}) => {
  const response = await fetch('/api/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  
  const data = await response.json();
  
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to submit feedback. Please try again.');
  }
  
  return data;
};