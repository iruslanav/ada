import { Link, useParams } from 'react-router-dom'
import Markdown from '../components/Markdown'
import { getTopic, topics } from '../content/registry'
import { flashcardsForTopic } from '../lib/study'

export default function TopicPage() {
  const { id } = useParams()
  const topic = id ? getTopic(id) : undefined

  if (!topic) {
    return (
      <div className="not-found">
        <h1>Tema no trobat</h1>
        <Link to="/" className="btn-primary">Torna a l'inici</Link>
      </div>
    )
  }

  const idx = topics.findIndex((t) => t.id === topic.id)
  const prev = idx > 0 ? topics[idx - 1] : undefined
  const next = idx < topics.length - 1 ? topics[idx + 1] : undefined
  const nCards = flashcardsForTopic(topic.id).length

  return (
    <article className="topic">
      {nCards > 0 && (
        <div className="topic-toolbar">
          <Link to={`/flashcards?tema=${topic.id}`} className="btn-secondary">
            🃏 Repassa els {nCards} conceptes d'aquest tema
          </Link>
        </div>
      )}

      <Markdown>{topic.content}</Markdown>

      <nav className="topic-nav">
        {prev ? (
          <Link to={`/tema/${prev.id}`} className="topic-nav-link prev">
            <span className="tn-dir">← Anterior</span>
            <span className="tn-title">{prev.short}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/tema/${next.id}`} className="topic-nav-link next">
            <span className="tn-dir">Següent →</span>
            <span className="tn-title">{next.short}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
