# Cloudflare Turnstile Setup Guide

This guide will walk you through setting up Cloudflare Turnstile for anti-spam protection on your contact form.

## What is Turnstile?

Turnstile is Cloudflare's free, privacy-focused CAPTCHA alternative. It protects your contact form from spam and bot submissions without requiring users to solve puzzles or click images.

## Setup Steps

### 1. Create a Cloudflare Account (if you don't have one)

Go to: https://dash.cloudflare.com/sign-up

### 2. Access Turnstile

1. Log in to your Cloudflare dashboard
2. Navigate to **Turnstile** from the left sidebar
3. Or go directly to: https://dash.cloudflare.com/?to=/:account/turnstile

### 3. Create a New Site

1. Click **"Add Site"** or **"Create"**
2. Fill in the form:
   - **Site name**: Your portfolio name (e.g., "Sondre Portfolio")
   - **Domain**: Your domain (e.g., `sondreme-portfolio.vercel.app`)
     - For development, you can use `localhost`
     - For production, use your actual domain
   - **Widget Mode**: Select **"Managed"** (recommended)
     - Managed: Shows challenge only when needed
     - Non-Interactive: Invisible, runs in background
     - Invisible: Requires manual trigger

3. Click **"Create"**

### 4. Copy Your Keys

After creating the site, you'll see two keys:

1. **Site Key** (Public) - Used on the frontend
2. **Secret Key** (Private) - Used on the backend for verification

### 5. Add Keys to Your Environment Variables

#### For Development (`.env.local`)

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here
```

#### For Production (Vercel)

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add both keys:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = your site key
   - `TURNSTILE_SECRET_KEY` = your secret key

### 6. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/kontakt` (contact page)
3. You should see the Turnstile widget above the submit button
4. Fill out the form and submit
5. The form should only submit if Turnstile verification passes

## Testing Keys

For local testing, Turnstile provides test keys that always pass:

```env
# Always passes verification
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

**Note:** These keys are already in your `.env.local` by default. Replace them with your real keys when deploying to production!

## How It Works

### Frontend (ContactForm.tsx)

1. The Turnstile widget renders on the contact form
2. When a user interacts with the page, Turnstile generates a token
3. This token is sent along with the form data when submitting

### Backend (app/api/contact/route.ts)

1. The API route receives the form data + Turnstile token
2. It verifies the token with Cloudflare's servers
3. If verification passes, the email is sent
4. If verification fails, the request is rejected

## Widget Customization

You can customize the Turnstile widget appearance in `ContactForm.tsx`:

```typescript
<Turnstile
  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
  onSuccess={(token) => setTurnstileToken(token)}
  options={{
    theme: 'auto',  // 'light', 'dark', or 'auto'
    size: 'normal', // 'normal', 'compact', or 'flexible'
  }}
/>
```

## Troubleshooting

### Widget doesn't appear

- Check that `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set correctly
- Verify the key is public (starts with `NEXT_PUBLIC_`)
- Restart your dev server after adding environment variables

### "Turnstile verification failed" error

- Check that `TURNSTILE_SECRET_KEY` is set in your environment
- Verify you're using the correct secret key (not the site key)
- Make sure the domain matches what you configured in Cloudflare

### Widget shows error in production

- Verify your production domain is added to the Turnstile site settings
- Check that environment variables are set in Vercel/your hosting platform
- Look at server logs for specific error messages

## Security Notes

- **Never commit** your secret key to git (it's in `.gitignore`)
- The site key is public and safe to expose
- The secret key should only be used server-side
- Tokens expire after a short time and can only be used once

## Additional Resources

- [Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [React Turnstile Package](https://github.com/marsidev/react-turnstile)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)
