type TeamCardProps = {
  name: string;
  role: string;
};

const TeamCard = ({ name, role }: TeamCardProps) => (
  <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="grid h-16 w-16 place-items-center rounded-xl bg-slate-100 text-xs uppercase tracking-[0.2em] text-slate-400">
      Img
    </div>
    <div className="text-center">
      <p className="text-sm font-semibold text-slate-900">{name}</p>
      <p className="text-xs text-slate-500">{role}</p>
    </div>
  </div>
);

export default TeamCard;
