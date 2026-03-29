import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import Orientation from './pages/Orientation';
import Blueprint from './pages/Blueprint';
import Script from './pages/Script';
import CranialNerves from './pages/CranialNerves';
import Drills from './pages/Drills';
import AudioLibrary from './pages/AudioLibrary';
import Analytics from './pages/Analytics';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
          <Route path="orientation" element={<ErrorBoundary><Orientation /></ErrorBoundary>} />
          <Route path="blueprint" element={<ErrorBoundary><Blueprint /></ErrorBoundary>} />
          <Route path="script" element={<ErrorBoundary><Script /></ErrorBoundary>} />
          <Route path="cranial-nerves" element={<ErrorBoundary><CranialNerves /></ErrorBoundary>} />
          <Route path="drills" element={<ErrorBoundary><Drills /></ErrorBoundary>} />
          <Route path="audio" element={<ErrorBoundary><AudioLibrary /></ErrorBoundary>} />
          <Route path="analytics" element={<ErrorBoundary><Analytics /></ErrorBoundary>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
