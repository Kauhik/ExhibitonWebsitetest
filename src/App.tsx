import { Navigate, Route, Routes } from 'react-router-dom';
import Intro from '@/routes/Intro';
import Hub from '@/routes/Hub';
import AppDetail from '@/routes/AppDetail';
import Interstitial from '@/routes/Interstitial';
import Puzzle from '@/routes/Puzzle';
import Congrats from '@/routes/Congrats';

const App = () => (
  <Routes>
    <Route path="/" element={<Intro />} />
    <Route path="/hub" element={<Hub />} />
    <Route path="/show/:id" element={<AppDetail />} />
    <Route path="/show/:id/ask" element={<Interstitial />} />
    <Route path="/puzzle" element={<Puzzle />} />
    <Route path="/congrats" element={<Congrats />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
