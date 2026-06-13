import { useEffect, useRef, useState } from 'react'

// Carrega mermaid de manera diferida (només quan hi ha un diagrama a la pàgina),
// per no inflar el bundle principal. Es configura una sola vegada.
let mermaidPromise: Promise<typeof import('mermaid').default> | null = null
function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((m) => {
      m.default.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'loose',
        fontFamily: 'Inter, system-ui, sans-serif',
        themeVariables: {
          primaryColor: '#f6e9ea',
          primaryBorderColor: '#8a1f2b',
          primaryTextColor: '#1f2329',
          lineColor: '#8a1f2b',
          secondaryColor: '#fbf4f4',
          tertiaryColor: '#fbf9f7',
          fontSize: '15px',
        },
      })
      return m.default
    })
  }
  return mermaidPromise
}

let seq = 0

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const idRef = useRef('mmd' + seq++)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    setError(false)
    loadMermaid()
      .then((mermaid) => mermaid.render(idRef.current, chart))
      .then(({ svg }) => {
        if (active && ref.current) ref.current.innerHTML = svg
      })
      .catch(() => {
        if (active) setError(true)
      })
    return () => {
      active = false
    }
  }, [chart])

  if (error) {
    return (
      <pre className="mermaid-fallback">
        <code>{chart}</code>
      </pre>
    )
  }

  return <div className="mermaid-diagram" ref={ref} role="img" aria-label="Diagrama" />
}
