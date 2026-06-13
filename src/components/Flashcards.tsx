import { useEffect, useMemo, useState } from 'react'
import { Flashcard, shuffle } from '../lib/study'

interface Props {
  cards: Flashcard[]
  /** Mostra l'etiqueta del tema a cada targeta (útil al mode "totes"). */
  showTopic?: boolean
}

export default function Flashcards({ cards, showTopic = false }: Props) {
  const [order, setOrder] = useState<Flashcard[]>(cards)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState<Set<string>>(new Set())

  // Si canvia el conjunt de targetes (canvi de tema/filtre), reinicia.
  useEffect(() => {
    setOrder(cards)
    setIndex(0)
    setFlipped(false)
    setKnown(new Set())
  }, [cards])

  const current = order[index]
  const keyOf = (c: Flashcard) => `${c.topicId}::${c.term}`

  const progress = useMemo(() => (order.length ? Math.round((known.size / order.length) * 100) : 0), [known, order])

  function next() {
    setFlipped(false)
    setIndex((i) => (i + 1) % order.length)
  }
  function prev() {
    setFlipped(false)
    setIndex((i) => (i - 1 + order.length) % order.length)
  }
  function markKnown() {
    if (!current) return
    setKnown((prev) => new Set(prev).add(keyOf(current)))
    next()
  }
  function reshuffle() {
    setOrder(shuffle(order))
    setIndex(0)
    setFlipped(false)
  }

  // Navegació amb teclat: espai = girar, fletxes = navegar.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === ' ') {
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.length])

  if (!current) {
    return <p className="muted">No hi ha conceptes per estudiar en aquesta selecció.</p>
  }

  return (
    <div className="flashcards">
      <div className="fc-bar">
        <span className="fc-count">
          Targeta {index + 1} / {order.length}
        </span>
        <span className="fc-known">{known.size} apreses · {progress}%</span>
        <button className="btn-ghost" onClick={reshuffle} title="Barreja les targetes">🔀 Barreja</button>
      </div>

      <div className="fc-progress">
        <div className="fc-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <button
        className={`fc-card ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        aria-label="Gira la targeta"
      >
        <div className="fc-face fc-front">
          {showTopic && <span className="fc-tag">{current.topicShort}</span>}
          <span className="fc-term">{current.term}</span>
          <span className="fc-hint">Clica o prem espai per veure la definició</span>
        </div>
        <div className="fc-face fc-back">
          {showTopic && <span className="fc-tag">{current.topicShort}</span>}
          <span className="fc-def">{current.definition}</span>
        </div>
      </button>

      <div className="fc-actions">
        <button className="btn-ghost" onClick={prev}>← Anterior</button>
        <button className="btn-known" onClick={markKnown}>✓ Ja la sé</button>
        <button className="btn-ghost" onClick={next}>Següent →</button>
      </div>
    </div>
  )
}
