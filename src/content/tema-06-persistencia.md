# Tema VI — El disseny de les classes d'entitat i de la persistència

> **De què va aquest tema?** Tracta com revisar les classes d'entitat de l'anàlisi per preparar-les per a la construcció amb una tecnologia concreta i com dissenyar la seva persistència en una base de dades. Se centra en la substitució d'associacions per atributs referencials, la correspondència entre el model d'objectes i les BD relacionals, i el procés ordenat de disseny de la persistència.

## Disseny de les classes d'entitat

Consisteix en la **revisió de les classes d'entitat** de l'anàlisi per preparar-les per a la **construcció**. Passos:

1. **Normalització de noms** d'atributs, operacions i paràmetres no suportats pel llenguatge.
2. **Reutilització de classes** ja implementades → mitjançant *herència*.
3. **Substitució d'associacions (segons navegabilitat) per atributs referencials**.
4. **Disseny dels atributs derivats**: decidir com i quan es calculen (en modificació o en consulta?).
5. **Revisió de les relacions d'herència**: *overlapping* → herència múltiple; *herència múltiple* → interfícies.

## 3. Substitució d'associacions per atributs referencials

Regla general: una associació s'implementa convertint-la en atributs referencials (estereotip `«ref»`), respectant navegabilitat i multiplicitats.

**Associació binària navegable en un sol sentit**

- A —1..*→ B (navegable cap a B): A rep `«ref» atrA2: B [1..*]`; B no rep res.
- Navegable cap a A: l'atribut referencial es posa a la classe que navega, amb la multiplicitat de l'extrem oposat.

**Associació binària navegable en els dos sentits**

- Cada classe rep un atribut referencial cap a l'altra amb la multiplicitat de l'extrem oposat. Ex.: A `0..1` — `1..*` B → `A: «ref» atrA2: B [1..*]` i `B: «ref» atrB2: A [0..1]`.
- Quan tots dos extrems són `*` (`*` — `1..*`), s'introdueix una **classe d'enllaç** (`ClEnllac`): A i B referencien la classe d'enllaç, i aquesta referencia A i B.

**Classe associativa binària**

- La classe associativa C s'implementa repartint els atributs referencials entre A, C i B segons navegabilitat i multiplicitats. Quan els dos extrems són baixos (0..2 / 0..1) els atributs es poden incorporar a una classe combinada (AiC).
- Amb els dos extrems a `*` i navegable en els 2 sentits → es resol amb una **classe d'enllaç**.

**Associacions no binàries (ternàries, etc.)**

- S'implementen amb una **classe d'enllaç** (`ClEnllac`) amb un atribut referencial cap a cadascuna de les classes participants. Cada participant té `«ref» atr1: ClEnllac[*]`.

**Composició**

- Es pot representar per **conteniment**: els objectes components són atributs privats de l'objecte compost.

## Disseny de la persistència de les classes d'entitat

**Disseny d'una base de dades** per als objectes de les classes d'entitat que han d'estar disponibles en diferents casos d'ús i execucions.

- Calen **operacions addicionals**: gravació, lectura (i esborrat) a la BD.
- Cal donar **identitat** als objectes desats: seleccionar atribut(s) identificador o afegir-ne un de nou.

**Correspondències model d'objectes ↔ BD relacional:**

| Model d'objectes | BD relacional |
|---|---|
| Classe | Taula |
| Objecte | Fila |
| Atribut | Columna |
| Enumeració | Domini |
| Parell d'atributs referencials recíprocs (o atribut desaparellat) | Clau primària + clau forana |

**Diferències amb el model d'objectes:** herència i atributs de classe (*statics*) no suportats; la multiplicitat dels atributs és 1; calen claus primàries; calen operacions explícites de persistència.

## Procés de disseny de la persistència (10 passos — RESPECTAR L'ORDRE!)

1. Substituir els **atributs amb valors múltiples** no referencials per una nova classe/taula.
2. Definir **dominis** equivalents a les enumeracions.
3. Seleccionar un **identificador** per cada classe amb atributs adients.
4. **Assignació inicial de taules i columnes** a les classes que no participin en herència, sense considerar els referencials.
5. Representació de **l'herència**.
6. Substituir atributs referencials per **claus foranes**.
7. Assignar **identificador** a les classes que encara no en tinguin.
8. Especificar l'emmagatzematge dels **atributs de classe** (*static*).
9. Definició de **vistes**, si cal.
10. Afegir **operacions de persistència** a les classes d'entitat.

## 5. Representació de l'herència (opcions)

- Una **taula per cada subclasse** amb tots els atributs.
- Una **taula per la superclasse** + una **complementària per cada subclasse**, relacionades amb una clau forana.
- **Una taula per a tota la jerarquia** amb tots els atributs (superclasse + subclasses), posant a *nul* els que no corresponguin.

## 6. Claus foranes per als atributs referencials

- Per cada parella de classes relacionada, **almenys un dels atributs referencials té cardinalitat màxima 1** (o hi ha un referencial desaparellat).
- El parell (o l'atribut desaparellat) se substitueix per una **clau forana des de la taula amb cardinalitat 1** (o la que no tenia atribut referencial) **a la clau primària de l'altra taula**.

## Passos 7, 8 i 9

- **7. Assignar identificador** a les classes que encara no en tinguin (considerant les columnes de les claus foranes); si encara no n'hi ha → crear-ne un **artificial**.
- **8. Emmagatzematge dels atributs de classe**: nova taula o nova fila amb identificador especial fix.
- **9. Vistes**: quan els atributs d'una classe estan repartits en diferents taules (per herència o valors múltiples).

## 10. Operacions de persistència

Per cada classe d'entitat (sovint d'àmbit de classe / *static*):

- **Afegir objecte**: `afegirABaseDades()` → `objecteAFila()` + `gravar()`.
- **Llegir objecte**: `materialitzar(String)` rep l'SQL del SELECT → `llegirFiles()` + `filaAObjecte()`.
- `modificar(String)` i `esborrar(String)` reben l'SQL de l'UPDATE / DELETE.

Diagrama de la classe `Entitat`: `+afegirABaseDades()`, `-objecteAFila(): String`, `-gravar(fila: String)`, `+llegirX(param): Entitat[*]`, `-materialitzar(select: String): Entitat[*]`, `-llegirFiles(select: String): Fila[*]`, `-filaAObjecte(fila: Fila): Entitat`, `+modificar(update: String)`, `+esborrar(delete: String)`.

## Conceptes clau (glossari)

- **Classe d'entitat** — informació persistent del domini, s'ha de desar en BD.
- **Atribut referencial (`«ref»`)** — substitueix una associació apuntant a objectes d'una altra classe, segons navegabilitat.
- **Navegabilitat** — sentit(s) en què es recorre una associació; determina on es col·loquen els referencials.
- **Classe d'enllaç (ClEnllac)** — per implementar associacions `*`–`*`, associatives bidireccionals i no binàries.
- **Composició / conteniment** — components com a atributs privats de l'objecte compost.
- **Atribut derivat** — calculat d'altres; cal decidir si es calcula en modificació o en consulta.
- **Persistència** — capacitat dels objectes de mantenir-se entre execucions desant-los en BD.
- **Identitat / identificador** — atribut(s) que identifiquen un objecte; si no n'hi ha, se'n crea un d'artificial.
- **Clau primària** — identificador d'una fila.
- **Clau forana** — columna que apunta a la clau primària d'una altra taula; substitueix referencials.
- **Domini** — tipus de valors equivalent a una enumeració.
- **Vista** — consulta que reuneix atributs repartits en diferents taules.
- **materialitzar()** — operació que transforma files (d'un SELECT) en objectes.

## Preguntes de repàs

1. **En què consisteix el disseny de les classes d'entitat?** En revisar-les per preparar-les per a la construcció amb una tecnologia concreta.
2. **Com s'implementa una associació binària navegable en un sol sentit?** La classe que navega rep `«ref»` cap a l'altra amb la multiplicitat de l'extrem oposat; l'altra no rep res.
3. **Quan cal una classe d'enllaç?** En associacions `*`–`*`, classes associatives amb tots dos extrems a `*` navegables en els 2 sentits, i associacions no binàries.
4. **Correspondències model d'objectes ↔ BD relacional?** Classe↔taula, objecte↔fila, atribut↔columna, enumeració↔domini, referencials recíprocs↔clau primària + clau forana.
5. **Quines diferències obliguen a adaptar el model a una BD relacional?** No suporta herència ni statics, multiplicitat 1, calen claus primàries i operacions explícites de persistència.
6. **Tres opcions per representar l'herència?** Taula per subclasse; taula per superclasse + complementàries amb clau forana; una sola taula per jerarquia amb valors nul.
7. **Cap a on va la clau forana en substituir un parell de referencials?** Des de la taula amb cardinalitat màxima 1 (o la que no en tenia) cap a la clau primària de l'altra.
8. **Si una classe no té identificador natural?** Es crea un d'artificial.
9. **Quina operació transforma files d'un SELECT en objectes?** `materialitzar(String)`, composta per `llegirFiles()` + `filaAObjecte()`.
10. **És important l'ordre dels 10 passos?** Sí, s'ha de respectar.
