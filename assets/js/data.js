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
    embed     a page to show live inside the panel, e.g. 'trace/'
    story     true = entries read text first, then their photos
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
      updated: '10.05',
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
              text: `During my visit to the bookfair, I noticed how many books use material to communicate their ideas before I even open them. One cover used fabric that looked like leaves. Another used PVC plastic arranged in a grid. Other covers also made me want to touch them and think about why those particular materials had been chosen. The material was doing more than decorating the book. It gave me an immediate sense of its subject and changed how I approached it.

In my own bookmaking, I have usually focused on structure: how a book opens, how its pages are organized, and how its form can express the content. This visit made me realize that I have paid much less attention to the material itself. Paper, fabric, and plastic can create a feeling or suggest an idea before the reader gets to the words and images. I want to think more carefully about these choices in my future work, especially when making books.

I also felt encouraged to be bolder with my ideas. I do not always need to follow an expected way of making something. I want to enjoy experimenting with materials and feel more excited and free while designing.`,
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
                  title: 'Where I Am Now (Current Topic)',
                  // translated from Kiara's note (Chinese), 09.30
                  text: `The evolutionary timescale of the city, and the way time is perceived in a city — maybe not only from an animal's point of view, but from a human one as well. The focus may be on the city itself: treating the city as a new kind of ecological environment and studying it the way we would study a marsh or a mudflat.

Roughly, the thesis asks: if the city is treated as an ecological environment, how is it different from traditional environments? How does it open new opportunities for evolution, and how does it affect the way different species perceive time? How is every member living in this ecosystem affected — the species that live in the city, and the city's structures themselves? How do they adapt to each other, understand each other, or fail to? And could this lead to better solutions and new opportunities in the future?

In short: if we treat the city as a new ecological environment, how does it change time for every member living in it — both the species and the structures of the city itself? And how do they adapt to one another, or misunderstand one another?`,
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
                  id: 'w5-butterfly', kind: 'step', label: 'Living in the Time of the Butterfly',
                  title: 'González-Duarte, C. & Méndez-Arreola, R. "Living in the time of the butterfly": Engaging more-than-human temporalities to rethink biodiversity conservation. Journal of Political Ecology.',
                  text: `I found this myself. It is about the Mazahua and Otomi communities in the Monarch Butterfly Biosphere Reserve in Mexico. Their time moves in cycles shared between rain, corn, butterflies, and ancestors, while conservation brought in a linear, single-species timeline.

It made me think that life and change might be understood differently across species too. That is why I say humans are still evolving.

Columba González-Duarte teaches anthropology at The New School for Social Research. I hope to contact her for an interview.`,
                  blocks: [
                    {
                      title: 'Next step — email to Professor González-Duarte (gonzalc2@newschool.edu)',
                      text: `Subject: Parsons thesis student — request for a short conversation

Dear Professor González-Duarte,

My name is Kiara Li, and I'm a senior in the BFA Communication Design program at Parsons, currently in Thesis 1.

I recently read your article with Roberto Méndez-Arreola, "Living in the time of the butterfly," and it changed how I'm thinking about my thesis. The idea that rain, corn, butterflies, and people share rhythms that don't fit a linear, single-species conservation timeline stayed with me.

My thesis looks at New York City as a new kind of habitat, and at how the city shapes the time of the species and structures living in it. I'm documenting local projects like the Billion Oyster Project and green roofs, and comparing human project timelines with the life cycles of the species they are meant to help.

Would you have 20–30 minutes in the coming weeks for a short conversation? I'm happy to meet at your office or over Zoom, whichever is easier for you.

Thank you for your time.

Best,
Kiara Li
BFA Communication Design, Parsons School of Design`,
                    },
                  ],
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
                  text: `An archive of artists' books about interspecies futures, based in Brooklyn.`,
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
                  children: [
                    {
                      id: 'w5-practice1', kind: 'step', label: 'Practice 1: Oyster and Rooftop',
                      // translated from Kiara's notes (Chinese)
                      text: `This time I changed Practice 1. I focused on the two projects I actually went to in person: Oyster and Rooftop. I went through the photos I took there one by one, and I noticed something.`,
                      children: [
                        {
                          id: 'w5-oyster', kind: 'step', label: 'Oyster',
                          story: true,
                          text: `This project uses oysters to protect the environment. But when I went on the field trip that day, what I felt wasn't only about oysters.`,
                          entries: [
                            { img: ['w5-oyster/oy01', 'w5-oyster/oy02'] },
                            { text: `I saw chestnuts on the island, the wild kind.`, img: ['w5-oyster/oy03', 'w5-oyster/oy04', 'w5-oyster/oy05'] },
                            { text: `It was raining that day. The grass was long and green, and it felt like being out in the wild.`, img: ['w5-oyster/oy06', 'w5-oyster/oy07', 'w5-oyster/oy08', 'w5-oyster/oy09'] },
                            { text: `The staff made us tea with wild herbs. It was really good. It was cold because of the rain, so the warm tea is something I remember well.`, img: ['w5-oyster/oy10'] },
                            { text: `And these are the oysters.`, img: ['w5-oyster/oy11', 'w5-oyster/oy12', 'w5-oyster/oy13', 'w5-oyster/oy14', 'w5-oyster/oy15', 'w5-oyster/oy16', 'w5-oyster/oy17'] },
                            { text: `There was also a place introducing the river and the fish that live in it.`, img: ['w5-oyster/oy18', 'w5-oyster/oy19', 'w5-oyster/oy20'] },
                            { text: `There was an exhibition on the island at the time, about something to do with whale hearts.`, img: ['w5-oyster/oy21', 'w5-oyster/oy22', 'w5-oyster/oy23', 'w5-oyster/oy24', 'w5-oyster/oy25', 'w5-oyster/oy26', 'w5-oyster/oy27'] },
                            {
                              text: `There are many projects on the island, like recycling plastic into furniture and putting it out around New York City.

So it isn't only an organization that uses oysters to help the environment. Put together, all of this felt like a habitat. Overall it felt close to nature, and calm.`,
                              img: ['w5-posters/poster-oyster'],
                            },
                          ],
                        },
                        {
                          id: 'w5-rooftop', kind: 'step', label: 'Rooftop',
                          story: true,
                          text: `Rooftop was the same. It's a green, environmental project on rooftops, but the area felt a bit like an industrial park, surrounded by big buildings, many of them still under construction.`,
                          entries: [
                            { img: ['w5-rooftop/rt01', 'w5-rooftop/rt02'] },
                            { text: `We climbed up to the rooftop and looked out at the New York skyline. We could also see a lot of places still being built.`, img: ['w5-rooftop/rt03', 'w5-rooftop/rt04', 'w5-rooftop/rt05', 'w5-rooftop/rt06', 'w5-rooftop/rt07'] },
                            { text: `Next to it is a landfill. Boats bring in waste and fill it into land, so the land can be used again.`, img: ['w5-rooftop/rt08', 'w5-rooftop/rt09'] },
                            { text: `They caught some small fish, shrimp, and crabs from the water to show us what lives in this river. They also explained New York's water cycle and water treatment.`, img: ['w5-rooftop/rt10', 'w5-rooftop/rt11', 'w5-rooftop/rt12'] },
                            { text: `And New York's birds, with some things about protecting them.`, img: ['w5-rooftop/rt13', 'w5-rooftop/rt14'] },
                            { text: `On the rooftop they had already finished, we saw bees and flowers. That surprised me. I didn't expect so much life on top of such grey buildings.`, img: ['w5-rooftop/rt15', 'w5-rooftop/rt16', 'w5-rooftop/rt17', 'w5-rooftop/rt18', 'w5-rooftop/rt19', 'w5-rooftop/rt20', 'w5-rooftop/rt21', 'w5-rooftop/rt22'] },
                            { img: ['w5-posters/poster-rooftop'] },
                          ],
                        },
                        {
                          id: 'w5-posters', kind: 'step', label: 'Two Posters',
                          text: `At both Oyster and Rooftop, what I learned wasn't one single piece of knowledge, but a whole ecosystem woven together.

So I made a collage poster for each project. One is what I went through, came across, and saw at Oyster; the other is Rooftop. Whether it's the water cycle or something else, I think they form a complete system, a habitat. Just looking at the two posters, you can feel how much these two projects actually cover.`,
                          images: ['w5-posters/poster-oyster', 'w5-posters/poster-rooftop'],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'w5-act-2', kind: 'step', label: '02 — TRACE',
                  text: `Participants draw their life as one continuous line and mark moments with a limited set of scanned objects. I don't tell them the project is about evolution. I plan to start with a paper version before building the website. This may change to fit the city direction.`,
                  children: [
                    {
                      id: 'w5-trace-p1', kind: 'step', label: 'Prototype 1',
                      title: 'TRACE — Prototype 1',
                      // translated from Kiara's notes (Chinese)
                      text: `TRACE is a website. Participants fill in one page for each city they have lived in:

— the city, how many years they lived there, and whether they still live there
— one line, drawn from "arrived" to "now" or "left." What to draw is up to them.
— "What the line shows," which they can fill in or leave empty
— the animals and plants they remember, and when they first noticed them

At the end it exports as one image with all the answers on it. There is an English and a Chinese version.

I purposely didn't say what the line means. For example, I didn't ask about mood directly, because I didn't want people to be pushed back into bad memories. So each person chooses what their line stands for.`,
                      embed: 'trace/',
                    },
                    {
                      id: 'w5-trace-responses', kind: 'step', label: 'Responses',
                      text: `As of October 5, I have looked at 9.`,
                      images: ['w5-trace/trace-t-6p6e', 'w5-trace/trace-t-7d3a', 'w5-trace/trace-t-hxuv', 'w5-trace/trace-t-jxb5', 'w5-trace/trace-t-snld', 'w5-trace/trace-t-utlh', 'w5-trace/trace-t-vtmy', 'w5-trace/trace-t-xw68', 'w5-trace/zz-f973'],
                    },
                    {
                      id: 'w5-trace-feedback', kind: 'step', label: 'Feedback',
                      blocks: [
                        { title: 'Participants', text: `Almost everyone said it was fun and that they liked doing it. In the group critique I asked who wanted to fill it in. Some people came up on their own, and afterwards they also said they liked the experiment.

A friend told me after filling it in that Edinburgh was the happiest place he had lived, and also the place where he remembered the most species.` },
                        { title: 'Classmates', text: `They couldn't see a connection between the line and the animals and plants that come after it. They suggested fixing the drawing area, or even putting the questions first: ask which animals people met, then explain what kind of human–animal relationship the drawing is about.` },
                        { title: 'My response', text: `Not seeing the connection isn't necessarily a bad thing. I wanted it to be open-ended, not just a way to collect data. I think putting the questions first and fixing the y-axis would make it boring. I want the project to be rigorous, but first it has to be interesting. At the same time, I don't want to make the kind of imaginative piece that says "imagine you are a pigeon."` },
                      ],
                    },
                    {
                      id: 'w5-trace-reading', kind: 'step', label: 'Reading the Forms',
                      text: `I looked at the first few forms as soon as they came in. By the later ones, I was actually a little scared to open new ones.

There was a very sad feeling. When I designed it, I already expected that some people would have bad memories, so I didn't put mood and the city directly together, and let everyone choose what the line shows. Some wrote landscape, some wrote presence. But after reading them I still felt really sad. I know some of the people who filled it in, and when I saw their lines going down, I thought about what they really went through during that time.

People I don't know wrote a lot of animals and plants from home. Someone wrote horses, and there were species I had never heard of. That's when I realized how far away everyone came from.

Seeing someone move back and forth between cities, going back to a city and leaving again, going somewhere new, or staying somewhere only for a short time, gave me a feeling of drifting. Putting that drifting next to animals and plants that stay put made me a little sad. For example, New York will always have this many pigeons: before I came, while I'm here, after I leave, and decades or hundreds of years from now, there will still be this many pigeons here. They don't change with people arriving and leaving.

Maybe I'm putting my own feelings onto these forms, but there really is so much emotion in them that it scared me a bit.

Because some of them are people I know, I know how they built a connection with the city. For example, one person works in a park and later saw a lot of animals and plants there, so he wrote in a lot of detail. Things like this move me in a way I can't quite explain.`,
                    },
                    {
                      id: 'w5-trace-show', kind: 'step', label: 'What the Forms Show',
                      text: `These are only observations from 9 forms, not conclusions.`,
                      sections: [
                        {
                          title: 'Observations',
                          items: [
                            '"What the line shows": about half of the city pages have it filled in; the other half are "—". The answers include love, life, hope, my presence, landscape, my memories, money I spent, and a few about socializing and being happy.',
                            '"First noticed": only 3–4 forms have it. The rest are "—".',
                            'City, years, animals and plants: everyone filled these in, and very specifically.',
                            'The species lists for New York overlap a lot: pigeons, squirrels, rats, sparrows, cockroaches, raccoons, maples, and sycamores come up again and again. But the New York lines are very different from each other.',
                            'The same person in different cities: in the Suzhou → Melbourne → New York form, each city has a completely different list, and the New York list is close to everyone else\'s New York list.',
                            'The lines fall into a few kinds: one stroke like a signature, smooth waves, on/off like a square wave, a line that only rises, and lines broken into pieces.',
                            'Every city\'s line takes up the same width: 41 years and 2.4 months are the same length on the page.',
                          ],
                        },
                      ],
                    },
                    {
                      id: 'w5-trace-refs', kind: 'step', label: 'References',
                      children: [
                        {
                          id: 'w5-ref-ingold', kind: 'step', label: 'Tim Ingold — Lines',
                          title: 'Tim Ingold, Lines: A Brief History (Routledge, 2007)',
                          text: `Trace and thread: a thread is a physical strand that can be wound or woven; a trace is the lasting mark a continuous movement leaves on a surface. A line drawn in one stroke on the screen is a trace.

Wayfaring and transport: a wayfarer lives along the way, noticing, adjusting, and stopping on the road. Transport goes from A to B, and the way in between is a gap to cross as quickly as possible.

For TRACE: the axis on the form has two ends, arrived and left / now, which is a point-to-point frame, but people draw into it in one stroke. The Yakutsk form wrote "my presence" for what the line shows. About the drifting I felt reading the forms: in Ingold's terms, a wayfarer isn't homeless, the path itself is where they belong. That's another reading that can sit next to mine.`,
                          links: [
                            { label: 'Lines — Routledge Classics edition', url: 'https://www.waterstones.com/book/lines/tim-ingold/9781138640399' },
                            { label: 'Paul Klee, Pedagogical Sketchbook (1925)', url: 'https://www.thecollector.com/what-was-paul-klee-pedagogical-sketchbook/' },
                            { label: 'Richard Long, A Line Made by Walking (1967), Tate', url: 'https://www.tate.org.uk/art/artworks/long-a-line-made-by-walking-p07149' },
                          ],
                        },
                        {
                          id: 'w5-ref-elicitation', kind: 'step', label: 'Graphic Elicitation',
                          title: 'Graphic elicitation — Anna Bagnoli (2009)',
                          text: `A method from social research: people draw first (relational maps, timelines, self-portraits), then talk about the drawing. The structure is: draw → the person explains → the researcher records both.

For TRACE: letting people decide what the line means is the same as the lifeline method. But many people left that field empty, so I'm looking at drawings without explanations. Part of the sadness I felt reading them is me explaining those falling lines for them. What my friend told me about Edinburgh is the "conversation after the drawing."`,
                          links: [
                            { label: 'Bagnoli (2009), Beyond the standard interview, Qualitative Research', url: 'https://doi.org/10.1177/1468794109343625' },
                            { label: 'Abstract (NCRM)', url: 'https://eprints.ncrm.ac.uk/774' },
                            { label: 'Diagrams and Relational Maps, IJQM', url: 'https://journals.library.ualberta.ca/ijqm/index.php/IJQM/article/view/10259/14542' },
                          ],
                        },
                        {
                          id: 'w5-ref-maps', kind: 'step', label: 'Lynch and Wood',
                          title: 'Kevin Lynch, The Image of the City (1960) · Denis Wood, Everything Sings (2010)',
                          text: `Lynch asked residents to draw their city from memory, then overlaid many sketches into one shared image. He looked at what overlaps, not at single people. In my forms, the New York lines are very different from each other, but the New York species lists overlap a lot.

Wood mapped his neighborhood again and again, one thing per map: streetlight halos, jack-o'-lanterns, wind chimes. One map alone is almost useless; together they show the neighborhood. One drawing doing one thing, and the meaning coming from putting many together, is the same structure as my 256 book.`,
                          links: [
                            { label: 'Lynch, Consensus of 32 Sketch Maps, Boston (MIT)', url: 'https://dome.mit.edu/handle/1721.3/36504' },
                            { label: 'Wood, Everything Sings — three maps', url: 'https://makingmaps.net/2010/10/26/out-now-denis-wood-everything-sings/' },
                            { label: 'Wood, Everything Sings — more maps', url: 'https://www.themarginalian.org/2011/09/06/everything-sings-david-wood/' },
                          ],
                        },
                        {
                          id: 'w5-ref-baseline', kind: 'step', label: 'Extinction of Experience',
                          title: 'Extinction of experience and shifting baselines',
                          text: `Robert Michael Pyle, The Thunder Tree (1993): "extinction of experience," the loss of everyday contact with nature. Daniel Pauly (1995): "shifting baseline syndrome," where each generation takes what it first saw as normal, so long-term decline is quietly accepted. Soga & Gaston (2016) reviewed the causes and effects of the extinction of experience; urbanization is one of the main causes they discuss.

For TRACE: shifting baselines is about how people perceive time, which is close to TRACE. Everyone draws a line starting from their own memory and can't see what happened before it. The "animals and plants remembered" field is about people meeting other species in a city.

What these forms can't show: that experience is decreasing (they measure memory, not how often people meet nature, and there are too few of them), or differences between generations (age and city are mixed together). Three things I can see but can't separate yet: the city itself (the New York lists are close), the person's state there (my friend in Edinburgh), and daily chances to meet nature (the person who works in a park).`,
                          links: [
                            { label: 'Pauly (1995), Trends in Ecology & Evolution', url: 'https://doi.org/10.1016/S0169-5347(00)89171-5' },
                            { label: 'Soga & Gaston (2016), Frontiers in Ecology and the Environment', url: 'https://doi.org/10.1002/fee.1225' },
                            { label: 'Gaston & Soga (2020), People and Nature', url: 'https://doi.org/10.1002/pan3.10118' },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'w5-questions', kind: 'step', label: '10 Questions',
                  sections: [
                    {
                      title: 'Questions',
                      items: [
                        'What does "the city" mean to different people? Do we even imagine the same thing when we use that word?',
                        'Some of my research suggests that evolution can happen faster in cities. Why might that be, and under what conditions is it true?',
                        'From a broader perspective, what can studying evolution in cities help us understand?',
                        'How can I begin with a personal experience or the perspective of one species, then open it up into a fairer discussion of the larger subject?',
                        'How do environmental projects in New York respond to the ecological conditions we are living with now? Can they also change those conditions?',
                        'How have the goals and methods of environmental projects in New York changed from the past to the present?',
                        'What might these projects need to respond to in the future?',
                        'Do humans, other species, and the city itself experience change at different speeds? How could I make those differences visible?',
                        'How can I show evolution as a process of change without suggesting that every change is progress?',
                        'What can communication design do to help people notice these changes and consider perspectives beyond their own?',
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'w5-earlier', kind: 'step', label: 'Earlier Work', island: true,
              children: [
                {
                  id: 'w5-sustainability', kind: 'step', label: 'Sustainability Course',
                  text: `These two pieces are from a sustainability class I took before. Looking back, they were already about the same questions.`,
                  entries: [
                    {
                      img: ['w5-earlier/water'],
                      source: 'Water',
                      text: `A digital painting with hand-lettered text about water from a Lakota understanding. Mni is the Lakota word for water.`,
                    },
                    {
                      img: ['w5-earlier/turtle'],
                      source: 'Skywoman and the turtle',
                      text: `A collage made from cut paper and cut-out text, based on the Skywoman creation story, where the geese, the muskrat, and a great turtle help make the land.`,
                    },
                  ],
                },
                {
                  id: 'w5-fluffy', kind: 'step', label: 'Fluffy New Yorker',
                  // translated from Kiara's note (Chinese)
                  text: `A website I made in the fall semester of my sophomore year.`,
                  links: [{ label: 'Fluffy New Yorker', url: 'https://kiara-li.github.io/fluffy-new-yorker/' }],
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
