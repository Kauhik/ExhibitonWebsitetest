export type TeamMember = {
  name: string;
  role: string;
  avatar?: string;
};

export type Show = {
  id: string;
  name: string;
  description: string;
  team: TeamMember[];
  thumbnail: string;
  accent: string;
  pieceId: number;
  pinOffset?: { x: number; y: number };
};

export const shows: Show[] = [
  {
    id: 'project-01',
    name: 'Nebula Notes',
    description:
      'A meditative exploration where visitors layer ambient soundscapes across a star map and unlock hidden constellations.',
    team: [
      { name: 'Riley Chen', role: 'Producer' },
      { name: 'Mira Das', role: 'iOS Engineer' },
      { name: 'Leo Martinez', role: 'Game Designer' },
      { name: 'June Park', role: 'UX Researcher' },
    ],
    thumbnail: '/assets/show-1.jpg',
    accent: '#fde68a',
    pieceId: 1,
  },
  {
    id: 'project-02',
    name: 'Orbit Orchard',
    description:
      'Grow a floating orchard by nurturing bioluminescent seedlings and balancing the ecosystem with friends.',
    team: [
      { name: 'Samira Holt', role: 'Creative Director' },
      { name: 'Yuki Arai', role: 'Technical Artist' },
      { name: 'Noah Vega', role: '3D Engineer' },
      { name: 'Hana Brooks', role: 'Sound Designer' },
    ],
    thumbnail: '/assets/show-2.jpg',
    accent: '#bfdbfe',
    pieceId: 2,
  },
  {
    id: 'project-03',
    name: 'Glyph Garden',
    description:
      'Decode a mysterious archive of musical glyphs that bloom into interactive stories with each solved puzzle.',
    team: [
      { name: 'Eli Navarro', role: 'Lead Developer' },
      { name: 'Priya Nayar', role: 'Narrative Designer' },
      { name: 'Owen Patel', role: 'Systems Engineer' },
    ],
    thumbnail: '/assets/show-3.jpg',
    accent: '#fbcfe8',
    pieceId: 3,
  },
  {
    id: 'project-04',
    name: 'Quantum Quill',
    description:
      'Craft collaborative stories by bending time. Rewrite shared chapters to explore branching timelines.',
    team: [
      { name: 'Isla Morgan', role: 'Story Architect' },
      { name: 'Gabriel Ito', role: 'Interaction Engineer' },
      { name: 'Val Torres', role: 'UX Designer' },
      { name: 'Drew Saavedra', role: 'Composer' },
    ],
    thumbnail: '/assets/show-4.jpg',
    accent: '#bbf7d0',
    pieceId: 4,
  },
  {
    id: 'project-05',
    name: 'Borealis Bounce',
    description:
      'A playful rhythm adventure where light fragments snap into alignment to restore the northern sky.',
    team: [
      { name: 'Jae Moon', role: 'Technical Lead' },
      { name: 'Rowan Lee', role: 'Animator' },
      { name: 'Casey Reed', role: 'Composer' },
    ],
    thumbnail: '/assets/show-5.jpg',
    accent: '#fecdd3',
    pieceId: 5,
  },
  {
    id: 'project-06',
    name: 'Sonic Spokes',
    description:
      'Collect audio memories on a bike ride through a futuristic city and mix them into a living soundtrack.',
    team: [
      { name: 'Marin Soto', role: 'Experience Lead' },
      { name: 'Elle Costa', role: 'Sound Artist' },
      { name: 'Max Kato', role: 'Gameplay Engineer' },
    ],
    thumbnail: '/assets/show-6.jpg',
    accent: '#fde68a',
    pieceId: 6,
  },
  {
    id: 'project-07',
    name: 'Ripple Relay',
    description:
      'Guide shimmering ripples across a cooperative puzzle board to awaken sleeping spirits below the surface.',
    team: [
      { name: 'Tanya Iman', role: 'Game Designer' },
      { name: 'Jonas Wilde', role: 'Programmer' },
      { name: 'Aki Rao', role: 'Visual Artist' },
    ],
    thumbnail: '/assets/show-7.jpg',
    accent: '#e9d5ff',
    pieceId: 7,
  },
  {
    id: 'project-08',
    name: 'Cinder Circuit',
    description:
      'Race sparks through handcrafted mazes and reroute energy beams to reboot a forgotten festival.',
    team: [
      { name: 'Jules Hart', role: 'Producer' },
      { name: 'Imani Blake', role: 'Gameplay Designer' },
      { name: 'Paz Abarca', role: 'Engineer' },
    ],
    thumbnail: '/assets/show-8.jpg',
    accent: '#bbf7d0',
    pieceId: 8,
  },
  {
    id: 'project-09',
    name: 'Echo Loom',
    description:
      'Weave tapestries of light by syncing gestures with a chorus of AI performers in a responsive stage.',
    team: [
      { name: 'Milo Reyes', role: 'Creative Director' },
      { name: 'Aya Nomura', role: 'Interaction Designer' },
      { name: 'Liam Carr', role: 'Technical Artist' },
    ],
    thumbnail: '/assets/show-9.jpg',
    accent: '#fee2e2',
    pieceId: 9,
  },
  {
    id: 'project-10',
    name: 'Prism Parade',
    description:
      'Compose a parade of color-shifting companions and march them through campus landmarks to unlock photo filters.',
    team: [
      { name: 'Nova Chan', role: 'Producer' },
      { name: 'Arun Mehta', role: 'Engineer' },
      { name: 'Sena Fox', role: 'Illustrator' },
    ],
    thumbnail: '/assets/show-10.jpg',
    accent: '#bfdbfe',
    pieceId: 10,
  },
];

export const findShowById = (id: string) => shows.find((show) => show.id === id);
