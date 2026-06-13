import { Link } from 'react-router-dom'
import { groups, topics, topicsByGroup } from '../content/registry'
import { allFlashcards } from '../lib/study'

export default function Home() {
  const nCards = allFlashcards().length

  return (
    <div className="home">
      <section className="hero">
        <h1>Anàlisi i Disseny d'Aplicacions</h1>
        <p className="hero-lead">
          Tot el temari del curs resumit i estructurat per estudiar ràpid: enginyeria del software,
          UML, el mètode de desenvolupament fase a fase i les PACs resoltes.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">{topics.length}</span>
            <span className="stat-label">temes i documents</span>
          </div>
          <div className="stat">
            <span className="stat-num">{nCards}</span>
            <span className="stat-label">conceptes en flashcards</span>
          </div>
          <div className="stat">
            <span className="stat-num">2</span>
            <span className="stat-label">PACs explicades</span>
          </div>
        </div>
        <div className="hero-cta">
          <Link to="/tema/tema-01" className="btn-primary">Comença pel Tema I →</Link>
          <Link to="/flashcards" className="btn-secondary">🃏 Repassa amb flashcards</Link>
        </div>
      </section>

      {groups.map((g) => (
        <section className="group-section" key={g.id}>
          <h2>{g.title}</h2>
          <p className="group-desc">{g.description}</p>
          <div className="card-grid">
            {topicsByGroup(g.id).map((t) => (
              <Link key={t.id} to={`/tema/${t.id}`} className="topic-card">
                <span className="topic-card-emoji">{t.emoji}</span>
                <span className="topic-card-title">{t.title}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
