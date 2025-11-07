import type { Show } from '@/types/show';

export const SHOW_SELECT_FIELDS = `
  slug,
  name,
  description,
  accent,
  piece_id,
  pin_offset_x,
  pin_offset_y,
  thumbnail_url,
  icon_url,
  team:app_team_members(name, role, avatar_url)
`;

type TeamRow = {
  name: string;
  role: string;
  avatar_url?: string | null;
};

export type AppRow = {
  slug: string;
  name: string;
  description: string;
  accent?: string | null;
  piece_id: number;
  pin_offset_x?: number | null;
  pin_offset_y?: number | null;
  thumbnail_url?: string | null;
  icon_url?: string | null;
  team?: TeamRow[] | null;
};

const DEFAULT_PIN_OFFSET = { x: 52, y: 36 };
const FALLBACK_THUMBNAIL =
  'https://via.placeholder.com/96x96.png?text=App';

export const mapRowToShow = (row: AppRow): Show => ({
  id: row.slug,
  name: row.name,
  description: row.description,
  accent: row.accent ?? '#e2e8f0',
  pieceId: row.piece_id,
  thumbnail: row.thumbnail_url ?? FALLBACK_THUMBNAIL,
  icon: row.icon_url ?? row.thumbnail_url ?? FALLBACK_THUMBNAIL,
  pinOffset:
    row.pin_offset_x != null || row.pin_offset_y != null
      ? {
          x: row.pin_offset_x ?? DEFAULT_PIN_OFFSET.x,
          y: row.pin_offset_y ?? DEFAULT_PIN_OFFSET.y,
        }
      : undefined,
  team:
    row.team?.map((member) => ({
      name: member.name,
      role: member.role,
      avatar: member.avatar_url ?? null,
    })) ?? [],
});
