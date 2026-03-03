describe('Edge Cases & Error Handling', () => {
  it('should handle 404 page', () => {
    cy.visit('/this-page-does-not-exist', { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
    cy.contains('Go back home').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should handle empty GitHub token', () => {
    cy.visit('/github');
    cy.get('[data-testid="gh-auth-button"]').click();
    // Should not authenticate or show error
    cy.contains('Connect GitHub').should('be.visible');
  });

  it('should handle very short GitHub token', () => {
    cy.visit('/github');
    cy.get('[data-testid="gh-token-input"]').type('short');
    cy.get('[data-testid="gh-auth-button"]').click();
    cy.contains('Connect GitHub').should('be.visible');
  });

  it('should handle large code input in demo', () => {
    cy.visit('/');
    cy.contains('Try the agent yourself').scrollIntoView();
    const largeCode = 'function test() { \n'.repeat(100) + '}';
    cy.get('textarea').clear().type(largeCode, { delay: 0 });
    cy.get('[data-testid="demo-fix-button"]').click();
    cy.contains('Fix applied successfully', { timeout: 15000 });
  });

  it('should be resilient to rapid clicks on FAQ', () => {
    cy.visit('/');
    for(let i=0; i<10; i++) {
      cy.get('[data-testid="faq-item-0"]').click();
    }
    // Should end up in some state without crashing
    cy.get('[data-testid="faq-item-0"]').should('exist');
  });

  it('should handle window resize during demo', () => {
    cy.visit('/');
    cy.get('[data-testid="demo-fix-button"]').click();
    cy.viewport('iphone-x');
    cy.viewport(1920, 1080);
    cy.contains('Analyzing syntax').should('exist');
  });

  it('should verify scroll to top on navigation', () => {
    cy.visit('/');
    cy.scrollTo('bottom');
    cy.get('footer').contains('Documentation').click();
    cy.window().its('scrollY').should('equal', 0);
  });
});
