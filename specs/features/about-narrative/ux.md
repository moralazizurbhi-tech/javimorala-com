# Feature UX Specification: About Narrative

**Status:** Approved

## UX Scope

Specializes Project UX's Personal Narrative screen and its "Learn about
Javi" User Flow, for the composition of narrative text and two personal
photos into one cohesive, fully static screen moment — together with a
small, subordinate mention that the site was built through AI-assisted
development, woven directly into the narrative text rather than presented
as a separate element. Consistent with Feature Solution/Contract's
boundary: excludes nav, presence links, motion timing/sequencing, and any
skills/experience timeline (removed from this Feature's scope by this
cycle's Refine Feature Definition/Context/Solution/Contract changes).

## User Flows

### Learn about Javi

Specializes Project UX's "Learn about Javi" flow.

- Visitor reaches the Personal Narrative screen (via scroll or
  `section-navigation`'s "about" link) → the complete About Narrative
  composition — narrative text, including its closing AI-development
  line, and the two personal photos — is available immediately, with no
  interaction required to reveal any part of it (Contract Commitment 1)
  → visitor reads at their own pace → continues (scrolls onward, uses
  `section-navigation`, or leaves).

## Screens

### Personal Narrative

Existing identity, from Project UX's Screens.

- Purpose: present Javi's identity in his own voice, in depth, as one
  cohesive moment. Participates in the Learn about Javi flow. Shared with
  the `ai-assisted-development-note` capability — About Narrative is
  dominant/primary content; the AI-development line stays
  subordinate/quiet within it (Project UX Screen Composition).
- Perceptual/experience direction: the narrative text leads the
  composition — its first line functions as the opening/greeting, rather
  than a separate preceding intro block; the two photos are presented
  alongside the narrative text, not before it as their own section; each
  narrative paragraph and each photo is a separately addressable
  structural unit, a composition choice made so the separately owned
  `motion-interaction` Feature has individual pieces to apply
  scroll-reveal/interaction treatment to later — this Feature defines no
  motion, timing, or reveal behavior itself. Exact spatial layout, sizing,
  and positioning are Pending, left entirely to Feature UI.
- Desktop and mobile both realize this same experience; the specific
  per-device-class realization is Pending, left to Feature UI.

## Interaction States

- None — the composition renders directly and statically; no loading,
  empty, success, error, or transitional states apply (Feature Solution's
  "no interactive substates"; Contract Commitments 1 and 4 — no visitor
  interaction reveals, hides, toggles, or enlarges any piece).

## Feature Components

- **Narrative Text** — Javi's confirmed personal narrative, in his own
  voice; structured as discrete paragraph-level blocks (not one merged
  block), with the AI-assisted-development line as its final block —
  never its opening line (Contract Commitment 2).
- **Personal Photos (×2)** — two photos, presented simultaneously
  (Contract Commitment 4), each its own discrete container, placed
  alongside the narrative text rather than preceding it.

## Content and Assets

- **Narrative text (English)** — Confirmed, verbatim:
  1. "I'm Javi. I like making things. Software is one of the ways I do
     it, but probably not the most interesting way to describe me."
  2. "I'm a computer engineer by background, and I've spent the last
     several years building software professionally. Along the way,
     I've realised that what I enjoy most isn't necessarily writing the
     code itself. It's everything around it: thinking about what could
     exist, exploring different approaches, experimenting with ideas and
     eventually making something real."
  3. "I'm drawn to things that don't feel completely familiar. New
     ideas, unusual approaches, modern experiences — anything that makes
     me stop and think, why not do it differently?"
  4. "That mindset tends to follow me outside technology too. I like
     learning things I don't already know, and finding new ways to
     create. At the moment, for example, I'm learning how to sew. Not
     because it has anything to do with software, but because making
     something with your hands is another kind of problem-solving, and I
     like that."
  5. "Technology itself is changing in much the same way. AI is
     reshaping how software is built, and I don't think the interesting
     question is whether we should use it. The interesting question is
     what becomes possible when creating software no longer depends so
     heavily on writing every line ourselves. I'm interested in that
     shift. Less time spent on the mechanics of coding. More time
     thinking, exploring, directing and creating. That's probably where
     I want to keep going."
  6. "This site itself is one small example of that — built with
     AI-assisted development, with more of my time spent directing and
     thinking than typing every line."
- **Narrative text (Spanish)** — Confirmed, verbatim:
  1. "Soy Javi. Me gusta crear cosas. El software es una de las formas
     en las que lo hago, pero probablemente no la forma más interesante
     de describirme."
  2. "Soy ingeniero informático de formación, y llevo varios años
     construyendo software de manera profesional. Por el camino, me he
     dado cuenta de que lo que más disfruto no es necesariamente
     escribir el código en sí. Es todo lo que lo rodea: pensar en qué
     podría existir, explorar diferentes enfoques, experimentar con
     ideas y, finalmente, hacer algo real."
  3. "Me atraen las cosas que no resultan del todo familiares. Ideas
     nuevas, enfoques poco habituales, experiencias modernas — cualquier
     cosa que me haga parar y pensar: ¿por qué no hacerlo de otra
     manera?"
  4. "Esa forma de pensar también me acompaña fuera de la tecnología. Me
     gusta aprender cosas que no sé, y encontrar nuevas formas de crear.
     Ahora mismo, por ejemplo, estoy aprendiendo a coser. No porque
     tenga nada que ver con el software, sino porque hacer algo con las
     manos es otro tipo de resolución de problemas, y eso me gusta."
  5. "La tecnología en sí está cambiando de una manera muy parecida. La
     IA está transformando cómo se construye el software, y no creo que
     la pregunta interesante sea si deberíamos usarla. La pregunta
     interesante es qué se vuelve posible cuando crear software ya no
     depende tanto de escribir cada línea nosotros mismos. Me interesa
     ese cambio. Menos tiempo dedicado a la mecánica de programar. Más
     tiempo pensando, explorando, dirigiendo y creando. Probablemente
     ahí es donde quiero seguir avanzando."
  6. "Esta misma web es un pequeño ejemplo de eso — construida con
     desarrollo asistido por IA, dedicando más tiempo a dirigir y
     pensar que a escribir cada línea."
- **Narrative text (Euskera)** — Confirmed, verbatim (lower-confidence
  draft; flagged for native review before launch, since Project
  Architecture requires all three languages to be authored directly by
  Javi Morala, not machine-translated):
  1. "Javi naiz. Gauzak sortzea gustatzen zait. Softwarea horretarako
     erabiltzen dudan bide bat da, baina agian ez da ni deskribatzeko
     modurik interesgarriena."
  2. "Informatika ingeniaria naiz jatorriz, eta azken urteotan softwarea
     modu profesionalean eraikitzen aritu naiz. Bidean konturatu naiz
     gehien gustatzen zaidana ez dela nahitaez kodea idaztea bera.
     Inguruan dagoen guztia da: zer egon liteke pentsatzea, ikuspegi
     desberdinak esploratzea, ideiekin esperimentatzea eta azkenean
     zerbait erreala sortzea."
  3. "Ez oso ezagunak diren gauzek erakartzen naute. Ideia berriak,
     ikuspegi ez-ohikoak, esperientzia modernoak — geldiarazi eta
     pentsarazten nauen edozer: zergatik ez egin bestela?"
  4. "Pentsamolde hori teknologiatik kanpo ere jarraitzen dit. Ez
     dakidan zerbait ikastea gustatzen zait, eta sortzeko modu berriak
     topatzea. Orain, adibidez, josten ikasten ari naiz. Ez
     softwarearekin zerikusirik duelako, baizik eta eskuekin zerbait
     egiteak beste era bateko arazo-konponketa delako, eta hori
     gustatzen zait."
  5. "Teknologia bera ere antzeko modu batean ari da aldatzen. Adimen
     artifizialak softwarea nola eraikitzen den aldatzen ari da, eta ez
     dut uste galdera interesgarria erabili behar dugun ala ez denik.
     Galdera interesgarria da zer bihurtzen den posible software
     sortzeak lerro bakoitza geuk idaztearen hain menpekoa izateari
     uzten dionean. Aldaketa horrek interesatzen nau. Denbora gutxiago
     programatzearen mekanikan. Denbora gehiago pentsatzen, esploratzen,
     zuzentzen eta sortzen. Hortik jarraitu nahi dut, ziurrenik."
  6. "Webgune hau bera horren adibide txiki bat da — adimen
     artifizialaren laguntzaz garatua, denbora gehiago zuzentzen eta
     pentsatzen emanez, lerro bakoitza idazten baino."
- **Personal photos** — Confirmed: two photos. Pending: actual image
  assets — placeholders meanwhile, per Feature Context.

## UX Constraints

- The AI-development line must never precede the narrative text (Contract
  Commitment 2); satisfied by construction as the narrative's final
  block.
- No visitor interaction may reveal, hide, toggle, page, or enlarge any
  content piece (Contract Commitments 1 and 4).
- Narrative paragraphs and photo containers are structured as discrete,
  separately addressable units — a composition choice made for the
  benefit of the separately owned `motion-interaction` Feature; this
  Feature defines no motion, timing, or reveal behavior itself.
- Presence links (e.g., Instagram/LinkedIn) are excluded from this
  screen — scoped instead to the `presence-links` Feature on the
  Connection screen, per Project UX's existing Decision.
- Full keyboard operability, visible focus states, sufficient contrast,
  and assistive-technology compatibility apply to this screen's content,
  consistent with Project UX's UX Constraints.

---

*Created: 2026-09-06*
