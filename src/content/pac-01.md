# PAC 1 — Mètodes de desenvolupament i diagrames UML

> Primera prova d'avaluació continuada. Inclou preguntes teòriques i exercicis de modelat amb diagrames UML (classes, casos d'ús, estats i seqüències).

## Enunciat

### Exercici 1 (20%)

- **a)** Diferència entre mètodes de desenvolupament **prescriptius** i **no prescriptius**.
- **b)** Què són els **increments** i les **iteracions** al desenvolupament de projectes?

### Exercici 2 (25%) — Diagrama de classes

> Els alumnes (identificats per NIF) poden entregar un nombre indefinit de treballs de programació. Als treballs, que es poden fer entre 1 i 3 alumnes, se'ls assigna 1 professor per corregir-los i s'identifiquen per un codi que es genera automàticament a partir de concatenar els NIFs dels alumnes que l'han fet. En el moment de fer l'entrega, es genera i s'emmagatzema un resguard d'entrega (diferent i individual per a cadascun dels alumnes) amb el NIF de l'alumne, el dia i l'hora. De treballs només n'hi ha de dos tipus totalment diferents: pràctics (amb la URL del codi i una qualificació numèrica) i exercicis de teoria (amb una quantitat indefinida de respostes, cadascuna amb un text i una qualificació "malament", "bé" o "molt bé"). Alumnes i professors (sempre persones diferents) tenen nom i NIF; els professors tenen, a més, número de despatx.

### Exercici 3 (25%) — Diagrama de casos d'ús

> Campus virtual d'una assignatura. Els estudiants poden baixar materials, entregar pràctiques i consultar notes. El professor coordinador pot donar d'alta estudiants, penjar materials, proposar pràctiques i posar notes (si l'estudiant no està d'alta en posar la nota, el pot donar d'alta en aquell moment). Els professors associats només poden penjar materials i proposar pràctiques. Tant en l'entrega com en posar notes s'ha d'introduir una clau d'accés. Quan el coordinador posa una nota, l'alumne rep un missatge amb un link per confirmar que l'ha vist.

### Exercici 4 (15%) — Explicar un diagrama d'estats

Diagrama amb capçalera `state machine Ex3S`: estat inicial → estat `w`; de `w` surt `when (xxx)` cap a un node de decisió; `[e]` → estat `r`, `[else]` → punt de sortida `p1`; un punt d'entrada `p2` va directament a `r`; de `r` surt `after (yyyy)` cap a l'estat final.

### Exercici 5 (15%) — Diagrama de seqüències

> Un usuari d'una biblioteca demana cerques de llibres en una finestra de cerca especificant el títol. El sistema busca a la BD els llibres del títol i els mostra en una nova finestra de resultats. Quan l'usuari confirma, es tanca la finestra de resultats.

---

## Solució (explicada)

### Exercici 1

**a) Prescriptius vs. no prescriptius.** Els **prescriptius** (predictius, "en cascada"/plan-driven) imposen un procés rígid: defineixen per endavant fases, activitats, artefactes i ordre; es planifica tot al detall i s'espera poc canvi de requisits. Donen seguretat i traçabilitat però són poc flexibles. Els **no prescriptius** (àgils/adaptatius) no fixen rígidament el procés; s'adapten als canvis, prioritzen la col·laboració i el lliurament continu, i menys la documentació exhaustiva.

**b) Increments i iteracions.** Un **increment** és una part del producte (funcionalitats acabades i utilitzables) que s'afegeix al sistema. Una **iteració** és una repetició del cicle (anàlisi, disseny, implementació, prova) que refina/amplia el resultat. El desenvolupament **iteratiu i incremental** combina ambdós.

### Exercici 2 — Diagrama de classes

**Classes i atributs:**

- **`Persona`** (arrel): `-NIF: String {id}`, `-nom: String`.
- **`Alumne`** : subclasse de Persona (sense atributs propis).
- **`Professor`** : subclasse de Persona; `-despatx: int`.
- **`Treball`** *(abstracta)* : `-codi: String` (generat concatenant els NIFs).
- **`TreballPractic`** : `-URL: String`, `-qualificacio: float`.
- **`TreballTeoria`** : (les respostes es modelen amb classe associada).
- **`Resposta`** : `-resposta: String`, `-qualificacio: Valoracio`.
- **`«enumeration» Valoracio`** : `malament`, `be`, `molt be`.
- **`Entrega`** : **classe associativa** sobre Alumne–Treball; `-NIF: String`, `-diaHora: date`.

**Herència:**

- `Persona` → `Alumne` / `Professor`, **`{incomplete, disjoint}`**: no es pot ser alumne i professor alhora (disjoint), però poden existir persones que no siguin cap dels dos (incomplete).
- `Treball` → `TreballPractic` / `TreballTeoria`, **`{complete, disjoint}`**: tot treball és exactament d'un dels dos tipus.

**Associacions:**

- **Alumne — Treball** (assoc. `Entrega`): `1..3` a la banda d'Alumne (un treball el fan 1–3 alumnes), `*` a la banda de Treball. Amb classe associativa `Entrega`.
- **Treball — Professor**: `*` — `1` (a cada treball, 1 professor corrector).
- **TreballTeoria — Resposta**: `1` — `*`.

**Raonament:** el resguard d'entrega depèn de la **parella** (alumne, treball) → classe associativa `Entrega`. `Treball` és abstracta (`{complete}`). Les respostes són classe pròpia (dos camps i quantitat indefinida). La qualificació de teoria és un domini tancat → **enumeració**; la pràctica és `float`.

### Exercici 3 — Diagrama de casos d'ús

**Actors:** `Estudiant`, `Prof coordinador`, `Prof associat`. **Generalització d'actors**: el coordinador hereta (i amplia) les funcions de l'associat.

**Casos i actors:** `BaixarMaterial`, `EntregarPràctica`, `ConsultarNota` (Estudiant); `DonarAltaEstudiants`, `PosarNota` (Coordinador); `ProposarPractica`, `PenjarMaterial` (Associat i, per herència, Coordinador).

**Relacions entre casos:**

- `EntregarPràctica` **`«include»`** `IntroduirClau` i `PosarNota` **`«include»`** `IntroduirClau` (la clau sempre cal).
- `DonarAltaEstudiants` **`«extend»`** `PosarNota` amb condició **`no existeix`** i extension point **`selecc. estudiant`** (només si l'estudiant no està d'alta).
- L'estudiant és **actor secundari** (`-secundari`) de `PosarNota` (rep el link de confirmació).

**Raonament:** la clau és obligatòria i compartida → `«include»`. Donar d'alta en posar nota és condicional/opcional → `«extend»`. Funcions compartides coordinador/associat → generalització d'actors.

### Exercici 4 — Diagrama d'estats (explicació)

És una **màquina d'estats de submàquina** (ho sabem pels **punts d'entrada `p2` i de sortida `p1`**). De l'inicial es passa a `w`. De `w` se surt amb l'**esdeveniment de canvi `when (xxx)`** cap a un node de decisió: si es compleix la guarda `[e]` → estat `r` (al qual també s'arriba directament pel punt d'entrada `p2`); si no (`[else]`) → es surt per `p1`. De `r` se surt amb l'**esdeveniment de temps relatiu `after (yyyy)`** cap a l'estat final.

### Exercici 5 — Diagrama de seqüències

**Línies de vida:** `: Usuari`, `: FinestraCerca`, `: SistemaGestio`, `: BD`, `: Resultat` (creada durant la interacció).

**Missatges:**

1. `titol` — Usuari → FinestraCerca.
2. `cercaLlibre(t=titol)` — FinestraCerca → SistemaGestio.
3. `cercarLlibre(t=titol)` — SistemaGestio → BD.
4. `(llibres)` — BD ⇢ SistemaGestio (retorn).
5. `(llibres)` — SistemaGestio ⇢ **crea** `: Resultat`.
6. `confirma` — Usuari → `: Resultat`.
7. missatge reflexiu → `: Resultat` es **destrueix** (X al final de la ldv).

**Raonament:** la finestra de resultats es **crea dinàmicament**; els retorns van amb fletxes discontínues; el tancament es marca amb la **X de destrucció**. Hi ha delegació en capes: presentació → lògica → persistència.

---

## Errors típics / consells

1. **Classe associativa vs. atribut.** El resguard d'entrega (`Entrega`) ha de ser **classe associativa** (depèn de la parella alumne–treball), no un atribut.
2. **Restriccions `{disjoint/overlapping, complete/incomplete}`.** Persones `{incomplete, disjoint}`; treballs `{complete, disjoint}`. Posar-les a l'inrevés o oblidar-les és error comú.
3. **`«include»` vs. `«extend»`.** Obligatori i compartit → include; condicional/opcional → extend (amb condició i punt d'extensió). Fixa't en el sentit de la fletxa.
4. **Enumeracions per a dominis tancats** ("malament/bé/molt bé" → `«enumeration»`, no `String`).
5. **Punts d'entrada/sortida = submàquina.** No confondre el punt de sortida amb l'estat final, ni `when(...)` amb `after(...)`.
6. **Creació i destrucció al diagrama de seqüències** (fletxa cap a la ldv per crear; X per destruir; crida contínua vs. retorn discontinu).
