import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const TeamList = lazy(() => import('./pages/teams/TeamList'));
const TeamDetail = lazy(() => import('./pages/teams/TeamDetail'));
const PlayerList = lazy(() => import('./pages/players/PlayerList'));
const PlayerDetail = lazy(() => import('./pages/players/PlayerDetail'));
const RefereeList = lazy(() => import('./pages/referees/RefereeList'));
const TournamentList = lazy(() => import('./pages/tournaments/TournamentList'));
const TournamentDetail = lazy(() => import('./pages/tournaments/TournamentDetail'));
const MatchList = lazy(() => import('./pages/matches/MatchList'));
const MatchDetail = lazy(() => import('./pages/matches/MatchDetail'));
const SponsorList = lazy(() => import('./pages/sponsors/SponsorList'));
const SponsorDetail = lazy(() => import('./pages/sponsors/SponsorDetail'));
const TopScorers = lazy(() => import('./pages/stats/TopScorers'));
const CardStats = lazy(() => import('./pages/stats/CardStats'));
const ApiTester = lazy(() => import('./pages/ApiTester/ApiTester'));

function Loading() {
  return <div className="loading">Cargando...</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Suspense fallback={<Loading />}><Dashboard /></Suspense>} />
          <Route path="teams" element={<Suspense fallback={<Loading />}><TeamList /></Suspense>} />
          <Route path="teams/:id" element={<Suspense fallback={<Loading />}><TeamDetail /></Suspense>} />
          <Route path="players" element={<Suspense fallback={<Loading />}><PlayerList /></Suspense>} />
          <Route path="players/:id" element={<Suspense fallback={<Loading />}><PlayerDetail /></Suspense>} />
          <Route path="referees" element={<Suspense fallback={<Loading />}><RefereeList /></Suspense>} />
          <Route path="tournaments" element={<Suspense fallback={<Loading />}><TournamentList /></Suspense>} />
          <Route path="tournaments/:id" element={<Suspense fallback={<Loading />}><TournamentDetail /></Suspense>} />
          <Route path="matches" element={<Suspense fallback={<Loading />}><MatchList /></Suspense>} />
          <Route path="matches/:id" element={<Suspense fallback={<Loading />}><MatchDetail /></Suspense>} />
          <Route path="sponsors" element={<Suspense fallback={<Loading />}><SponsorList /></Suspense>} />
          <Route path="sponsors/:id" element={<Suspense fallback={<Loading />}><SponsorDetail /></Suspense>} />
          <Route path="stats/scorers" element={<Suspense fallback={<Loading />}><TopScorers /></Suspense>} />
          <Route path="stats/cards" element={<Suspense fallback={<Loading />}><CardStats /></Suspense>} />
          <Route path="api-tester" element={<Suspense fallback={<Loading />}><ApiTester /></Suspense>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
