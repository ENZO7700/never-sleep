import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LiveFeed } from './components/LiveFeed';
import { StickyCTA } from './components/StickyCTA';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { Docs } from './pages/Docs';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';
import { GitHubDashboard } from './pages/GitHubDashboard';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-space text-text-primary font-sans selection:bg-yellow/30 selection:text-yellow overflow-x-hidden">
        <div className="noise-bg" />
        <Navbar />
        <StickyCTA />
        <LiveFeed />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/github" element={<GitHubDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}
