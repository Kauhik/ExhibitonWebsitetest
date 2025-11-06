import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Intro = lazy(() => import('@/routes/Intro'));
const Hub = lazy(() => import('@/routes/Hub'));
const AppDetail = lazy(() => import('@/routes/AppDetail'));
const Interstitial = lazy(() => import('@/routes/Interstitial'));
const Puzzle = lazy(() => import('@/routes/Puzzle'));
const Congrats = lazy(() => import('@/routes/Congrats'));

const App = () => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center bg-white text-sm text-slate-500">
        Loading exhibition…
      </div>
    }
  >
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/hub" element={<Hub />} />
      <Route path="/show/:id" element={<AppDetail />} />
      <Route path="/show/:id/ask" element={<Interstitial />} />
      <Route path="/puzzle" element={<Puzzle />} />
      <Route path="/congrats" element={<Congrats />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default App;
