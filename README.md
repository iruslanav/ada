# ADA · Web d'estudi — Anàlisi i Disseny d'Aplicacions (URV)

Web React per estudiar ràpid tot el temari del curs **ADA**: introducció a l'enginyeria del
software, **UML** (referència completa), el **mètode de desenvolupament** fase a fase
(requisits, anàlisi, disseny, persistència, construcció, prova) i les **PACs resoltes** i
explicades. Inclou **flashcards** interactives dels conceptes clau de cada tema.

Tot el contingut és en **català**, fidel al material del curs.

## Arquitectura dels dos repositoris

- **`ada`** (aquest repositori) → el **codi font** de l'aplicació.
- **`adaLIVE`** → només el **build** ja compilat, servit amb **GitHub Pages**:
  👉 https://iruslanav.github.io/adaLIVE/

Cada cop que es fa `push` a `main` en aquest repositori, un GitHub Action compila la web i
en publica el resultat al repositori `adaLIVE` (vegeu `.github/workflows/deploy.yml`).

## Desenvolupament local

```bash
npm install
npm run dev        # servidor de desenvolupament (http://localhost:5173/adaLIVE/)
npm run build      # compila a dist/
npm run preview    # previsualitza el build
```

> Per provar en local amb rutes a l'arrel: `VITE_BASE=./ npm run dev`.

## Posada en marxa del desplegament automàtic

1. Crea un **Personal Access Token** amb permís d'escriptura sobre `adaLIVE`.
2. Al repositori `ada`: **Settings → Secrets and variables → Actions → New repository secret**,
   nom `ADALIVE_TOKEN`, valor el token.
3. Al repositori `adaLIVE`: **Settings → Pages → Source: Deploy from a branch → `main` / root**.
4. Fes `push` a `main`: el workflow compilarà i publicarà a `adaLIVE` automàticament.

## Estructura

```
src/
  content/          # el temari, en fitxers .md (una font de veritat)
    registry.ts     # registre de temes i grups
  lib/study.ts      # extracció de flashcards del glossari de cada tema
  components/       # Layout, Markdown, Flashcards
  pages/            # Home, TopicPage, FlashcardsPage
```

Per **afegir o editar contingut** només cal tocar els fitxers `.md` de `src/content/`. Les
flashcards es generen automàticament a partir de la secció `## Conceptes clau (glossari)`
de cada tema.

## Tecnologia

Vite · React · TypeScript · React Router (HashRouter) · react-markdown + remark-gfm.
