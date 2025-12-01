import Link from 'next/link'
import Container from '@/components/Container'

export default function NotFound() {
  return (
    <main>
      <Container>
        <h1>Case Study Not Found</h1>
        <p>Could not find the requested case study.</p>
        <Link href="/arbeid">← Back to all work</Link>
      </Container>
    </main>
  )
}
