import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import TeamList from './pages/teams/TeamList';
import TeamDetail from './pages/teams/TeamDetail';
import PlayerList from './pages/players/PlayerList';
import PlayerDetail from './pages/players/PlayerDetail';
import RefereeList from './pages/referees/RefereeList';
import TournamentList from './pages/tournaments/TournamentList';
import TournamentDetail from './pages/tournaments/TournamentDetail';
import MatchList from './pages/matches/MatchList';
import MatchDetail from './pages/matches/MatchDetail';
import SponsorList from './pages/sponsors/SponsorList';
import SponsorDetail from './pages/sponsors/SponsorDetail';
import TopScorers from './pages/stats/TopScorers';
import CardStats from './pages/stats/CardStats';
import ApiTester from './pages/ApiTester/ApiTester';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="teams" element={<TeamList />} />
          <Route path="teams/:id" element={<TeamDetail />} />
          <Route path="players" element={<PlayerList />} />
          <Route path="players/:id" element={<PlayerDetail />} />
          <Route path="referees" element={<RefereeList />} />
          <Route path="tournaments" element={<TournamentList />} />
          <Route path="tournaments/:id" element={<TournamentDetail />} />
          <Route path="matches" element={<MatchList />} />
          <Route path="matches/:id" element={<MatchDetail />} />
          <Route path="sponsors" element={<SponsorList />} />
          <Route path="sponsors/:id" element={<SponsorDetail />} />
          <Route path="stats/scorers" element={<TopScorers />} />
          <Route path="stats/cards" element={<CardStats />} />
          <Route path="api-tester" element={<ApiTester />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
