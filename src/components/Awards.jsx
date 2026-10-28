import { awards } from '../data/site'
import Marquee from './Marquee'

export default function Awards() {
  return (
    <section className="awards-section" aria-label="Awards and recognition">
      <div className="shell">
        <div className="awards">
          <Marquee
            items={awards}
            speed={48}
            renderItem={(award) => (
              <span className="awards__item">
                <Spark />
                {award}
              </span>
            )}
          />
        </div>
      </div>
    </section>
  )
}

function Spark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  )
}
