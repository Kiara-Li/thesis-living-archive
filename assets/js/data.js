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
    feedback  [ 'note from class crit…' ]   → shown under "Feedback"
    response  [ 'what I did about it…' ]    → shown under "Response"
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
          text: 'Start of the 256 project: the designer as editor. A first small collection, and ways of putting it in order.',
          feedback: [], response: [],
          children: [
            {
              id: 'w1-images', kind: 'step', label: '12 Images',
              text: 'Twelve images with sources and my own captions — one from the Last Whole Earth Catalog, one from the Smithsonian Archives, one made with a lens.',
              todo: 'Add the 12 images, sources and captions',
              images: [],
            },
            {
              id: 'w1-orders', kind: 'step', label: '10 Ways to Order',
              text: 'Ten one-line instructions for sequencing the collection — by content, form, association or speculation.',
              todo: 'Add the 10 instructions',
            },
            {
              id: 'w1-look', kind: 'step', label: 'Look At',
              text: 'Three practices that use collecting and juxtaposing images as a way of thinking.',
              children: [
                {
                  id: 'w1-warburg', kind: 'step', label: 'Aby Warburg',
                  text: 'Bilderatlas Mnemosyne (1920s): panels of images tracing recurring gestures and motifs across time.',
                  links: [{ label: 'Brooklyn Rail', url: 'https://brooklynrail.org/2021/02/art_books/Aby-Warburgs-Bilderatlas-Mnemosyne/' }],
                },
                {
                  id: 'w1-tillmans', kind: 'step', label: 'Wolfgang Tillmans',
                  text: 'Arranges his own photographs in space — scale, sequence and proximity make new relationships.',
                  links: [
                    { label: 'Interview, Fondation Beyeler', url: 'https://www.youtube.com/watch?v=f9RrmzUXnhA' },
                    { label: 'Installation views, Zwirner 2015', url: 'http://tillmans.co.uk/component/jcgtillmans/2015_pcr-david-zwirner' },
                  ],
                },
                {
                  id: 'w1-suter', kind: 'step', label: 'Batia Suter',
                  text: 'Sequences found images from books and archives to surface unexpected associations.',
                  links: [{ label: 'Interview', url: 'https://www.youtube.com/watch?v=FpRM4-aAa1I' }],
                },
              ],
            },
            {
              id: 'w1-archive', kind: 'step', label: 'Living Archive',
              text: 'This site. Set up as a map that grows, rather than a folder that fills.',
            },
          ],
        },

        /* ───────────────────────── WEEK 2 ───────────────────────── */
        {
          id: 'w2', kind: 'week', label: 'Sequence → Category → Book',
          date: '09.04', tag: '256 · Book Development',
          text: 'Turning the collection into a book — a research document that asks questions, not a container for images.',
          feedback: [], response: [],
          children: [
            {
              id: 'w2-spreads', kind: 'step', label: 'Spread Explorations',
              text: 'Several printed directions tested side by side: scale, hierarchy, rhythm, grids, captions, image/text.',
              todo: 'Add photos of the printed spreads',
            },
            {
              id: 'w2-structure', kind: 'step', label: 'Organizational Structure',
              text: 'A proposed system for the whole collection — chapters, categories, sequences or an index.',
              todo: 'Add the structure diagram',
            },
            {
              id: 'w2-mockup', kind: 'step', label: 'Physical Mock-up',
              text: 'A blank dummy to test size and binding — how the book opens and is read.',
              todo: 'Add mock-up photos',
            },
            {
              id: 'w2-unseen', kind: 'step', label: 'Unseen Actions',
              text: 'After “I, Pencil”: one everyday object and the hidden work that brings it into existence.',
              children: [
                { id: 'w2-object', kind: 'step', label: 'The Object', todo: 'Add a photo of the object' },
                { id: 'w2-actions', kind: 'step', label: '10 Unseen Actions', text: 'Materials, labour, extraction, transport, systems, people.', todo: 'Add the list' },
                { id: 'w2-reflection', kind: 'step', label: 'Reflection', text: 'Could revealing these infrastructures become part of the book, the thesis, or both?', todo: 'Add the ~200 word reflection' },
              ],
            },
            {
              id: 'w2-look', kind: 'step', label: 'Look At',
              text: 'Hyning Gan — Open Studio · UTNS — Radical Records of Nature · @lyavengerik — Unravel a Manifesto · Observational Practices Lab — Talking About Seeing.',
              links: [{ label: '@lyavengerik', url: 'https://www.instagram.com/lyavengerik/' }],
            },
          ],
        },

        /* ───────────────────────── WEEK 3 ───────────────────────── */
        {
          id: 'w3', kind: 'week', label: 'From 256 to Research Inquiry',
          date: '09.11', tag: 'Unseen Actions II',
          text: 'The image collection and the unseen actions start informing each other. I am the connection between them.',
          feedback: [], response: [],
          children: [
            {
              id: 'w3-proto', kind: 'step', label: '256 Prototype',
              text: 'An iteration of the book brought in for review.',
              todo: 'Add prototype photos',
            },
            {
              id: 'w3-encounters', kind: 'step', label: 'Three Encounters',
              text: 'Three entities to question, each leaving one piece of evidence — a quote, image, screenshot, note or link.',
              children: [
                { id: 'w3-human', kind: 'step', label: 'A Human', todo: 'Add the evidence' },
                { id: 'w3-archive', kind: 'step', label: 'An Archive', todo: 'Add the evidence' },
                { id: 'w3-ai', kind: 'step', label: 'An AI Prompt', todo: 'Add the prompt + response' },
              ],
            },
            {
              id: 'w3-read', kind: 'step', label: 'Reading: Vis',
              text: 'Dirk Vis, on research for people who would rather make. Optional: Booth, The Craft of Research; Collins, Creative Research.',
              todo: 'Add reading notes',
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
