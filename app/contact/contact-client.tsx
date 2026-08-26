"use client";

import { useState, useEffect } from 'react';
import type React from 'react';
import { Container } from '@/components/container';
import { LINKS, PROFILE } from '@/lib/site';
import { Breadcrumb } from '@/components/breadcrumb';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/button';
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react';

type Intent = 'industry' | 'collaboration' | 'speaking' | 'student' | 'other';

const INTENT_OPTIONS: { value: Intent; label: string; subjectPrefix: string }[] = [
  { value: 'industry', label: 'Industry role', subjectPrefix: 'Industry Role Inquiry' },
  { value: 'collaboration', label: 'Academic collaboration', subjectPrefix: 'Research Collaboration' },
  { value: 'speaking', label: 'Speaking invitation', subjectPrefix: 'Speaking Invitation' },
  { value: 'student', label: 'Student inquiry', subjectPrefix: 'Student Inquiry' },
  { value: 'other', label: 'Other', subjectPrefix: '' },
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    intent: '' as Intent | '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  // Auto-prefill subject when intent changes
  useEffect(() => {
    if (formData.intent) {
      const intentOption = INTENT_OPTIONS.find((opt) => opt.value === formData.intent);
      if (intentOption && intentOption.subjectPrefix) {
        setFormData((prev) => ({
          ...prev,
          subject: prev.subject.startsWith(intentOption.subjectPrefix)
            ? prev.subject
            : `${intentOption.subjectPrefix}: `,
        }));
      }
    }
  }, [formData.intent]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.intent) {
      newErrors.intent = 'Please select an intent';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        affiliation: '',
        intent: '',
        subject: '',
        message: '',
      });
      setTurnstileToken('');

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again or reach out directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <main id="main-content" className="flex-1 pt-16">
      <Container className="pt-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contact' },
          ]}
        />
      </Container>

      <section className="py-12">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Get in touch"
            className="mb-4"
          />
          <p className="text-lg text-fg-muted max-w-3xl mb-12">
            For research collaborations, industry roles, speaking invitations, or student inquiries.
          </p>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-8">
            {/* Left column - Form (60%) */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-bg-elev border rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-bg-elev border rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Affiliation */}
                <div>
                  <label htmlFor="affiliation" className="block text-sm font-medium mb-2">
                    Affiliation
                  </label>
                  <input
                    type="text"
                    id="affiliation"
                    name="affiliation"
                    value={formData.affiliation}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-bg-elev border border-border rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
                    placeholder="University, company, or organization"
                  />
                </div>

                {/* Intent */}
                <div>
                  <label htmlFor="intent" className="block text-sm font-medium mb-2">
                    Intent <span className="text-accent">*</span>
                  </label>
                  <select
                    id="intent"
                    name="intent"
                    value={formData.intent}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-bg-elev border rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors ${
                      errors.intent ? 'border-red-500' : 'border-border'
                    }`}
                  >
                    <option value="">Select an option</option>
                    {INTENT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.intent && (
                    <p className="text-sm text-red-500 mt-1">{errors.intent}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-bg-elev border rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors ${
                      errors.subject ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Brief subject line"
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-500 mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-2.5 bg-bg-elev border rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors resize-y ${
                      errors.message ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Tell me more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">{errors.message}</p>
                  )}
                  <p className="text-xs text-fg-muted mt-1">
                    Minimum 20 characters
                  </p>
                </div>

                {/* Cloudflare Turnstile placeholder */}
                <div className="bg-border/30 border border-border rounded-[var(--radius-md)] p-4 flex items-center justify-center">
                  <span className="text-sm text-fg-muted">Cloudflare Turnstile Widget</span>
                </div>

                {/* Submit button */}
                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send message
                      </>
                    )}
                  </Button>
                </div>

                {/* Success message */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-[var(--radius-md)] text-green-700 dark:text-green-400">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">
                      Message sent successfully! I'll get back to you within 2-3 business days.
                    </p>
                  </div>
                )}

                {/* Error message */}
                {submitStatus === 'error' && (
                  <div className="flex items-start gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-[var(--radius-md)] text-red-700 dark:text-red-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Failed to send message</p>
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Right column - Direct contact (40%) */}
            <div className="lg:col-span-2">
              <div className="bg-bg-elev border border-border rounded-[var(--radius-lg)] p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">
                  Or reach out directly
                </h3>
                <div className="space-y-4">
                  <a
                    href={LINKS.email}
                    className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-border/30 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium group-hover:text-accent transition-colors">
                        Email
                      </div>
                      <div className="text-sm text-fg-muted truncate">
                        {PROFILE.email}
                      </div>
                    </div>
                  </a>

                  <a
                    href={LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-border/30 transition-colors group"
                  >
                    <Linkedin className="w-5 h-5 text-accent flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium group-hover:text-accent transition-colors">
                        LinkedIn
                      </div>
                      <div className="text-sm text-fg-muted truncate">
                        {PROFILE.name}
                      </div>
                    </div>
                  </a>

                  <a
                    href={LINKS.orcid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-border/30 transition-colors group"
                  >
                    <div className="w-5 h-5 flex items-center justify-center text-accent flex-shrink-0 font-mono text-xs font-bold">
                      OR
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium group-hover:text-accent transition-colors">
                        ORCID
                      </div>
                      <div className="text-sm text-fg-muted truncate">
                        {PROFILE.orcid}
                      </div>
                    </div>
                  </a>

                  <a
                    href={LINKS.scholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-border/30 transition-colors group"
                  >
                    <div className="w-5 h-5 flex items-center justify-center text-accent flex-shrink-0 font-mono text-xs font-bold">
                      GS
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium group-hover:text-accent transition-colors">
                        Google Scholar
                      </div>
                      <div className="text-sm text-fg-muted truncate">
                        View profile
                      </div>
                    </div>
                  </a>

                  <a
                    href={LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-border/30 transition-colors group"
                  >
                    <Github className="w-5 h-5 text-accent flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium group-hover:text-accent transition-colors">
                        GitHub
                      </div>
                      <div className="text-sm text-fg-muted truncate">
                        @{PROFILE.githubUser}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Response time note */}
          <div className="text-center pt-8 border-t border-border">
            <p className="text-sm text-fg-muted">
              I read every message. Response time is typically within 2–3 business days.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}

