/*
  LIVING ARCHIVE — content file
  ------------------------------------------------------------
  Everything on the process map comes from this file.
  Edit text here; the map re-lays itself out automatically.

  Node fields
    id        unique, used in links:  index.html#w5-nyabf
    label     text on the map
    kind      'root' | 'week' | 'step' | 'work' | 'future'
    date      MM.DD  (weeks only — children inherit it)
    tag       assignment name (weeks only)
    text      short description, in my own words
    todo      what still needs to be added (shows as a dashed box)
    images    ['book/b10', 'bookfair/f7016', ...]  → assets/img/<folder>/{thumb,full}/<file>.jpg
    links     [{ label, url }]
    entries   [{ img: [...], source, url, about, text, more: { label, text, notes: [{ text, url }] } }]
              → one block per image (or pair): caption text is mine, as written
    feedback  [ 'note from class crit…' ]   → shown under "Feedback"
    response  [ 'what I did about it…' ]    → shown under "Response"
    title     longer heading shown in the panel (label stays short on the map)
    sections  [{ title, items: [...] }]  → numbered list, numbering runs on across sections
    href      works only — the standalone page to open
    island    true = grows as a separate cluster, joined by a long dotted line
    children  [ ...nodes ]
*/

(() => {
  const FAIR = [7016, 7017, 7022, 7023, 7026, 7027, 7028, 7032, 7036, 7038, 7039, 7040,
    7041, 7046, 7047, 7048, 7049, 7051, 7053, 7054, 7055, 7061, 7062, 7066, 7067, 7071,
    7072, 7073, 7074, 7075, 7076, 7077, 7078, 7080].map((n) => `bookfair/f${n}`);

  window.ARCHIVE = {
    meta: {
      author: 'Kiara Li',
      course: 'BFA Communication Design — Thesis 1, Fall 2026',
      updated: '09.27',
    },
    images: { FAIR },

    // Finished pieces — listed on works/, each with its own page
    works: [
      { id: '256', title: '256', kind: 'Printed book', date: '09.25', href: '256/', process: 'w4-256', cover: null },
    ],

    root: {
      id: 'root',
      kind: 'root',
      label: 'LIVING ARCHIVE',
      text: 'A record of the thesis as it grows — steps, material, feedback and responses.',
      children: [
        /* ───────────────────────── WEEK 1 ───────────────────────── */
        {
          id: 'w1', kind: 'week', label: 'From Interest to Question',
          date: '08.28', tag: '256 · Image Collection',
          feedback: [], response: [],
          children: [
            {
              id: 'w1-mindmap', kind: 'step', label: 'Mindmap',
              images: ['w1-mindmap/mindmap'],
            },
            {
              id: 'w1-images', kind: 'step', label: '12 Images',
              // one entry per image (or pair) — caption text is mine, as written
              entries: [
                {
                  img: ['w1-images/17'],
                  source: 'Instagram post by 40_who, 2006',
                  about: `While passing through a quarry in Sweden, the photographer noticed a strange shape in the snow. As he approached, he discovered an eagle lying there, leaving behind the trace of its final moments.`,
                  text: `This image reflects themes of nature, death, and trace. Rather than depicting the animal itself in a dramatic way, it focuses on the quiet imprint left behind, emphasizing absence, fragility, and the passage of life. The image resonates with my interest in slowness, care, and non-spectacular ways of seeing nature, where meaning emerges through subtle marks rather than visual excess.`,
                },
                {
                  img: ['w1-images/09'],
                  source: 'Ghost Forest',
                  text: `Ghost Forest addresses the fragile relationship between humans and nature by bringing dead trees into public urban space.`,
                },
                {
                  img: ['w1-images/18'],
                  source: 'Cannupa Hanska Luger, Mirror Shield Project, 2016, Oceti Sakowin camp, Standing Rock, ND',
                  text: `This project represents a gentle form of protest that uses reflection instead of confrontation. The mirror becomes a nonviolent tool, emphasizing environmental protection and respect for local culture.`,
                  more: {
                    label: 'Annotation',
                    text: `Cannupa Hanska Luger’s Mirror Shield Project transforms visibility into a tactical, relational tool of resistance, using reflective surfaces to compel militarized actors to confront their own bodies and the institutions they represent. The shields operate as “relational technologies,” reorganizing how vision and power interact: the traditional one-way gaze of authority is disrupted, and the perpetrator’s context is appropriated and inverted, exposing the ethical and structural violence embedded in their actions. By reflecting the observer back onto themselves, the project enacts a form of context reversal, making visible the social, political, and historical frameworks that sustain settler-colonial power. Simultaneously, the shields foster communal recognition among protestors, materializing collective responsibility and care. In this way, the project demonstrates how visibility can be redirected, manipulated, and ethically reconfigured to reveal hidden hierarchies and redistribute agency.`,
                    notes: [
                      { text: 'Corina L. Apostol and Nato Thompson, “Cannupa Hanska Luger,” Making Another World Possible, October 11, 2019, 102.', url: 'https://doi.org/10.4324/9780429468988' },
                      { text: 'Robyn Lee, “Art, Affect, and Social Media in the ‘No Dakota Access Pipeline’ Movement,” Theory, Culture & Society 40, no. 7–8 (March 1, 2023): 92.', url: 'https://doi.org/10.1177/02632764221146715' },
                      { text: 'Emilie Luckett, Radical Care in Precarious Times: The Socially Engaged Art of Cannupa Hanska Luger and STTLMNT, PhD diss., University of Colorado at Boulder, 2022, 11.', url: 'https://www.proquest.com/dissertations-theses/radical-care-precarious-times-socially-engaged/docview/2678514033/se-2' },
                    ],
                  },
                },
                {
                  img: ['w1-images/11', 'w1-images/12'],
                  source: 'D’Arcy Thompson, On Growth and Form (1917)',
                },
                {
                  img: ['w1-images/10'],
                  source: 'The Last Whole Earth Catalog',
                  url: 'https://wholeearth.info/p/the-last-whole-earth-catalog-january-1971?format=grid&index=437',
                  text: `The top half is a passage on geese migration. Since the Ice Age, every March the geese’s route has tied distant places into one whole — “from the China Sea to the Siberian Steppe, from the Euphrates to the Volga” — carrying the corn left in Illinois fields up to the Arctic tundra. The line below, “We all strive for safety, prosperity, comfort, long life, and dullness,” is the ending of Leopold’s other essay, Thinking Like a Mountain: people killed the wolves thinking it would help the deer, the deer overpopulated and ate the plants bare, and the whole mountain paid a bigger price.`,
                },
                {
                  img: ['w1-images/13'],
                  source: 'The Last Whole Earth Catalog — Wildlife Nurseries catalog ad',
                  text: `“If you got open water, you can plant various goodies that will attract ducks, as well as muskrats and fish.” A mail-order catalog selling things for making wildlife habitat, from Oshkosh, Wisconsin. The “-SB” at the end is Stewart Brand recommending it himself. People changing the environment on purpose to “invite” other species in.`,
                },
                {
                  img: ['w1-images/14'],
                  source: 'The Last Whole Earth Catalog — Polled Herefords',
                  text: `Top left: a pig with its parts labelled (SHOULDER, LOIN, RUMP…). The text is the breeding history of the Polled Hereford: in 1900 Warren Gammon wrote to Hereford breeders all over the US and found 13 purebred cattle born without horns, and bred a whole hornless breed from them — a case of people selecting on purpose to change a species.`,
                },
                {
                  img: ['w1-images/05'],
                  source: 'Smithsonian Institution Archives — “Dynamics of Evolution,” National Museum of Natural History',
                  url: 'https://siarchives.si.edu/collections/siris_sic_11643',
                  about: `The "Dynamics of Evolution" exhibit in the Smithsonian's National Museum of Natural History seen from above. A group of Smithsonian staff members pose for a photograph next to the "People Tower" and the "Dog Tower." The "People Tower" is covered with more than 100 larger than life-size photos of faces showing genetic traits, such as blue or brown eyes, or black or blond hair. The "Dog Tower" illustrates how "artificial" selection by human beings has influenced an animal's evolutionary history.`,
                },
                {
                  img: ['w1-images/03'],
                  text: `I usually think of birds at the beach as part of the scenery, but this made me notice how much they are already adapting to spaces shaped by humans. They are living around us even when we are not really paying attention to them.`,
                },
                {
                  img: ['w1-images/04'],
                  text: `Pigeons seem almost inseparable from the city now. I find it interesting that we built this environment for ourselves, but other species learned how to use it too, sometimes better than we expected.`,
                },
                {
                  img: ['w1-images/02'],
                  text: `Seeing pigeons standing together in the snow made me think about how much effort animals put into simply surviving conditions that we usually ignore. They look ordinary because we see them every day, but their lives are not necessarily easy.`,
                },
                {
                  img: ['w1-images/16'],
                  source: 'Giacomo Balla, Street Light',
                  text: `This painting transforms ordinary street lamps into beams of dancing light, capturing the rhythm, energy, and vitality of the city. Balla uses abstraction and motion to depict an idealized, utopian future, where light embodies hope, freedom, and possibility. The work resonates with my interest in how visual form can convey emotion and imagination, turning everyday phenomena into a medium for exploring future worlds and human experience.`,
                  more: {
                    label: 'Longer notes',
                    text: `Seeing Giacomo Balla’s Street Light left me truly amazed. The beams of light in the painting seem to dance, as if the city itself is breathing, and I can almost feel the rhythm and energy of the night. The light does more than illuminate the streets—it seems to depict an ideal future world: fast, free, and full of vitality. Balla captures the movement of light in an abstract way, turning street lamps into dancing forms, making the city feel alive. Calm or stillness are not his goals; instead, through speed, rhythm, and the pulse of light, he transforms the city into a vibrant, energetic organism. I am deeply moved by the idealized future world it envisions—a utopia that is fast, free, and full of hope.

Connecting it to the idea of “utopia,” I feel this painting sketches a possible future: every beam of light guides the way, every flicker symbolizes hope and energy. It makes me imagine—if the city could flow like light, would life feel lighter, freer? In Balla’s world, light is both order and imagination, a way for us to touch a future ideal.

From this painting, I’ve learned that art can go beyond reality to express a possible way of living and feeling. Light and motion are not only physical phenomena; they can also carry thought and emotion. Through abstraction and form, we can imagine an ideal city and world, even if it doesn’t yet exist in reality. Art allows us to experience a future utopia, awakening both imagination and the senses. Balla teaches me that even the most ordinary street lamps can, in an artist’s hands, become a medium for exploring the future and expressing hope.`,
                  },
                },
                {
                  img: ['w1-images/15'],
                  source: 'Louise Bourgeois, Maman (1999)',
                  text: `This monumental spider sculpture embodies themes of care, protection, and maternal strength. It resonates with my interest in cross-species perspectives and femininity, transforming the familiar (a spider) into a symbol of both vulnerability and power, and inviting viewers to reflect on relational bonds, memory, and the emotional presence of nature in art.`,
                },
                {
                  img: ['w1-images/08'],
                  source: 'Ideonella sakaiensis',
                  text: `I find it fascinating that a bacteria has evolved to break down a material that humans only invented recently. It feels like nature is already reacting to our waste, even though plastic was never supposed to be part of its environment.`,
                },
                {
                  img: ['w1-images/martha'],
                  source: 'Martha on display in 1985 in the National Museum of Natural History, by Carl Hansen, Smithsonian Institution, neg. no. 2002-3499.',
                  url: 'https://siarchives.si.edu/blog/martha-cold-and-lonely-last-migration',
                  text: `I think it is strange that a species can go from being extremely common to only existing as a specimen in a museum. It makes extinction feel much less distant because Martha was once just a normal bird.`,
                },
              ],
            },
            {
              id: 'w1-orders', kind: 'step', label: 'Orders',
              images: Array.from({ length: 16 }, (_, i) => `w1-orders/o${String(i + 1).padStart(2, '0')}`),
            },
          ],
        },

        /* ───────────────────────── WEEK 2 ───────────────────────── */
        {
          id: 'w2', kind: 'week', label: 'Sequence → Category → Book',
          date: '09.04', tag: '256 · Book Development',
          feedback: [], response: [],
          children: [
            {
              id: 'w2-unseen', kind: 'step', label: 'Unseen Actions',
              children: [
                {
                  id: 'w2-object', kind: 'step', label: 'Anti-bird Spikes',
                  images: ['w2-unseen/spikes'],
                },
                {
                  id: 'w2-actions', kind: 'step', label: '31 Actions',
                  title: 'The Unseen Actions Behind a Strip of Anti-Bird Spikes',
                  sections: [
                    {
                      title: 'I. The Metal',
                      items: [
                        'Chromite ore is mined in places such as South Africa and Kazakhstan. Chromium helps stainless steel resist rust outdoors.',
                        'Nickel may come from Indonesia or the Philippines. It improves the steel’s resistance to rain, salt, pollution, and bird droppings.',
                        'Iron, chromium, and nickel are melted together above 1,500°C. At this point, the steel could still become many different products.',
                        'The steel is drawn through smaller and smaller dies until it becomes wire about one millimetre thick.',
                        'The wire is cut and sharpened. The point needs to discourage birds from landing without being designed to injure them.',
                      ],
                    },
                    {
                      title: 'II. The Plastic',
                      items: [
                        'The plastic base begins with crude oil, refining, and petrochemical processing.',
                        'Benzene and propylene are used to make bisphenol A, which is used in polycarbonate plastic.',
                        'Polycarbonate production can involve phosgene, a toxic chemical that is now widely used in industry.',
                        'UV stabilisers are added so the plastic does not become brittle after long exposure to sunlight.',
                        'The bases are mass-produced by injection moulding. Much of the production cost comes from making the mould itself.',
                      ],
                    },
                    {
                      title: 'III. Adhesion and Mounting',
                      items: [
                        'Bird spikes are often attached with silicone or polyurethane adhesive.',
                        'Silicone begins with quartz processed into silicon, while polyurethane comes from a separate petrochemical process.',
                        'The adhesive is applied with a caulking gun, and the strip is often glued directly onto the building rather than bolted down.',
                        'Over time, the adhesive can weaken. When the strip is removed, dried glue may remain on the surface.',
                        'Some versions use ferrite or neodymium magnets instead. Much of the world’s rare-earth refining takes place in China.',
                        'The strip must also stay attached during strong wind so that it does not fall from the building.',
                        'Spikes may be chosen over netting because they interfere less with airflow, drainage, and access to rooftop equipment.',
                      ],
                    },
                    {
                      title: 'IV. Labour and Commerce',
                      items: [
                        'The materials and finished spikes may pass through several countries before reaching the building where they are installed.',
                        'In some factories, the metal pins are still inserted into the plastic base by hand.',
                        'Bird spikes are sold as ordinary building hardware and can be bought without special training or a licence.',
                        'Someone may need to clean bird droppings before installation, and clean the area again if the spikes do not work.',
                        'This maintenance labour is easy to overlook because it does not produce a new object.',
                        'The decision to install spikes is usually made by landlords, property managers, or building staff rather than the people living below them.',
                      ],
                    },
                    {
                      title: 'V. Why It Is Installed at All',
                      items: [
                        'Bird droppings can gradually damage stone, metal, paint, and other building materials.',
                        'Large accumulations of droppings can also create health risks, especially when they are disturbed during cleaning.',
                        'This is why bird control is often connected to cleaning, maintenance, public health, and building protection.',
                        'In 1979, Barnard student Grace Gold was killed by falling masonry in Morningside Heights.',
                        'New York City later introduced façade inspection laws requiring taller buildings to be checked regularly.',
                        'Sidewalk sheds are often installed during inspection or repair work. Their beams and covered surfaces can also create new places for pigeons to perch.',
                        'Building safety measures can therefore unintentionally create new bird habitat, which may later lead to more spikes being installed.',
                        'The final row of spikes comes from many separate systems: mining, manufacturing, shipping, maintenance, building management, safety regulations, and attempts to control how birds use urban space.',
                      ],
                    },
                  ],
                },
                {
                  id: 'w2-reflection', kind: 'step', label: 'Reflection',
                  title: 'Reflection — Anti-bird Spikes',
                  text: `I started with two sides of this object: why humans install spikes, and how birds respond to them. What became more interesting through the research was everything in between.

A lot of it comes down to rules and authority. The decision is usually made by a landlord or property manager, not the person living underneath. Some things are carefully regulated: for example, the strip has to stay attached so it does not fall and injure someone. But other parts, such as how sharp the pins should be, are much less clearly defined.

The same logic also appears in other forms of hostile design, such as benches designed to stop people from lying down. A situation is identified as a problem, then turned into a rule or design solution, which makes the same response easier to repeat.

What interests me is that everyone knows the spikes are meant for pigeons, but pigeons often find ways around them, and the spikes keep being installed anyway.

I want the book to show both procedures: how humans build a system to control a space, and how birds respond to that system. The reader should be able to follow the human logic from beginning to end.`,
                },
              ],
            },
          ],
        },

        /* ───────────────────────── WEEK 3 ───────────────────────── */
        {
          id: 'w3', kind: 'week', label: 'From 256 to Research Inquiry',
          date: '09.11', tag: 'Unseen Actions II',
          feedback: [], response: [],
          children: [
            {
              id: 'w3-encounters', kind: 'step', label: 'Unseen Actions',
              children: [
                {
                  id: 'w3-human', kind: 'step', label: 'A Human',
                  title: 'A Human — Trader Joe’s store manager',
                  // translated from Kiara's note (Chinese)
                  text: 'The manager of the Trader Joe’s on 14th St by NYU, because it is the only one with bird spikes installed above it.',
                  links: [{ label: 'Trader Joe’s, 14th St', url: 'https://locations.traderjoes.com/ny/new-york/540/' }],
                },
                {
                  id: 'w3-archive', kind: 'step', label: 'An Archive',
                  title: 'An Archive — eBird',
                  links: [{ label: 'eBird', url: 'https://ebird.org/home' }],
                },
                {
                  id: 'w3-ai', kind: 'step', label: 'An AI Prompt',
                  sections: [
                    { title: 'Prompt A', items: ['Design a device to prevent pigeons from resting on a storefront ledge.'] },
                    { title: 'Prompt B', items: ['Design a device to prevent humans from resting on a storefront ledge.'] },
                  ],
                },
              ],
            },
            {
              id: 'w3-proto', kind: 'step', label: '256 Prototype',
              images: Array.from({ length: 12 }, (_, i) => `w3-prototype/p${String(i + 1).padStart(2, '0')}`),
            },
            {
              id: 'w3-mindmap', kind: 'step', label: 'Mindmap',
              images: ['w3-mindmap/mindmap'],
            },
          ],
        },

        /* ───────────────────────── WEEK 4 ───────────────────────── */
        {
          id: 'w4', kind: 'week', label: 'What Do I Want to Do Next?',
          date: '09.18', tag: 'Research Map',
          text: 'Too early for a thesis question. Instead: look for where what I bring, what I can reach, and design as a lens overlap.',
          feedback: [], response: [],
          children: [
            {
              id: 'w4-map', kind: 'step', label: 'Research Map',
              text: 'Four areas, broken down until they get specific.',
              children: [
                { id: 'w4-bring', kind: 'step', label: 'What I Bring', todo: 'Background, skills, ways of working' },
                { id: 'w4-reach', kind: 'step', label: 'What I Can Reach', todo: 'Places, people, archives, collections' },
                { id: 'w4-lens', kind: 'step', label: 'Design as a Lens', todo: 'Which means of communication design' },
                { id: 'w4-sub', kind: 'step', label: 'Subtopics', todo: 'Break it down, then again' },
              ],
            },
            {
              id: 'w4-directions', kind: 'step', label: 'Three Directions',
              text: 'Each direction answers: which resource, what to find out, how to document and circulate it, and who it is for.',
              children: [
                { id: 'w4-dir-a', kind: 'step', label: 'Direction A', todo: 'Add the typeset sheet' },
                { id: 'w4-dir-b', kind: 'step', label: 'Direction B', todo: 'Add the typeset sheet' },
                { id: 'w4-dir-c', kind: 'step', label: 'Direction C', todo: 'Add the typeset sheet' },
              ],
            },
            {
              id: 'w4-256', kind: 'work', label: '256 — Printed Book',
              text: 'The finished book.',
              todo: 'Add book images',
              href: 'works/256/',
            },
          ],
        },

        /* ───────────────────────── WEEK 5 ───────────────────────── */
        {
          id: 'w5', kind: 'week', label: 'From Direction to Action',
          date: '09.25', tag: 'Research Activities',
          text: 'Moving from a research direction to actually doing something with it.',
          feedback: [], response: [],
          children: [
            {
              id: 'w5-doc', kind: 'step', label: 'Document 256',
              text: 'Scans of every spread of the finished book.',
              todo: 'Add the scans',
            },
            {
              id: 'w5-activities', kind: 'step', label: 'Research Activities',
              text: 'The two research activities, with drafts, sketches, notes and iterations.',
              children: [
                { id: 'w5-act-1', kind: 'step', label: 'Activity 1', todo: 'Add drafts and notes' },
                { id: 'w5-act-2', kind: 'step', label: 'Activity 2', todo: 'Add drafts and notes' },
                { id: 'w5-questions', kind: 'step', label: '10 Questions', text: 'What came up while doing — curiosities, confusions, things to test next.', todo: 'Add the 10 questions' },
              ],
            },
            {
              id: 'w5-papanek', kind: 'step', label: 'Reading: Papanek',
              text: 'Design for the Real World, ch. 1 (1971). What still holds, what feels dated, how I would frame the designer’s role today.',
              todo: 'Add reading notes',
            },
            {
              id: 'w5-visual', kind: 'step', label: 'Visual Research', island: true,
              text: 'Communication design that makes me want to make something.',
              children: [
                {
                  id: 'w5-nyabf', kind: 'step', label: 'NYABF 2026',
                  text: 'Photographed at the New York Art Book Fair, September 2026.',
                  todo: 'Choose the 10 for the archive',
                  images: FAIR,
                },
                {
                  id: 'w5-visual-text', kind: 'step', label: 'Reflection',
                  text: 'Not what I like — how communication design is being used across the examples.',
                  todo: 'Add the ~200 word reflection',
                },
              ],
            },
          ],
        },

        /* ───────────────────────── UPCOMING ───────────────────────── */
        { id: 'f1', kind: 'future', label: 'Drafts & Iterations', date: '10.02' },
        { id: 'f2', kind: 'future', label: 'Thesis Exchange — Prototype 1', date: '10.09' },
      ],
    },
  };
})();
