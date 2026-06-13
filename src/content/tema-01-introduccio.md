# Tema I — Introducció a l'enginyeria del software

> **De què va aquest tema?** Introdueix el software com a producte industrial amb característiques pròpies (producte singular, complexitat, productivitat) i presenta l'enginyeria del software com a disciplina que dóna tècniques, metodologies i eines (com UML) per superar la "crisi del software". També repassa els cicles de vida, els mètodes de desenvolupament (prescriptius i no prescriptius) i els rols d'un projecte.

## El software com a producte industrial

**Components del software:**

- **Codi**
- **Estructures de dades** (bases de dades, estructures de classes, etc.)
- **Documentació**, que pot ser **de construcció** o **d'ús**.

**El software com a producte industrial:**

- **Producte singular** (no en sèrie): enfocat a solucionar un problema específic.
- **Qualitat**: la **complexitat** del software fa que no es puguin provar totes les condicions d'execució.
- **Productivitat**: com a **producte singular**, l'inici de la fabricació és molt més lent que en una fabricació en sèrie.

## Tipus de software

- **Software a mida**: adaptat a les necessitats específiques d'una empresa.
- **Software per al mercat**:
  - Genèric: SOs, compiladors, etc.
  - Cada vegada més, programes d'ús privat i de suport a activitats administratives.
  - **ERP** (*Enterprise Resource Planning*): fet per al mercat però parametritzable a una empresa concreta (p. ex. **SAP**).
- **Software heretat**:
  - Programes desenvolupats fa temps amb tecnologies obsoletes.
  - Adaptació d'interfície d'usuari, integració amb altres mòduls de diferent tecnologia (**SOA**, *Service Oriented Architecture*).

## L'enginyeria del software

- **Crisi del software**: problemàtica del desenvolupament (planificació, estimació de costos, productivitat…) que resulta en una baixa productivitat.
- **Solució → Enginyeria del software**: estudi dels principis i metodologies per al desenvolupament i manteniment de software. Ens proporciona:
  - **Tècniques:** principis a aplicar a cada pas de l'elaboració.
  - **Metodologies:** ordre predeterminat d'aplicació de tècniques.
  - **Eines:** instruments per a l'aplicació de tècniques. Llenguatges → **UML**.

## L'Unified Modelling Language (UML)

- **UML** és un llenguatge de **modelatge gràfic estàndard**.
- Creat per l'**OMG** (*Object Management Group*), on participen empreses, universitats i consultores; té com a finalitat elaborar estàndards sobre tecnologia orientada a objectes.
- Proporciona **conceptes i notacions gràfiques (diagrames)** per al modelatge OO:
  - **Diagrames d'estructura:** **classes**, paquets, perfil, objectes, estructures compostes, components, desplegament.
  - **Diagrames de comportament:** **casos d'ús**, **estats**, **activitats**, i interacció (**seqüències**, comunicacions, visió general i temporal).

## Cicle de vida del software

- Comprèn totes les **fases** de la producció, prèvies i posteriors a la programació.
- Existeixen diversos **mètodes**, adaptats a diferents necessitats.
- És imprescindible desenvolupar projectes en el **marc d'un cicle de vida** definit per preveure terminis, recursos, qualitat, etc.

### El cicle de vida en cascada

A cada fase s'obté un resultat (document, codi) que és la base de la fase següent. Les fases, en "escala descendent", són:

1. **Anàlisi prèvia** → *Especificació del sistema* → 2. **Anàlisi de requisits** → *Especificació de requisits* → 3. **Disseny** → *Especificació de disseny* → 4. **Programació** → *Software* → 5. **Prova** → 6. **Engegada** → 7. **Manteniment**

- **Anàlisi prèvia**: què ha de fer el software, estudi de viabilitat, costos, durada.
- **Anàlisi de requisits**: detalla les funcions a realitzar (es distingeix *recollida* i *anàlisi* de requisits).
- **Disseny**: detalla la implementació de la solució (programes, BD i interfícies gràfiques).
- **Programació**: construcció de l'aplicació.
- **Prova**: unitària + integració.
- **Engegada**: incorporació d'informació existent, aprenentatge dels usuaris…
- **Manteniment**: correcció, modificació, millora o extensió.

**Problema del cicle en cascada** (no hi ha marxa enrere): els requisits han de ser complets des del principi i tot ha de ser correcte a la primera.

**Solució → *increments* i *iteracions*:**

- **Increments**: aplicació del cicle a fraccions successives del projecte.
- **Iteracions**: revisions i correccions dels increments.

## Mètodes de desenvolupament de software

- **Mètodes prescriptius** (projectes grans i complexos, equips grans, requisits estables):
  - **estructurats (FP)**: poc reutilitzable.
  - **orientats a l'objecte (PRG, ADA)**: reutilitzable i extensible.
  - **formals (Met. Prog.)**: molt rigorós ("matemàtic"), només per a problemes molt acotats i entorns crítics.
- **Mètodes no prescriptius** (projectes petits, equips petits/unipersonals, requisits dinàmics):
  - **àgils**: mínima documentació, reunions de progrés diàries, desenvolupament ràpid i iteratiu de prototipus.

**El mètode que seguirem** és una variant del **Unified Process**, amb aquestes fases:

- **Recollida i documentació de requisits** (Tema III)
- **Anàlisi dels requisits** (Tema IV)
- **Disseny de la interfície amb l'usuari** (Tema V)
- **Disseny de les classes d'entitat i de la persistència** (Tema VI)
- **Construcció** (Tema VII)
- **Prova** (Tema VIII)

## Rols en projectes de software

Tres rols principals: **Director del projecte** (PSI), **Dissenyador/arquitecte de software** (ADA) i **Desenvolupadors** (PRG, BD, TAP, SOB…).

### Director del projecte (una sola persona)

- **Planificació** del treball: divisió en tasques, estimació de l'esforç (→ línies de codi → #programadors → temps), planificació temporal amb **diagrames de Gantt o PERT**.
- Gestió de **recursos humans**: selecció de personal (necessitats vs. habilitats), organització en equips (responsabilitats).
- Gestió dels **riscs**: identificació i caracterització (tipus: projecte/producte/negoci; impacte i probabilitat), estratègies d'evitació o minimització, seguiment i replanificació.

### Dissenyador/arquitecte de software

- **Recull els requisits** (amb el director): entrevistes, anàlisi del mercat o de softwares similars.
- **Documenta els requisits** (contracte amb el client).
- **Analitza els requisits** per trobar una solució independent de la tecnologia.
- **Dissenya la solució** segons un conjunt de tecnologies i requeriments (usabilitat, seguretat, portabilitat…).

### Desenvolupadors

- **Implementen** la solució segons les especificacions del dissenyador.
- **Proven** l'aplicació a diferents nivells.
- Poden fer **l'engegada** i participen al **manteniment**.
- El director **monitoritza** la seva feina mesurant atributs del projecte: línies de codi, "qualitat" del codi, #errors reportats vs. corregits, etc.

## Conceptes clau (glossari)

- **Producte singular** — software no fabricat en sèrie, enfocat a un problema específic.
- **Crisi del software** — problemàtica de planificació, estimació i productivitat que provoca baixa productivitat.
- **Enginyeria del software** — estudi dels principis i metodologies per al desenvolupament i manteniment de software.
- **Tècnica** — principis a aplicar a cada pas de l'elaboració.
- **Metodologia** — ordre predeterminat d'aplicació de tècniques.
- **Eina** — instrument per a l'aplicació de tècniques (p. ex. UML).
- **UML** — llenguatge de modelatge gràfic estàndard creat per l'OMG.
- **OMG** — Object Management Group, organització que elabora estàndards de tecnologia orientada a objectes.
- **ERP** — software fet per al mercat però parametritzable a una empresa concreta (p. ex. SAP).
- **Software heretat** — programes antics amb tecnologies obsoletes.
- **Cicle de vida** — marc que abasta totes les fases de producció per preveure terminis, recursos i qualitat.
- **Cicle en cascada** — cicle on cada fase produeix un resultat que és base de la següent, sense marxa enrere.
- **Increment** — aplicació del cicle a una fracció successiva del projecte.
- **Iteració** — revisió i correcció dels increments.
- **Mètodes àgils** — mètodes no prescriptius amb mínima documentació i desenvolupament ràpid iteratiu.

## Preguntes de repàs

1. **Per què es diu que el software és un "producte singular"?** Perquè no es fabrica en sèrie; està enfocat a solucionar un problema específic.
2. **Quins són els components del software?** Codi, estructures de dades i documentació (de construcció i d'ús).
3. **Diferència entre tècnica, metodologia i eina?** Tècnica = principis a aplicar a cada pas; metodologia = ordre predeterminat d'aplicació de tècniques; eina = instrument per aplicar-les.
4. **Qui va crear UML i amb quina finalitat?** L'OMG, per elaborar estàndards sobre tecnologia orientada a objectes.
5. **Ordena les fases del cicle de vida en cascada.** Anàlisi prèvia → Anàlisi de requisits → Disseny → Programació → Prova → Engegada → Manteniment.
6. **Principal problema del cicle en cascada i solució?** No hi ha marxa enrere (requisits complets des del principi, tot correcte a la primera). Solució: *increments* i *iteracions*.
7. **Quin mètode és adequat per a projectes petits amb requisits dinàmics?** Els mètodes àgils (no prescriptius).
8. **Tres responsabilitats del director del projecte?** Planificació del treball, gestió de recursos humans i gestió dels riscs.
9. **Quines eines de planificació temporal utilitza el director?** Diagrames de Gantt o PERT.
10. **El mètode del curs és una variant de quin procés?** Del Unified Process.
