import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Flashcards from '../components/Flashcards'
import { topics } from '../content/registry'
import { allFlashcards, extractFlashcards } from '../lib/study'

export default function FlashcardsPage() {
  const [params, setParams] = useSearchParams()
  const selected = params.get('tema') ?? 'all'

  const cards = useMemo(() => {
    if (selected === 'all') return allFlashcards()
    const t = topics.find((x) => x.id === selected)
    return t ? extractFlashcards(t) : []
  }, [selected])

  function choose(value: string) {
    if (value === 'all') setParams({})
    else setParams({ tema: value })
  }

  // Només mostrem als filtres els temes que tenen glossari.
  const withGlossary = topics.filter((t) => extractFlashcards(t).length > 0)

  return (
    <div className="flashpage">
      <h1>🃏 Flashcards</h1>
      <p className="muted">
        Memoritza els conceptes clau. Clica la targeta (o prem <kbd>espai</kbd>) per girar-la; fes servir
        les <kbd>←</kbd> <kbd>→</kbd> per navegar.
      </p>

      <div className="chips">
        <button
          className={`chip ${selected === 'all' ? 'active' : ''}`}
          onClick={() => choose('all')}
        >
          Tots ({allFlashcards().length})
        </button>
        {withGlossary.map((t) => (
          <button
            key={t.id}
            className={`chip ${selected === t.id ? 'active' : ''}`}
            onClick={() => choose(t.id)}
          >
            {t.emoji} {t.short} ({extractFlashcards(t).length})
          </button>
        ))}
      </div>

      <Flashcards cards={cards} showTopic={selected === 'all'} />
    </div>
  )
}
