import { isValidElement, ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Mermaid from './Mermaid'

/** Text pla recursiu d'un node de React (per detectar marcadors). */
function nodeText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join('')
  if (isValidElement(node)) return nodeText((node.props as { children?: ReactNode }).children)
  return ''
}

// Callouts de colors segons l'emoji inicial del blockquote.
const CALLOUTS: { emoji: string; cls: string }[] = [
  { emoji: '💡', cls: 'tip' },
  { emoji: '⚠️', cls: 'warn' },
  { emoji: '📌', cls: 'note' },
  { emoji: '✅', cls: 'ok' },
  { emoji: '🎯', cls: 'goal' },
  { emoji: '🧠', cls: 'mem' },
]

const components: Components = {
  pre(props) {
    const child = (Array.isArray(props.children) ? props.children[0] : props.children) as ReactNode
    if (isValidElement(child)) {
      const className = String((child.props as { className?: string }).className ?? '')
      if (/language-mermaid/.test(className)) {
        return <Mermaid chart={nodeText((child.props as { children?: ReactNode }).children).trim()} />
      }
    }
    return <pre>{props.children}</pre>
  },
  blockquote(props) {
    const text = nodeText(props.children).trimStart()
    const hit = CALLOUTS.find((c) => text.startsWith(c.emoji))
    return (
      <blockquote className={hit ? `callout callout-${hit.cls}` : undefined}>
        {props.children}
      </blockquote>
    )
  },
}

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
