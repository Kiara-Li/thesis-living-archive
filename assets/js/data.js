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
    title     longer heading shown in the panel (label stays short on the map)
    blocks    [{ title, text }]          → headed paragraphs (e.g. the four questions)
    sections  [{ title, items: [...] }]  → numbered list, numbering runs on across sections
    href      works only — the standalone page to open
    hidden    true = kept here but not shown on the map (not ready yet)
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
      updated: '09.30',
    },
    images: { FAIR },

    // Finished pieces — listed on works/, each with its own page
    works: [
      { id: '256', title: 'Installation Heights of Street Furniture and Observed Pigeon Use, New York City', kind: 'Printed book', date: '09.25', href: '256/', process: 'w4-256', cover: null },
    ],

    root: {
      id: 'root',
      kind: 'root',
      label: 'LIVING ARCHIVE',
      text: 'A record of the thesis as it grows.',
      children: [
        /* ───────────────────────── WEEK 1 ───────────────────────── */
        {
          id: 'w1', kind: 'week', label: 'From Interest to Question',
          date: '08.28', tag: '256 · Image Collection',
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
          children: [
            {
              id: 'w4-directions', kind: 'step', label: 'Three Directions',
              children: [
                {
                  id: 'w4-dir-1', kind: 'step', label: 'Coexistence',
                  title: 'Direction One — Coexistence',
                  images: ['w4-directions/d1'],
                  text: `My thesis topic is evolution. One direction I want to explore is coexistence. I put coexistence under evolution because it can be connected to survival, choice, chance, and opportunity. Coexistence can include humans and animals, humans and AI, humans and the environment, and even our relationship with civilizations or beings that we cannot understand. It can move from a very small scale to a very large scale.`,
                  blocks: [
                    { title: '1 Which resource do I want to interact with', text: `I want to do field trips, interviews, and attend talks. I am interested in projects such as sea turtle education activities, bird rescue centers, and public projects in New York that grow shellfish to help clean the riverbed. I want to interview the people who work on these projects and listen to them explain their work.` },
                    { title: '2 What do I want to find out', text: `Humans and other living things have always existed together. I want to know what this relationship may become in the future. I want to understand the connections between humans and animals, humans and other humans, humans and AI, and humans and wider forms of life or civilization. What is the value of these connections? What have we gained from them? What will we have to face together? I am also interested in what the future relationship between humans and AI may be, but AI does not have to be the main subject.` },
                    { title: '3 How will I document and circulate what I find', text: `This topic could work as science communication because it may show perspectives that people do not usually see. I could make a video or short videos. I could also make a publication, science textbook, science magazine, science posts, or something connected to natural history. If I make science communication, I want the information to be as accurate as possible.` },
                    { title: '4 Who could be interested in this', text: `I think this could reach a broad audience because it is still about us and the relationships in our daily lives. My pigeon project also used another point of view, but it was about the environment around us and the birds we see. I want this project to have the same feeling of something people can reach in everyday life. People who are interested in research, natural history, nature, and environmental protection may be especially interested.` },
                  ],
                },
                {
                  id: 'w4-dir-2', kind: 'step', label: 'Pattern and Chance',
                  title: 'Direction Two — Evolution as Pattern and Chance',
                  images: ['w4-directions/d2'],
                  text: `This direction is about accumulation, DNA, mistakes, choices, chances, and opportunities. It may not be the direction I am most interested in, but I think it could become an interesting project. Evolution can be considered not only through biology, but also through human history and technological development.`,
                  blocks: [
                    { title: '1 Which resource do I want to interact with', text: `I want to talk with someone who studies this area. I also want to talk with many people and see how they understand evolution. Evolution is difficult to project onto one person, so I want to hear how different people understand major historical opportunities, personal opportunities, painful growth, and transformation. I also want to look at this question through scientific research.` },
                    { title: '2 What do I want to find out', text: `Each stage of evolution may involve meeting errors, correcting something like a program, leaving some things behind, and moving into a new stage. At the same time, the new stage has traces that can be followed, and history can repeat in cycles. Biological evolution, technological evolution, and human history may follow similar patterns. I want to understand these mechanisms, rules, and opportunities. I also want to know how people understand chances that may change their lives. From a larger view, I want to ask how earlier forms of evolution can be used to make reasonable guesses about later forms of evolution.` },
                    { title: '3 How will I document and circulate what I find', text: `I would like to make a very thick and heavy book that records many things. I could also make commercial motion graphics because this topic can use abstract metaphors, geometric forms, black and white, and light and dark. Another possibility is a small interactive product, such as a website or app. It does not have to help people directly. It can simply be interesting and allow people to interact with the idea.` },
                    { title: '4 Who could be interested in this', text: `I think everyone could be interested because it connects large ideas about evolution and history with personal chances, growth, pain, transformation, and changes in a person's life. I have not decided on a more specific audience yet.` },
                  ],
                },
                {
                  id: 'w4-dir-3', kind: 'step', label: 'Future Bodies',
                  title: 'Direction Three — Biological Evolution and Future Bodies',
                  images: ['w4-directions/d3'],
                  text: `I want my thesis to be about evolution, so it is difficult for me to create a third direction that tries to avoid this subject. This direction stays with evolution and looks more directly at biological change, the future of this generation, and what humans and other living things may become. AI can be part of the discussion, but I do not want AI to be the main topic.`,
                  blocks: [
                    { title: '1 Which resource do I want to interact with', text: `I want to talk with researchers. I could also use research archives, books, libraries, and online archives. The resources would be related to biology and possibly pharmacology.` },
                    { title: '2 What do I want to find out', text: `I want to look at how human bodies and other living things are still changing in modern society. Some changes may be called degeneration and some may be called evolution. I am interested in the example I heard about insects connected to plastic, and I want to understand what has actually evolved. I want to ask what humans and other living things may eventually evolve into. I also want to consider the comment I mentioned about humans being unable to understand AI and AI killing us, but I do not want AI to be the main topic. I am also interested in the example we discussed in which an idea about the path of human evolution came from a printing error. This makes me think about the role of the author in science media and about the limits of science communication design.` },
                    { title: '3 How will I document and circulate what I find', text: `Evolution could be made into a game. Pokemon presents evolution as something that cannot be reversed, changes appearance, and makes a character stronger, although people do not always like every evolution. I think a game could use a more enjoyable form to discuss how people understand evolution.` },
                    { title: '4 Who could be interested in this', text: `I have not decided on the specific audience for this direction yet.` },
                  ],
                },
              ],
            },
            {
              id: 'w4-256', kind: 'work', label: 'The 256 Project',
              href: 'works/256/',
              images: ['256-show/h9', '256-show/h7', '256-show/h8', '256-show/s1', '256-show/s2', '256-show/s3', '256-show/s4', '256-show/s5', '256-show/s6'],
            },
            {
              id: 'w4-abf', kind: 'step', label: 'Art Book Fair', island: true,
              images: FAIR,
            },
          ],
        },

        /* ───────────────────────── WEEK 5 ───────────────────────── */
        {
          id: 'w5', kind: 'week', label: 'From Direction to Action',
          date: '09.25', tag: 'Research Activities',
          children: [
            {
              id: 'w5-direction', kind: 'step', label: 'Direction',
              children: [
                {
                  id: 'w5-now', kind: 'step', label: 'Where I Am Now',
                  text: `My thesis started as "evolution." After Pascal's feedback and this week's reading, I am moving toward a narrower direction:

The city as habitat. Looking at New York as an ecological environment, the same way we would look at a marsh or a mudflat, with humans as one of the species living in it.

I am still keeping evolution, but as a timescale in the background, not as the whole topic. Evolution is still happening in the city now. Humans are still evolving too, we just can't feel it in one lifetime.`,
                },
                {
                  id: 'w5-changed', kind: 'step', label: 'How the Direction Changed',
                  text: `Week 4: Three directions: (1) Coexistence, (2) Evolution as Pattern and Chance, (3) Biological Evolution and Future Bodies.

Week 4–5: Two research activities planned under "evolution as a pattern of change": an archive of NYC environmental projects, and TRACE (people drawing their life as one line).

This week: Went back to why I chose this thesis in the first place, then read about multispecies time. Narrowed down to two options:

1. The city as a new ecological environment, including how the city perceives and holds time, from both animal and human sides.

2. Multispecies time and how different futures are woven together.

For now I am going with option 1. Option 2 becomes a way of looking inside option 1, not a separate topic.`,
                },
                {
                  id: 'w5-why', kind: 'step', label: 'Why I Started',
                  text: `I first chose this thesis because birds can see colors humans cannot see. Later it became about human efforts to repair nature. What I actually want is not to feel sorry for other species from a human point of view, but to put humans back into the ecosystem and look at nature, and our own future, as a whole.`,
                },
              ],
            },
            {
              id: 'w5-documented', kind: 'step', label: 'What I Have Documented',
              text: `Billion Oyster Project, Governors Island

Rooftop greening in NYC

These are the starting cases for my archive of human attempts to repair or reshape the city.`,
            },
            {
              id: 'w5-readings', kind: 'step', label: 'Readings and References',
              children: [
                {
                  id: 'w5-papanek', kind: 'step', label: 'Papanek',
                  title: 'Victor Papanek, Design for the Real World, Ch. 1',
                  text: `Reading it brought me back to a paper I wrote earlier on microwave UI/UX and passive consumption. I want to put that paper on this site as well.`,
                },
                {
                  id: 'w5-butterfly', kind: 'step', label: 'Living in the Time of the Butterfly',
                  title: 'González-Duarte, C. & Méndez-Arreola, R. "Living in the time of the butterfly": Engaging more-than-human temporalities to rethink biodiversity conservation. Journal of Political Ecology.',
                  text: `I found this myself. It is about the Mazahua and Otomi communities in the Monarch Butterfly Biosphere Reserve in Mexico. Their time moves in cycles shared between rain, corn, butterflies, and ancestors, while conservation brought in a linear, single-species timeline.

It made me think that life and change might be understood differently across species too. That is why I say humans are still evolving.

Columba González-Duarte teaches anthropology at The New School for Social Research. I hope to contact her for an interview.`,
                  links: [
                    { label: 'doi.org/10.2458/jpe.5015', url: 'https://doi.org/10.2458/jpe.5015' },
                    { label: 'Columba González-Duarte, The New School', url: 'https://www.newschool.edu/nssr/faculty/columba-gonz%C3%A1lez-duarte/' },
                  ],
                },
                {
                  id: 'w5-urban', kind: 'step', label: 'Urban Evolution in New York',
                  text: `Atlantic tomcod in the Hudson River evolved resistance to PCB pollution within about 50–100 years. The river cleanup could now be a problem for them.

White-footed mice in NYC parks and rats in Manhattan show genetic differences shaped by the city. Johnson, M.T.J. & Munshi-South, J. (2017). Evolution of life in urban environments. Science.`,
                  links: [
                    { label: 'WHOI — Pollution triggers genetic resistance in a coastal fish', url: 'https://www.whoi.edu/press-room/news-release/pollution-triggers-genetic-resistance-mechanism-in-a-coastal-fish' },
                    { label: 'Science — Evolution of life in urban environments', url: 'https://www.science.org/doi/10.1126/science.aam8327' },
                  ],
                },
                {
                  id: 'w5-ipbes', kind: 'step', label: 'Nature Futures Framework',
                  title: 'IPBES — Nature Futures Framework',
                  text: `A framework for imagining futures for nature through three values: nature for nature, nature for society, nature as culture. The future is not one line.`,
                  links: [{ label: 'zenodo.org/records/8171339', url: 'https://zenodo.org/records/8171339' }],
                },
                {
                  id: 'w5-interspecies', kind: 'step', label: 'Interspecies Library',
                  title: 'Oscar Salguero — Interspecies Library',
                  text: `An archive of artists' books about interspecies futures, based in Brooklyn.

My reaction: I didn't like it, as a whole collection. It uses animals as aesthetic material and humor to say something about humans, more than actually caring about the animal's perspective. There is little scientific basis. It helped me see what I don't want to do.`,
                  links: [{ label: 'interspecieslibrary.com', url: 'https://interspecieslibrary.com/' }],
                },
                {
                  id: 'w5-pollinator', kind: 'step', label: 'Pollinator Pathmaker',
                  title: 'Alexandra Daisy Ginsberg — Pollinator Pathmaker',
                  text: `A garden designed for pollinating insects, not for the human eye. The planting algorithm is public.

My reaction: I really liked it. It feels like the same kind of thing as the oyster project and the rooftop gardens I documented.`,
                  links: [
                    { label: 'Museum für Naturkunde Berlin', url: 'https://www.museumfuernaturkunde.berlin/en/programme/pollinator-pathmaker' },
                    { label: 'pollinator.art', url: 'https://pollinator.art/' },
                  ],
                },
              ],
            },
            {
              id: 'w5-activities', kind: 'step', label: 'Research Activities',
              children: [
                {
                  id: 'w5-act-1', kind: 'step', label: '01 — Archive of Human Attempts',
                  text: `Human efforts to repair, improve, reshape, or imagine our relationship with the environment and other living things. Starting with the oyster project and rooftop gardens. Pollinator Pathmaker and the Hudson tomcod could go in as well.`,
                },
                {
                  id: 'w5-act-2', kind: 'step', label: '02 — TRACE',
                  text: `Participants draw their life as one continuous line and mark moments with a limited set of scanned objects. I don't tell them the project is about evolution. I plan to start with a paper version before building the website. This may change to fit the city direction.`,
                },
              ],
            },
            {
              id: 'w5-earlier', kind: 'step', label: 'Earlier Work: Sustainability Course', island: true,
              text: `These two pieces are from a sustainability class I took before. Looking back, they were already about the same questions.`,
              entries: [
                {
                  source: 'Water',
                  text: `A digital painting with hand-lettered text about water from a Lakota understanding. Mni is the Lakota word for water.`,
                },
                {
                  source: 'Skywoman and the turtle',
                  text: `A collage made from cut paper and cut-out text, based on the Skywoman creation story, where the geese, the muskrat, and a great turtle help make the land.`,
                },
              ],
            },
          ],
        },

        /* ───────────────────────── UPCOMING ───────────────────────── */
        { id: 'f1', kind: 'future', hidden: true, label: 'Drafts & Iterations', date: '10.02' },
        { id: 'f2', kind: 'future', hidden: true, label: 'Thesis Exchange — Prototype 1', date: '10.09' },
      ],
    },
  };
})();
