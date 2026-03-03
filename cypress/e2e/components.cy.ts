describe('Component Integrity Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Hero Section', () => {
    it('should display hero content correctly', () => {
      cy.contains('The AI engineer').should('be.visible');
      cy.get('[data-testid="hero-cta-start"]').should('be.visible');
      cy.get('[data-testid="hero-cta-docs"]').should('be.visible');
    });

    it('should navigate to docs from hero', () => {
      cy.get('[data-testid="hero-cta-docs"]').click();
      cy.url().should('include', '/docs');
    });
  });

  describe('Interactive Demo', () => {
    it('should allow code editing and fixing', () => {
      cy.contains('Try the agent yourself').scrollIntoView();
      const newCode = 'function test() { return 1; }';
      cy.get('textarea').clear().type(newCode);
      cy.get('[data-testid="demo-fix-button"]').click();
      cy.contains('Fix applied successfully', { timeout: 10000 });
    });
  });

  describe('Pricing Section', () => {
    it('should display all pricing plans', () => {
      cy.visit('/#pricing');
      cy.get('[data-testid="pricing-card-starter"]').should('be.visible');
      cy.get('[data-testid="pricing-card-team"]').should('be.visible');
      cy.get('[data-testid="pricing-card-enterprise"]').should('be.visible');
    });

    it('should highlight the Team plan', () => {
      cy.get('[data-testid="pricing-card-team"]').should('have.class', 'border-yellow/30');
    });
  });

  describe('FAQ Section', () => {
    it('should toggle FAQ items', () => {
      cy.get('[data-testid="faq-item-0"]').click();
      cy.get('[data-testid="faq-item-0"]').should('have.attr', 'aria-expanded', 'true');
      cy.contains('natively supports TypeScript').should('be.visible');
      
      cy.get('[data-testid="faq-item-0"]').click();
      cy.get('[data-testid="faq-item-0"]').should('have.attr', 'aria-expanded', 'false');
    });

    it('should allow opening multiple FAQs', () => {
      cy.get('[data-testid="faq-item-0"]').click();
      cy.get('[data-testid="faq-item-1"]').click();
      cy.get('[data-testid="faq-item-0"]').should('have.attr', 'aria-expanded', 'true');
      cy.get('[data-testid="faq-item-1"]').should('have.attr', 'aria-expanded', 'true');
    });
  });

  describe('Theme Toggle', () => {
    it('should switch between light and dark mode', () => {
      // Assuming dark mode is default
      cy.get('html').should('have.class', 'dark');
      cy.get('button[aria-label="Toggle theme"]').click();
      cy.get('html').should('not.have.class', 'dark');
      cy.get('button[aria-label="Toggle theme"]').click();
      cy.get('html').should('have.class', 'dark');
    });
  });
});
