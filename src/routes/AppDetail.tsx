import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeamCard from '@/components/TeamCard';
import { useShow } from '@/hooks/useShows';

const AppDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { show, isLoading, error, reload } = useShow(id ?? null);

  useEffect(() => {
    if (!isLoading && !show) {
      navigate('/hub', { replace: true });
    }
  }, [navigate, show, isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f5f8] text-sm text-slate-500">
        Loading app details…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f4f5f8] px-6 text-center text-slate-700">
        <p className="text-sm text-rose-600">Unable to load this app: {error}</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reload}
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 focus-visible-ring"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={() => navigate('/hub', { replace: true })}
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white focus-visible-ring"
          >
            Back to hub
          </button>
        </div>
      </div>
    );
  }

  if (!show) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f4f5f8] px-6 pb-24 pt-14 text-slate-900">
      <header className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Apple Developer Academy · Games Institute
        </p>
        <h1 className="text-2xl font-semibold">{show.name}</h1>
      </header>

      <div className="mt-10 space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <img
            src={show.thumbnail}
            alt={`${show.name} thumbnail`}
            className="h-48 w-full rounded-2xl object-cover"
          />
        </section>

        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xs uppercase tracking-[0.3em] text-slate-400">
            App Information
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">{show.description}</p>
        </section>

        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Team
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {show.team.map((member) => (
              <TeamCard
                key={`${member.name}-${member.role}`}
                name={member.name}
                role={member.role}
                avatar={member.avatar ?? undefined}
              />
            ))}
          </div>
        </section>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 pedestal-gradient" />

      <div className="pointer-events-auto fixed inset-x-0 bottom-0 mx-auto max-w-sm px-6 pb-8">
        <button
          type="button"
          onClick={() => navigate(`/show/${show.id}/ask`)}
          className="flex h-14 w-full items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-lg transition-transform active:scale-95 focus-visible-ring"
        >
          Ask my puzzle
        </button>
      </div>
    </div>
  );
};

export default AppDetail;
