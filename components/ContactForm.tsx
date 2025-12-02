/**
 * ContactForm Component
 *
 * Working contact form with validation using React Hook Form
 * Sends emails via API route with Resend
 * Protected by Cloudflare Turnstile anti-spam
 */

'use client'

import { Turnstile } from '@marsidev/react-turnstile'
import { Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface ContactFormData {
  name: string
  email: string
  message: string
  turnstileToken: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    if (!turnstileToken) {
      toast.error('Vennligst fullfør sikkerhetsbekreftelsen.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          turnstileToken,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Melding sendt! Jeg kommer tilbake til deg snart.')
        reset()
        setTurnstileToken(null)
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      toast.error(
        message.includes('Turnstile')
          ? 'Sikkerhetsbekreftelse feilet. Vennligst prøv igjen.'
          : 'Kunne ikke sende melding. Prøv igjen eller send meg en e-post direkte.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form" aria-label="Contact form">
      <div className="form-group flex">
        <div className="form-group">
          <label htmlFor="name">Navn</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Navn er påkrevd' })}
            className={errors.name ? 'error' : ''}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className="error-message" role="alert">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">E-post</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'E-post er påkrevd',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Ugyldig e-postadresse',
              },
            })}
            className={errors.email ? 'error' : ''}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className="error-message" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Melding</label>
        <textarea
          id="message"
          rows={6}
          {...register('message', {
            required: 'Melding er påkrevd',
            minLength: {
              value: 10,
              message: 'Meldingen må være minst 10 tegn',
            },
          })}
          className={errors.message ? 'error' : ''}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span id="message-error" className="error-message" role="alert">
            {errors.message.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => {
            setTurnstileToken(null)
            toast.error('Sikkerhetsbekreftelse feilet. Vennligst last inn siden på nytt.')
          }}
          onExpire={() => setTurnstileToken(null)}
          options={{
            theme: 'auto',
            size: 'normal',
          }}
        />
      </div>

      <button type="submit" disabled={isSubmitting || !turnstileToken} className="submit-button">
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="spinning" />
            Sender...
          </>
        ) : (
          <>
            <Send size={20} />
            Send melding
          </>
        )}
      </button>
    </form>
  )
}
