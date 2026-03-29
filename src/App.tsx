import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Orientation from './pages/Orientation';
import Blueprint from './pages/Blueprint';
import Script from './pages/Script';
import CranialNerves from './pages/CranialNerves';
import Drills from './pages/Drills';
import AudioLibrary from './pages/AudioLibrary';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="orientation" element={<Orientation />} />
          <Route path="blueprint" element={<Blueprint />} />
          <Route path="script" element={<Script />} />
          <Route path="cranial-nerves" element={<CranialNerves />} />
          <Route path="drills" element={<Drills />} />
          <Route path="audio" element={<AudioLibrary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
