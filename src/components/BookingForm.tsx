import { useState } from 'react';
import type { Language } from '@/types';
import { t } from '@/utils/translations';
import { cn } from '@/utils/cn';

interface BookingFormProps {
  lang: Language;
}

export default function BookingForm({ lang }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      preferredDate: formData.get('preferredDate'),
      preferredTime: formData.get('preferredTime'),
      kakaoId: formData.get('kakaoId'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        e.currentTarget.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          {t('booking.form.name', lang)}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          {t('booking.form.email', lang)}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="input"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium mb-2">
            {t('booking.form.date', lang)}
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            required
            className="input"
          />
        </div>

        <div>
          <label htmlFor="preferredTime" className="block text-sm font-medium mb-2">
            {t('booking.form.time', lang)}
          </label>
          <input
            type="time"
            id="preferredTime"
            name="preferredTime"
            required
            className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="kakaoId" className="block text-sm font-medium mb-2">
          {t('booking.form.kakao', lang)}
        </label>
        <input
          type="text"
          id="kakaoId"
          name="kakaoId"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t('booking.form.message', lang)}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="reference" className="block text-sm font-medium mb-2">
          {t('booking.form.reference', lang)}
        </label>
        <input
          type="file"
          id="reference"
          name="reference"
          accept="image/*"
          className="input"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'btn-primary w-full',
            isSubmitting && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isSubmitting ? '...' : t('booking.form.submit', lang)}
        </button>
      </div>

      {submitStatus === 'success' && (
        <p className="text-green-400 text-center">
          {t('booking.form.success', lang)}
        </p>
      )}

      {submitStatus === 'error' && (
        <p className="text-red-400 text-center">
          {t('booking.form.error', lang)}
        </p>
      )}
    </form>
  );
} 