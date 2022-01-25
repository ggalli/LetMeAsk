import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from "./pages/Auth";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

import './styles/alignment.scss';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/new" element={<NewRoom />} />
        <Route path="/rooms/:roomId" element={<Room />} />
        <Route path="/admin/rooms/:roomId" element={<AdminRoom />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;