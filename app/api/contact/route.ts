/**
 * Contact Form API Route
 *
 * Handles contact form submissions and sends emails using Resend
 *
 * Setup:
 * 1. Sign up at https://resend.com
 * 2. Get your API key
 * 3. Add RESEND_API_KEY to .env.local
 * 4. Verify your domain or use onboarding domain for testing
 */

import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // For now, log to console if Resend is not configured
    if (!process.env.RESEND_API_KEY) {
      console.log('📧 Contact Form Submission:')
      console.log(`From: ${name} (${email})`)
      console.log(`Message: ${message}`)

      return NextResponse.json({
        message: 'Message logged (Resend not configured)',
        success: true,
      })
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Change this after domain verification
      to: process.env.CONTACT_EMAIL || 'your@email.com', // Your email
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return NextResponse.json({
      message: 'Email sent successfully',
      success: true,
      id: data.id,
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
