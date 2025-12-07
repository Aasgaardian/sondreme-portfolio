/**
 * Disable Draft Mode API Route
 *
 * This exits draft mode preview.
 */

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  const draft = await draftMode()
  draft.disable()
  redirect('/')
}
