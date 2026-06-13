import tema01 from './tema-01-introduccio.md?raw'
import metode from './metode.md?raw'
import uml from './uml.md?raw'
import tema03 from './tema-03-requisits.md?raw'
import tema04 from './tema-04-analisi.md?raw'
import tema05 from './tema-05-interficie.md?raw'
import tema06 from './tema-06-persistencia.md?raw'
import tema07 from './tema-07-construccio.md?raw'
import tema08 from './tema-08-prova.md?raw'
import pac01 from './pac-01.md?raw'
import pac02 from './pac-02.md?raw'

export type GroupId = 'fonaments' | 'uml' | 'fases' | 'pac'

export interface Topic {
  id: string
  title: string
  short: string
  group: GroupId
  emoji: string
  content: string
}

export interface Group {
  id: GroupId
  title: string
  description: string
}

export const groups: Group[] = [
  { id: 'fonaments', title: 'Fonaments', description: "Introducció a l'enginyeria del software i el mètode de desenvolupament." },
  { id: 'uml', title: 'UML', description: 'Referència completa del llenguatge de modelatge.' },
  { id: 'fases', title: 'El mètode, fase a fase', description: 'Requisits, anàlisi, disseny, construcció i prova.' },
  { id: 'pac', title: 'PACs resoltes', description: "Enunciats i solucions explicades pas a pas." },
]

export const topics: Topic[] = [
  { id: 'tema-01', title: "Tema I · Introducció a l'enginyeria del software", short: 'Introducció', group: 'fonaments', emoji: '🚀', content: tema01 },
  { id: 'metode', title: 'El mètode de desenvolupament', short: 'El mètode', group: 'fonaments', emoji: '🗺️', content: metode },
  { id: 'uml', title: 'UML · Referència completa', short: 'UML complet', group: 'uml', emoji: '📐', content: uml },
  { id: 'tema-03', title: 'Tema III · Recollida i documentació dels requisits', short: 'Requisits', group: 'fases', emoji: '📋', content: tema03 },
  { id: 'tema-04', title: "Tema IV · L'anàlisi dels requisits", short: 'Anàlisi', group: 'fases', emoji: '🔍', content: tema04 },
  { id: 'tema-05', title: 'Tema V · Disseny de la interfície amb els usuaris', short: 'Disseny IU', group: 'fases', emoji: '🎨', content: tema05 },
  { id: 'tema-06', title: "Tema VI · Disseny de les classes d'entitat i persistència", short: 'Persistència', group: 'fases', emoji: '🗄️', content: tema06 },
  { id: 'tema-07', title: 'Tema VII · La construcció', short: 'Construcció', group: 'fases', emoji: '🔨', content: tema07 },
  { id: 'tema-08', title: 'Tema VIII · La prova', short: 'Prova', group: 'fases', emoji: '✅', content: tema08 },
  { id: 'pac-01', title: 'PAC 1 · Mètodes i diagrames UML', short: 'PAC 1', group: 'pac', emoji: '📝', content: pac01 },
  { id: 'pac-02', title: 'PAC 2 · Gestió de TFG/TFM', short: 'PAC 2', group: 'pac', emoji: '📝', content: pac02 },
]

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id)
}

export function topicsByGroup(group: GroupId): Topic[] {
  return topics.filter((t) => t.group === group)
}
