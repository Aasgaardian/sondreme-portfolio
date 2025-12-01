import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { draftMode } from 'next/headers'
import Script from 'next/script'
import { Toaster } from 'react-hot-toast'
import { Navigation } from '@/components/Navigation'
import SmoothScroll from '@/components/SmoothScroll'
import { ThemeProvider } from '@/components/ThemeProvider'
import VisualEditing from '@/components/VisualEditing'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sondreme-portfolio.vercel.app'),
  title: {
    default: 'Sondre Aasgaard - Portfolio',
    template: '%s | Sondre Aasgaard',
  },
  description:
    'Portfolio and CV of Sondre Aasgaard - developer, designer, and creative professional',
  keywords: [
    'Sondre Aasgaard',
    'portfolio',
    'developer',
    'designer',
    'web development',
    'frontend',
    'UX',
    'UI',
  ],
  authors: [{ name: 'Sondre Aasgaard', url: 'https://sondreme-portfolio.vercel.app' }],
  creator: 'Sondre Aasgaard',
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    alternateLocale: 'en_US',
    url: 'https://sondreme-portfolio.vercel.app',
    title: 'Sondre Aasgaard - Portfolio',
    description:
      'Portfolio and CV of Sondre Aasgaard - developer, designer, and creative professional',
    siteName: 'Sondre Aasgaard Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sondre Aasgaard - Portfolio',
    description:
      'Portfolio and CV of Sondre Aasgaard - developer, designer, and creative professional',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isEnabled } = await draftMode()

  return (
    <html lang="no" suppressHydrationWarning>
      <head>
        <Script id="adobe-fonts" strategy="beforeInteractive">
          {`
            (function(d) {
              var config = {
                kitId: 'flb2hvn',
                scriptTimeout: 3000,
                async: true
              },
                h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll>
              <Navigation isEnabled={isEnabled} />
              {children}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#333',
                    color: '#fff',
                  },
                }}
              />
              {isEnabled && <VisualEditing />}
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
