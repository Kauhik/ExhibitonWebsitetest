export type TeamMember = {
  name: string;
  role: string;
  avatar?: string | null;
};

export type Show = {
  id: string;
  name: string;
  description: string;
  team: TeamMember[];
  thumbnail: string;
  icon?: string | null;
  accent: string;
  pieceId: number;
  pinOffset?: { x: number; y: number };
};
