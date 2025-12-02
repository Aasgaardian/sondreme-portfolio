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

import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
	try {
		const { name, email, message } = await request.json();

		// Validation
		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
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
