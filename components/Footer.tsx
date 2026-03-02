import React from 'react';
import { Terminal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const isAnchor = href.startsWith('#');
    
    if (isAnchor) {
      const fullHref = isHome ? href : `/${href}`;
      return (
        <a href={fullHref} className="hover:text-cyan transition-colors">
          {children}
        </a>
      );
    }

    return (
      <Link to={href} className="hover:text-cyan transition-colors">
        {children}
      </Link>
    );
  };

  return (
    <footer className="bg-space border-t border-white/[0.06] py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 text-text-primary font-semibold tracking-tight mb-4">
            <Terminal className="w-5 h-5 text-yellow" />
            <span>RubberDuck.Space</span>
          </Link>
          <p className="text-text-secondary text-sm max-w-[40ch] leading-relaxed mb-6">
            Autonomous code repair for enterprise engineering teams. Reduce MTTR and ship safer patches.
          </p>
          <div className="text-xs text-text-muted">
            Built in Bratislava / 2026
          </div>
        </div>

        <div>
          <h4 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li><FooterLink href="#features">Features</FooterLink></li>
            <li><FooterLink href="#pricing">Pricing</FooterLink></li>
            <li><FooterLink href="#security">Security</FooterLink></li>
            <li><FooterLink href="/docs">Documentation</FooterLink></li>
          </ul>
        </div>

        <div>
          <h4 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li><FooterLink href="/about">About</FooterLink></li>
            <li><FooterLink href="/blog">Blog</FooterLink></li>
            <li><FooterLink href="/careers">Careers</FooterLink></li>
            <li><FooterLink href="/contact">Contact</FooterLink></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between text-xs text-text-muted">
        <div>&copy; 2026 RubberDuck.Space. All rights reserved.</div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <FooterLink href="#privacy">Privacy Policy</FooterLink>
          <FooterLink href="#terms">Terms of Service</FooterLink>
          <FooterLink href="#status">System Status</FooterLink>
        </div>
      </div>
    </footer>
  );
}
