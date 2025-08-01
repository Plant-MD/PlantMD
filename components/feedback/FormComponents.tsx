// components/feedback/FormComponents.tsx
'use client';

import { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createFeedbackTypes, getRatingText, FeedbackErrors } from '@/types/feedback';

const feedbackTypes = createFeedbackTypes();

interface FeedbackTypeSelectorProps {
  selectedType: string;
  onTypeSelect: (typeId: string) => void;
  error?: string;
}

export function FeedbackTypeSelector({ selectedType, onTypeSelect, error }: FeedbackTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base  font-roboto text-gray-900">What type of feedback is this?</Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {feedbackTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onTypeSelect(type.id)}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200 text-sm font-roboto
              flex items-center justify-center space-x-2 hover:scale-105 hover:shadow-md
              ${selectedType === type.id 
                ? `${type.color} border-current shadow-md` 
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }
            `}
          >
            {type.icon}
            <span>{type.label}</span>
          </button>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-600 animate-fade-in">{error}</p>
      )}
    </div>
  );
}

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  error?: string;
}
export function StarRating({
  rating,
  onRatingChange,
  error,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarHover = (star: number) => setHoverRating(star);
  const handleStarLeave = () => setHoverRating(0);
  const handleStarClick = (star: number) => onRatingChange(star);

  return (
    <div className="space-y-3">
      <Label className="text-base font-roboto text-gray-900">
        How would you rate your experience?
      </Label>

      <div
        className="flex space-x-1"
        onMouseLeave={handleStarLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => handleStarHover(star)}
            onClick={() => handleStarClick(star)}
            className="
              p-1 rounded-full
              transform transition-transform duration-200
              hover:scale-110 hover:bg-yellow-50
              focus:outline-none
            "
          >
            <Star
              className={`
                w-8 h-8
                transition-colors duration-200
                ${star <= (hoverRating || rating)
                  ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                  : "text-gray-300 hover:text-yellow-300"
                }
              `}
            />
          </button>
        ))}
      </div>

      {(rating > 0 || hoverRating > 0) && (
        <p className="text-sm font-medium text-gray-700">
          {getRatingText(hoverRating || rating)}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}


interface FeedbackTextareaProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function FeedbackTextarea({ value, onChange, error }: FeedbackTextareaProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="feedback" className="text-base font-roboto text-gray-900">
        Tell us more about your experience
      </Label>
      <div className="relative">
        <Textarea
          id="feedback"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="What did you like? What could we improve? Any specific features you'd love to see?"
          className={`min-h-[120px] resize-none text-base leading-relaxed transition-all duration-200 font-roboto${
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
          }`}
          maxLength={500}
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
          {value.length}/500
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600 animate-fade-in">{error}</p>
      )}
    </div>
  );
}

interface SuccessScreenProps {
  rating: number;
  onBackToDashboard: () => void;
}

export function SuccessScreen({ rating, onBackToDashboard }: SuccessScreenProps) {
  return (
    <div className=" bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">Your feedback has been submitted successfully.</p>
          <div className="flex justify-center space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">We appreciate your {getRatingText(rating).toLowerCase()} review!</p>
          <Button 
            onClick={onBackToDashboard}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700"
          >
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}