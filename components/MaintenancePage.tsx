import { Wrench } from 'lucide-react'
import Container from './Container'

interface MaintenancePageProps {
  message?: string
}

export function MaintenancePage({ message }: MaintenancePageProps) {
  return (
    <main className="maintenance-page">
      <Container>
        <div className="maintenance-content">
          <Wrench size={64} className="maintenance-icon" />
          <h1>Siden er under vedlikehold</h1>
          <p>{message || 'Siden er for øyeblikket under vedlikehold. Kom tilbake snart!'}</p>
          <a href="/" className="btn btn-primary">
            Tilbake til forsiden
          </a>
        </div>
      </Container>
    </main>
  )
}
