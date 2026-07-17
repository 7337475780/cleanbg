'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center py-4">
        <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          ✉️
        </div>
        <h2 className="text-2xl font-bold text-foreground">Check your email</h2>
        <p className="text-sm text-foreground/60">
          We've sent password reset instructions to <br />
          <span className="font-medium text-foreground">{email}</span>
        </p>
        <Link
          href="/login"
          className="inline-block mt-4 text-primary font-semibold hover:underline"
        >
          Return to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>
        <h2 className="text-2xl font-bold mb-1 text-foreground">Reset Password</h2>
        <p className="text-sm text-foreground/60">Enter your email and we'll send you instructions.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-foreground/80">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-2 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
