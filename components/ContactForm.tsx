/**
 * ContactForm Component
 *
 * Working contact form with validation using React Hook Form
 * Sends emails via API route with Resend
 */

'use client'

import { Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Melding sendt! Jeg kommer tilbake til deg snart.')
        reset()
      } else {
        throw new Error('Failed to send message')
      }
    } catch (_error) {
      toast.error('Kunne ikke sende melding. Prøv igjen eller send meg en e-post direkte.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <div className="form-group flex">
        <div className="form-group">
          <label htmlFor="name">Navn</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Navn er påkrevd' })}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
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
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
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
        />
        {errors.message && <span className="error-message">{errors.message.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-button">
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
