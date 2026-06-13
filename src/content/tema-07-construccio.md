# Tema VII — La construcció

> **De què va aquest tema?** Descriu la fase de construcció del programari, totalment enfocada a la tecnologia (llenguatge de programació), amb l'objectiu d'obtenir codi que compleixi les especificacions del disseny. Tracta les activitats de construcció, l'enginyeria del codi, tècniques especials de programació, recomanacions de codificació i la gestió de configuracions.

## Objectiu de la construcció

**Obtenir codi que compleixi les especificacions del disseny.** Està **totalment enfocada a la tecnologia** (llenguatge de programació).

## Activitats de la construcció

Es fan per blocs de codi de cada increment:

- **Codificació**: manual (programació) o (parcialment) automàtica (a partir de diagrames UML).
- **Prova** (validació i verificació).
- **Depuració.**
- **Optimització.**
- **Refactorització.**

## L'enginyeria del codi

Comprèn tots els processos que generen o modifiquen codi.

- **Directa**: passar de models a codi.
- **Inversa**: obtenir un model a partir del codi (es perd informació).
- **Reenginyeria**: enginyeria inversa + modificació del model generat + regeneració de codi (útil per a aplicacions existents sense model documentat).
  - **Refactorització**: modificar codi sense alterar-ne el funcionament.
- Reenginyeria i refactorització s'apliquen principalment en fase de **manteniment**.

**Depuració / debug:** trobar i corregir errors. Passos: *reproducció* (condicions precises: estat, entrades, paràmetres), *localització*, *correcció* i *verificació* (reproduint condicions i comprovant que no se n'han introduït de nous).

- *Eines:* comparadors de codi (entre versions); depuradors interactius (pas a pas, breakpoints…).
- *Regles:* comprendre el sistema; reproduir la falla; observar més que pensar; restringir la investigació (dividir i vèncer); canviar una sola cosa i tornar a provar; comprovar l'obvietat; demanar un altre punt de vista; els errors no s'arreglen sols.

**Optimització:** reduir temps d'execució i/o consum de recursos.

- Només quan el codi és **correcte**.
- Habitualment, només en certes parts (prioritats).
- *Profilers*: calculen el temps d'execució de cada part → fixació de prioritats.

**Refactorització:** millorar l'estil i estructura (*code health*) sense alterar el funcionament. Exemples: canviar noms actualitzant referències; definir una classe nova a partir d'un atribut; substituir una classe complexa per herència. Facilita el manteniment. *Quan:* codi duplicat → herència; classes molt grans → agrupar atributs; operacions amb molts paràmetres → agrupar en un objecte; noms poc intuïtius → canviar-los. Fer-ho **a mesura que es desenvolupa**, no al final.

## Tècniques especials de programació

- **Pair programming**: un programador escriu i l'altre revisa al mateix ordinador (almenys un és expert). Avantatges: aprenentatge, més qualitat, cobrir baixes. S'aplica en *extreme programming* i mètodes àgils.
- **Egoless programming**: revisions conjuntes del codi (no considerar el codi com a propi). Principis: acceptar que cometràs errors; "you are not your code"; sempre hi haurà algú que en sàpiga més; no reescriure sense consultar; respecte a qui en sap menys; l'únic constant és el canvi; l'autoritat ve del coneixement; criticar el codi, no les persones.
- **Programació defensiva**: comprovar **precondicions i postcondicions** per minimitzar errors; controlar visibilitat, desbordament de matrius, constants…

## Recomanacions sobre la codificació

**Noms:** descriptius, màxim **12 caràcters**. *Naming conventions*: sigles en majúscules; classes comencen per majúscula; atributs/variables en minúscula (booleanes = valor "positiu"); constants **totes en majúscules amb guió baix**; operacions amb verb infinitiu + complement (get/set); índexs `i`, `j` o noms descriptius. Consistència amb el disseny (**traçabilitat**).

**Comentaris:** només quan calen (propòsit, funcions/paràmetres, parts complexes, pendent…). Estructurats (*javadoc*).

**Variables i operacions:** declarar prop de la 1a utilització; agrupar constants en enumeracions; prevenir desbordaments; visibilitat més restringida possible; no usar variables globals; no usar paràmetres com a variables locals; tractar excepcions no verificades.

**Instruccions:** condicions de més a menys freqüent; no més de 3 nivells de bucles; no modificar la variable del `for`.

## La gestió de configuracions

**Identificar, seguir i emmagatzemar tot el codi i documentació del programari.**

**Quan:** diversos desenvolupadors en paral·lel; versions successives; parts opcionals; versions per a diferents plataformes. Resol: *quin codi i doc. correspon a cada lliurament? De quina versió s'ha de partir per modificar?*

**Conceptes:**

- **Configuració**: programa + documentació d'usuari + doc. de desenvolupament i manteniment. Tipus:
  - **Línia base (*baseline*)**: configuració revisada i acceptada, base per al desenvolupament futur. És *reproduïble*, *traçable* i amb *composició* documentada.
  - **Versió**: línia base que incorpora canvis a una de prèvia.
    - **Variant**: mateixa funcionalitat per a un altre sistema.
    - **Revisió**: substitueix la versió anterior.
  - **Lliurament (*release*)**: versió que es lliura al client.
    - **Delta**: lliurament parcial que genera la versió següent (*forward delta*) o anterior (*reverse delta*); estalvia espai.

**Activitats:** **Gestió** de versions (requereix *repositori*, *locked*, *branching*, *merging*); **Integració** (quins elements i versions formen una configuració); **Auditoria** (comprovar que els elements estan a punt).

## Conceptes clau (glossari)

- **Construcció** — fase d'obtenció de codi que compleix el disseny, enfocada a la tecnologia.
- **Enginyeria directa** — generar codi a partir de models.
- **Enginyeria inversa** — obtenir un model a partir del codi (amb pèrdua d'informació).
- **Reenginyeria** — inversa + modificació del model + regeneració de codi.
- **Refactorització** — modificar/millorar el codi sense alterar-ne el funcionament.
- **Depuració (debug)** — trobar i corregir errors (reproducció, localització, correcció, verificació).
- **Profiler** — eina que mesura el temps d'execució de cada part per prioritzar l'optimització.
- **Pair programming** — dos programadors, un escriu i l'altre revisa al mateix ordinador.
- **Egoless programming** — revisions conjuntes, sense considerar el codi com a propi.
- **Programació defensiva** — comprovar precondicions i postcondicions per minimitzar errors.
- **Gestió de configuracions** — identificar, seguir i emmagatzemar codi i documentació.
- **Línia base (baseline)** — configuració revisada i acceptada, reproduïble i traçable.
- **Versió / variant / revisió** — línia base amb canvis; variant per a un altre sistema; revisió substitueix l'anterior.
- **Lliurament (release) / delta** — versió lliurada al client; delta = lliurament parcial (forward/reverse).
- **Branching / merging / locked** — modificació en paral·lel / unificació posterior / bloqueig en modificació.

## Preguntes de repàs

1. **Objectiu de la construcció?** Obtenir codi que compleixi les especificacions del disseny, enfocant-se a la tecnologia.
2. **Activitats de la construcció?** Codificació, prova, depuració, optimització i refactorització (per blocs de cada increment).
3. **Enginyeria inversa vs. reenginyeria?** La inversa obté un model del codi (es perd informació); la reenginyeria afegeix modificar el model i regenerar el codi.
4. **Quan s'optimitza?** Només quan el codi és correcte i, habitualment, en certes parts segons prioritats (amb *profilers*).
5. **Què és la refactorització i quan es fa?** Millorar estil i estructura sense alterar el funcionament; a mesura que es desenvolupa, no al final.
6. **Què és el pair programming i on s'aplica?** Un programa i l'altre revisa al mateix ordinador (almenys un expert); en *extreme programming* i mètodes àgils.
7. **Què caracteritza la programació defensiva?** Comprovar precondicions i postcondicions, controlar visibilitat, desbordaments…
8. **Longitud màxima dels noms i com es nomenen les constants?** Màxim 12 caràcters; constants en majúscules amb guió baix.
9. **Què és una línia base?** Configuració revisada i acceptada, base del desenvolupament futur (reproduïble, traçable, composició documentada).
10. **Què és un delta i quins tipus hi ha?** Lliurament parcial que genera la versió següent (*forward*) o anterior (*reverse*); estalvia espai.
