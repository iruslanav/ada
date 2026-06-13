import { topics, Topic } from '../content/registry'

export interface Flashcard {
  term: string
  definition: string
  topicId: string
  topicShort: string
}

const GLOSSARY_HEADING = /^##\s+Conceptes clau/i
const BULLET = /^[-*]\s*\*\*(.+?)\*\*\s*[—–-]\s*(.+)$/

/**
 * Extreu les flashcards (terme → definició) de la secció
 * "## Conceptes clau (glossari)" del contingut d'un tema.
 */
export function extractFlashcards(topic: Topic): Flashcard[] {
  const lines = topic.content.split('\n')
  const cards: Flashcard[] = []
  let inGlossary = false

  for (const line of lines) {
    if (line.startsWith('## ')) {
      inGlossary = GLOSSARY_HEADING.test(line)
      continue
    }
    if (!inGlossary) continue
    const m = line.match(BULLET)
    if (m) {
      cards.push({
        term: m[1].trim(),
        definition: m[2].trim(),
        topicId: topic.id,
        topicShort: topic.short,
      })
    }
  }
  return cards
}

export function allFlashcards(): Flashcard[] {
  return topics.flatMap(extractFlashcards)
}

export function flashcardsForTopic(topicId: string): Flashcard[] {
  const t = topics.find((x) => x.id === topicId)
  return t ? extractFlashcards(t) : []
}

/** Barreja una còpia de l'array (Fisher–Yates). */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
