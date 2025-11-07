import { useLocation, useNavigate } from 'react-router-dom';

const Interstitial = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromShow = typeof location.state?.from === 'string' ? location.state.from : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-white px-6 text-slate-900">
      <h2 className="text-2xl font-semibold tracking-wide">Ready to solve?</h2>
      <button
        type="button"
        onClick={() => navigate('/puzzle', { state: fromShow ? { from: fromShow } : undefined })}
        className="flex h-14 w-64 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-lg transition-transform active:scale-95 focus-visible-ring"
      >
        Click to continue
      </button>
    </div>
  );
};

export default Interstitial;
