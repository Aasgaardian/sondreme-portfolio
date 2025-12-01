/**
 * Draft Mode API Route
 *
 * This enables draft mode so you can preview unpublished content
 * from Sanity Studio's Presentation tool.
 */

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the path or homepage
  redirect(slug || '/')
}
