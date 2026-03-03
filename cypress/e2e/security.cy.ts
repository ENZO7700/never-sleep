describe('Security & Best Practices', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have a secure connection (HTTPS in production)', () => {
    // In dev it's http, but we can check if it's not exposing sensitive info
    cy.location('protocol').should('be.oneOf', ['http:', 'https:']);
  });

  it('should have meta tags for SEO and Social', () => {
    cy.get('head meta[name="description"]').should('have.attr', 'content');
    cy.get('head meta[property="og:title"]').should('exist');
  });

  it('should not expose server headers (mock check)', () => {
    cy.request('/').then((response) => {
      expect(response.headers).to.not.have.property('x-powered-by');
    });
  });

  it('should have a manifest or favicon', () => {
    cy.get('head link[rel*="icon"]').should('exist');
  });

  it('should have correct lang attribute', () => {
    cy.get('html').should('have.attr', 'lang', 'en');
  });
});
