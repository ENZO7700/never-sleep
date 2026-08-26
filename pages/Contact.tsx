import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(values: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  } else if (values.name.trim().length > 100) {
    errors.name = 'Name must be 100 characters or fewer';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (values.email.trim().length > 254 || !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (values.message.trim().length > 5000) {
    errors.message = 'Message must be 5000 characters or fewer';
  }

  return errors;
}

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError(null);
    setNotConfigured(false);
    setIsSuccess(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validateForm(form);
    setFieldErrors(errors);
    setSubmitError(null);
    setNotConfigured(false);
    setIsSuccess(false);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 503 && data.error === 'not configured') {
        setNotConfigured(true);
        return;
      }

      if (!response.ok) {
        setSubmitError(typeof data.error === 'string' ? data.error : 'Unable to send message');
        return;
      }

      setIsSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch {
      setSubmitError('Unable to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-text-primary mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-text-secondary max-w-[60ch]">
            Have questions about RubberDuck.Space? Send us a message and we will get back to you.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          noValidate
          className="glass-card p-8 md:p-10 border-white/[0.08] space-y-6"
        >
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-text-secondary mb-2">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              autoComplete="name"
              data-testid="contact-name"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-yellow/50 transition-colors"
            />
            {fieldErrors.name && (
              <p className="mt-2 text-sm text-red-400">{fieldErrors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-text-secondary mb-2">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              autoComplete="email"
              data-testid="contact-email"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-yellow/50 transition-colors"
            />
            {fieldErrors.email && (
              <p className="mt-2 text-sm text-red-400">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-text-secondary mb-2">
              Message
            </label>
            <textarea
              id="contact-message"
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
              rows={6}
              data-testid="contact-message"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-yellow/50 transition-colors resize-y min-h-[160px]"
            />
            {fieldErrors.message && (
              <p className="mt-2 text-sm text-red-400">{fieldErrors.message}</p>
            )}
          </div>

          {isSuccess && (
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <p>Thanks for reaching out. Your message has been sent.</p>
            </div>
          )}

          {notConfigured && (
            <div className="flex items-start gap-3 rounded-lg border border-yellow/30 bg-yellow/10 p-4 text-sm text-yellow">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>
                The contact form is not configured yet on this deployment. Please open an issue on{' '}
                <a
                  href="https://github.com/ENZO7700/never-sleep"
                  className="underline hover:text-white transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>{' '}
                or reach out through your usual RubberDuck.Space channel.
              </p>
            </div>
          )}

          {submitError && (
            <div className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{submitError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            data-testid="contact-submit"
            className="inline-flex items-center justify-center gap-2 bg-yellow text-space font-semibold px-6 py-3 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send message
              </>
            )}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
