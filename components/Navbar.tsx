import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const NavLink = ({ href, children, isExternal = false }: { href: string, children: React.ReactNode, isExternal?: boolean }) => {
    const isAnchor = href.startsWith('#');
    
    if (isAnchor) {
      const fullHref = isHome ? href : `/${href}`;
      return (
        <a 
          href={fullHref} 
          className="hover:text-text-primary transition-colors hover:shadow-[0_1px_0_0_#00F5FF]"
          onClick={() => setMobileMenuOpen(false)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link 
        to={href} 
        className="hover:text-text-primary transition-colors hover:shadow-[0_1px_0_0_#00F5FF]"
        onClick={() => setMobileMenuOpen(false)}
      >
        {children}
      </Link>
    );
  };

  const MobileNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const isAnchor = href.startsWith('#');
    const fullHref = isAnchor && !isHome ? `/${href}` : href;

    if (isAnchor) {
      return (
        <a 
          href={fullHref} 
          className="text-text-secondary hover:text-text-primary font-medium"
          onClick={() => setMobileMenuOpen(false)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link 
        to={href} 
        className="text-text-secondary hover:text-text-primary font-medium"
        onClick={() => setMobileMenuOpen(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-space/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-text-primary font-semibold tracking-tight">
          <Terminal className="w-5 h-5 text-yellow" />
          <span>RubberDuck.Space</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <NavLink href="#product">Product</NavLink>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#security">Security</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="/docs" data-testid="nav-link-docs">Documentation</NavLink>
        </div>

        {/* CTA & Theme */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/github" 
            className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
            title="GitHub Dashboard"
          >
            <Github className="w-5 h-5" />
          </Link>
          <ThemeToggle />
          <button className="bg-yellow text-white dark:text-space font-semibold px-4 py-2 rounded-lg text-sm transition-all hover:scale-[1.03] active:scale-[0.99] glow-yellow">
            Start fixing code
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Link 
            to="/github" 
            className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Github className="w-5 h-5" />
          </Link>
          <ThemeToggle />
          <button
            className="text-text-secondary hover:text-text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-space/95 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.06] p-6 flex flex-col gap-4"
          >
            <MobileNavLink href="#product">Product</MobileNavLink>
            <MobileNavLink href="#features">Features</MobileNavLink>
            <MobileNavLink href="#security">Security</MobileNavLink>
            <MobileNavLink href="#pricing">Pricing</MobileNavLink>
            <MobileNavLink href="/docs">Documentation</MobileNavLink>
            <button className="bg-yellow text-white dark:text-space font-semibold px-4 py-3 rounded-lg text-sm mt-4 glow-yellow">
              Start fixing code
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
