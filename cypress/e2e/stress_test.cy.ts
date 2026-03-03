describe('Production Stress & Integrity Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should verify all main section headings', () => {
    const headings = [
      'The AI engineer',
      'Try the agent yourself',
      'How it works',
      'Key Capabilities',
      'How we compare',
      'Pricing',
      'Frequently asked questions'
    ];
    headings.forEach(text => {
      cy.contains(text).should('be.visible');
    });
  });

  it('should verify all pricing features are listed', () => {
    cy.visit('/#pricing');
    const features = [
      'Up to 5 seats',
      '100 autonomous PRs',
      'GitHub & GitLab integration',
      'Unlimited autonomous PRs',
      'Priority email support',
      'Self-hosted / VPC deployment',
      '24/7 phone support'
    ];
    features.forEach(feature => {
      cy.contains(feature).should('be.visible');
    });
  });

  it('should verify all footer links exist', () => {
    const footerLinks = [
      'Product', 'Features', 'Security', 'Pricing',
      'About', 'Blog', 'Careers', 'Contact',
      'Documentation', 'API Reference', 'Changelog', 'Status',
      'Privacy Policy', 'Terms of Service', 'Cookie Policy'
    ];
    footerLinks.forEach(link => {
      cy.get('footer').contains(link).should('be.visible');
    });
  });

  it('should verify social proof logos', () => {
    cy.get('section').contains('Trusted by forward-thinking teams').scrollIntoView();
    // Assuming logos have some common class or container
    cy.get('img[alt*="logo"]').should('have.length.at.least', 4);
  });

  it('should verify ROI calculator functionality', () => {
    cy.contains('Calculate your ROI').scrollIntoView();
    cy.contains('Engineers').should('be.visible');
    // Interact with sliders if they have testids or identifiable classes
    cy.get('input[type="range"]').first().invoke('val', 50).trigger('input');
    cy.contains(/\$\d+/).should('be.visible'); // Check if some dollar amount is displayed
  });

  it('should verify all integration icons', () => {
    cy.contains('Integrates with your stack').scrollIntoView();
    const integrations = ['GitHub', 'GitLab', 'Bitbucket', 'Slack', 'Discord', 'Jira', 'Linear', 'Vercel'];
    integrations.forEach(name => {
      cy.contains(name).should('be.visible');
    });
  });

  it('should check for broken images', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('be.visible').and(($el) => {
        const img = $el[0] as HTMLImageElement;
        expect(img.naturalWidth).to.be.greaterThan(0);
      });
    });
  });

  it('should check for console errors', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError');
    });
    cy.visit('/');
    cy.get('@consoleError').should('not.be.called');
  });
});
