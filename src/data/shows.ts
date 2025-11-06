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
};

export const shows: Show[] = [
  {
    id: 'stellar-sprint',
    name: 'Stellar Sprint',
    description:
      'Race through procedurally generated galaxies while collaborating with friends to repair satellites before time runs out. Designed to teach cooperative problem solving through rapid decision making and playful competition.',
    team: [
      { name: 'Riley Chen', role: 'Producer' },
      { name: 'Mira Das', role: 'iOS Engineer' },
      { name: 'Leo Martinez', role: 'Game Designer' },
      { name: 'June Park', role: 'UX Researcher' },
    ],
    thumbnail: '/assets/show-1.jpg',
    accent: '#fde68a',
  },
  {
    id: 'orchard-orbit',
    name: 'Orchard Orbit',
    description:
      'Grow a floating orchard by nurturing bioluminescent seedlings and balancing the ecosystem. Players learn calm strategy while experiencing haptic-driven storytelling inspired by sustainable gardening.',
    team: [
      { name: 'Samira Holt', role: 'Creative Director' },
      { name: 'Yuki Arai', role: 'Technical Artist' },
      { name: 'Noah Vega', role: '3D Engineer' },
      { name: 'Hana Brooks', role: 'Sound Designer' },
    ],
    thumbnail: '/assets/show-2.jpg',
    accent: '#bfdbfe',
  },
  {
    id: 'monolith-memo',
    name: 'Monolith Memo',
    description:
      'Decode a mysterious stone archive filled with musical glyphs. Each solved pattern unlocks interactive lore while training spatial memory through melodic cues and subtle tactile feedback.',
    team: [
      { name: 'Eli Navarro', role: 'Lead Developer' },
      { name: 'Priya Nayar', role: 'Narrative Designer' },
      { name: 'Owen Patel', role: 'Systems Engineer' },
    ],
    thumbnail: '/assets/show-3.jpg',
    accent: '#fbcfe8',
  },
  {
    id: 'quantum-quill',
    name: 'Quantum Quill',
    description:
      'Craft collaborative stories by bending time. Players rewrite shared chapters, exploring multiverse branches that respond to voice prompts and expressive gestures.',
    team: [
      { name: 'Isla Morgan', role: 'Story Architect' },
      { name: 'Gabriel Ito', role: 'Interaction Engineer' },
      { name: 'Val Torres', role: 'UX Designer' },
      { name: 'Drew Saavedra', role: 'Composer' },
    ],
    thumbnail: '/assets/show-4.jpg',
    accent: '#bbf7d0',
  },
];

export const findShowById = (id: string) => shows.find((show) => show.id === id);
