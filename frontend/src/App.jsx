import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Chat from './pages/Chat';

import { UIProvider } from './context/UIContext';
import PublishModal from './components/PublishModal';

function App() {
  return (
    <UIProvider>
      <Router>
        <Routes>
          {/* Par défaut, on redirige vers le login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <PublishModal />
      </Router>
    </UIProvider>
  );
}

export default App;