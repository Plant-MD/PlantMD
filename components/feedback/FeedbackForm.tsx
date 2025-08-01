// components/feedback/FeedbackForm.tsx
'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  validateFeedbackForm,
  submitFeedback,
  FeedbackErrors
} from '@/types/feedback';
import {
  FeedbackTypeSelector,
  StarRating,
  FeedbackTextarea,
  SuccessScreen
} from './FormComponents';

interface FeedbackFormProps {
  userEmail: string;
  userId: string;
}

export default function FeedbackForm({ userEmail, userId }: FeedbackFormProps) {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FeedbackErrors>({});
  const [submitError, setSubmitError] = useState<string>('');

  const handleRatingChange = (starRating: number) => {
    setRating(starRating);
    setErrors(prev => ({ ...prev, rating: undefined }));
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setErrors(prev => ({ ...prev, type: undefined }));
  };

  const handleFeedbackChange = (value: string) => {
    setFeedback(value);
    setErrors(prev => ({ ...prev, feedback: undefined }));
  };

  const handleBackToDashboard = () => {
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const formData = { rating, feedback, selectedType };
    const validation = validateFeedbackForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      await submitFeedback({
        email: userEmail,
        userID: userId,
        stars: rating,
        description: feedback.trim(),
        type: selectedType,
      });

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setRating(0);
        setFeedback('');
        setSelectedType('');
        setErrors({});
      }, 5000);

    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <SuccessScreen rating={rating} onBackToDashboard={handleBackToDashboard} />;
  }

  return (
    <Card className="border-none bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 backdrop-blur-sm">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <FeedbackTypeSelector
            selectedType={selectedType}
            onTypeSelect={handleTypeSelect}
            error={errors.type}
          />

          <StarRating
            rating={rating}
            onRatingChange={handleRatingChange}
            error={errors.rating}
          />

          <FeedbackTextarea
            value={feedback}
            onChange={handleFeedbackChange}
            error={errors.feedback}
          />

          {submitError && (
            <div className="p-4 bg-warning-red/10 border border-warning-red/30 rounded-lg">
              <p className="text-sm text-warning-red">{submitError}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold bg-deep-mint text-white hover:bg-deep-mint shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending Feedback...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Send Feedback</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
