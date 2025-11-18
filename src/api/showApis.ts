import { useShow, useShows } from '@/hooks/useShows';
import type { Show, TeamMember } from '@/types/show';

/**
 * Teams Screen: shape of each app card entry.
 *
 * This API is used for the overview / hub / teams screen
 * where we need to list each app with:
 * - Site
 * - App name
 * - Platform (game/app/installation)
 * - App icon
 */
export type TeamsScreenApp = {
  id: string;
  name: string;
  siteUrl: string | null;
  platform: string | null;
  icon: string;
};

/**
 * Project Detail Screen: shape of a single team member entry.
 *
 * This API is used on the project detail page where we show:
 * - Name of team member
 * - Role of team member
 * - LinkedIn of team member
 * - Photo (avatar) of team member
 */
export type ProjectDetailTeamMember = {
  name: string;
  role: string;
  avatar: string | null;
  linkedinUrl: string | null;
};

/**
 * Project Detail Screen: shape of the app-level information.
 *
 * This API is used on the project detail page to show:
 * - Summary app information (description)
 * - Platform and site (if available)
 * - Full team list with LinkedIn + photos
 */
export type ProjectDetailApp = {
  id: string;
  name: string;
  description: string;
  platform: string | null;
  siteUrl: string | null;
  team: ProjectDetailTeamMember[];
};

const mapShowToTeamsScreenApp = (show: Show): TeamsScreenApp => ({
  id: show.id,
  name: show.name,
  siteUrl: show.siteUrl ?? null,
  platform: show.platform ?? null,
  icon: show.icon ?? show.thumbnail,
});

const mapTeamMemberToProjectDetail = (member: TeamMember): ProjectDetailTeamMember => ({
  name: member.name,
  role: member.role,
  avatar: member.avatar ?? null,
  linkedinUrl: member.linkedinUrl ?? null,
});

const mapShowToProjectDetailApp = (show: Show): ProjectDetailApp => ({
  id: show.id,
  name: show.name,
  description: show.description,
  platform: show.platform ?? null,
  siteUrl: show.siteUrl ?? null,
  team: show.team.map(mapTeamMemberToProjectDetail),
});

/**
 * Teams Screen API hook.
 *
 * Use this in the teams / hub screen to get:
 * - `apps`: array of apps with site, name, platform, and icon
 * - `isLoading`, `error`, and `reload` passthrough from Supabase
 */
export const useTeamsScreenApi = () => {
  const { shows, isLoading, error, reload } = useShows();

  return {
    apps: shows.map(mapShowToTeamsScreenApp),
    isLoading,
    error,
    reload,
  };
};

/**
 * Project Detail Screen API hook.
 *
 * Use this in the app detail screen (`/show/:id`) to get:
 * - `app`: the full project detail (summary, platform, site, team)
 * - `isLoading`, `error`, and `reload` passthrough from Supabase
 */
export const useProjectDetailApi = (slug: string | null) => {
  const { show, isLoading, error, reload } = useShow(slug);

  return {
    app: show ? mapShowToProjectDetailApp(show) : null,
    isLoading,
    error,
    reload,
  };
};

