/**
 * Contact Form API Route
 *
 * Handles contact form submissions and sends emails using Resend
 * Protected by Cloudflare Turnstile verification
 *
 * Setup:
 * 1. Sign up at https://resend.com and get API key
 * 2. Sign up at https://dash.cloudflare.com/sign-up and create Turnstile site
 * 3. Add to .env.local:
 *    - RESEND_API_KEY
 *    - NEXT_PUBLIC_TURNSTILE_SITE_KEY (public)
 *    - TURNSTILE_SECRET_KEY (secret)
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Verify Turnstile token with Cloudflare
 */
async function verifyTurnstile(token: string): Promise<boolean> {
	const secretKey = process.env.TURNSTILE_SECRET_KEY;

	// Skip verification in development if no secret key
	if (!secretKey && process.env.NODE_ENV === "development") {
		console.log("⚠️ Turnstile verification skipped (no secret key in development)");
		return true;
	}

	if (!secretKey) {
		console.error("❌ TURNSTILE_SECRET_KEY not configured");
		return false;
	}

	try {
		const response = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					secret: secretKey,
					response: token,
				}),
			}
		);

		const data = await response.json();
		return data.success === true;
	} catch (error) {
		console.error("Turnstile verification error:", error);
		return false;
	}
}

export async function POST(request: Request) {
	try {
		const { name, email, message, turnstileToken } = await request.json();

		// Validation
		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Verify Turnstile token
		if (!turnstileToken) {
			return NextResponse.json(
				{ error: "Turnstile verification required" },
				{ status: 400 }
			);
		}

		const isValidToken = await verifyTurnstile(turnstileToken);
		if (!isValidToken) {
			return NextResponse.json(
				{ error: "Turnstile verification failed" },
				{ status: 403 }
			);
		}

		// For now, log to console if Resend is not configured
		if (!process.env.RESEND_API_KEY) {
			console.log("📧 Contact Form Submission:");
			console.log(`From: ${name} (${email})`);
			console.log(`Message: ${message}`);

			return NextResponse.json({
				message: "Message logged (Resend not configured)",
				success: true,
			});
		}

		// Sanitize inputs to prevent XSS in emails
		const sanitize = (text: string) => {
			return text
				.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#039;");
		};

		// Send email using Resend
		// NOTE: Using onboarding domain for now. To use your own domain:
		// 1. Add and verify your domain in Resend dashboard
		// 2. Update 'from' to: "Portfolio Contact <contact@yourdomain.com>"
		const data = await resend.emails.send({
			from: "Portfolio Contact <onboarding@resend.dev>",
			to: process.env.CONTACT_EMAIL || "mail@sondre.me",
			replyTo: email,
			subject: `New Contact Form Message from ${sanitize(name)}`,
			html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${sanitize(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitize(message).replace(/\n/g, "<br>")}</p>
      `,
		});

		return NextResponse.json({
			message: "Email sent successfully",
			success: true,
			id: data.data?.id || null,
		});
	} catch (error) {
		console.error("Contact form error:", error);
		return NextResponse.json(
			{ error: "Failed to send message" },
			{ status: 500 }
		);
	}
}
