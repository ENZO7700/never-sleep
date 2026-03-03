describe('Deep Navigation Tests', () => {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/docs' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
    { name: 'GitHub Dashboard', path: '/github' }
  ];

  beforeEach(() => {
    cy.visit('/');
  });

  pages.forEach(page => {
    it(`should navigate to ${page.name} and verify content`, () => {
      cy.visit(page.path);
      cy.url().should('include', page.path);
      cy.get('nav').should('be.visible');
      cy.get('footer').should('be.visible');
    });
  });

  it('should handle anchor links on home page', () => {
    const anchors = ['#product', '#features', '#security', '#pricing'];
    anchors.forEach(anchor => {
      cy.get(`nav a[href="${anchor}"]`).first().click();
      cy.url().should('include', anchor);
    });
  });

  it('should navigate from subpages back to home sections', () => {
    cy.visit('/docs');
    cy.get('nav a[href="#features"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/#features');
    cy.contains('How it works').should('be.visible');
  });

  it('should have working footer links', () => {
    cy.scrollTo('bottom');
    cy.get('footer').within(() => {
      cy.contains('About').click();
    });
    cy.url().should('include', '/about');
  });

  it('should toggle mobile menu and navigate', () => {
    cy.viewport('iphone-x');
    cy.get('button[aria-label="Toggle menu"]').click();
    cy.get('nav').contains('Documentation').click();
    cy.url().should('include', '/docs');
  });
});
