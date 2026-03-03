describe('GitHub Dashboard Deep Dive', () => {
  const validToken = 'ghp_this_is_a_mock_token_for_testing_purposes';

  beforeEach(() => {
    cy.visit('/github');
    // Clear localStorage to ensure clean state
    cy.clearLocalStorage();
  });

  it('should prevent access without token', () => {
    cy.contains('Connect GitHub').should('be.visible');
    cy.get('[data-testid="gh-token-input"]').should('be.visible');
  });

  it('should authenticate with a valid-looking token', () => {
    cy.get('[data-testid="gh-token-input"]').type(validToken);
    cy.get('[data-testid="gh-auth-button"]').click();
    cy.contains('Ján Vývojár').should('be.visible');
    cy.url().should('include', '/github');
  });

  describe('Authenticated State', () => {
    beforeEach(() => {
      cy.get('[data-testid="gh-token-input"]').type(validToken);
      cy.get('[data-testid="gh-auth-button"]').click();
    });

    it('should navigate through sidebar tabs', () => {
      // Repositories
      cy.get('aside').contains('Repositories').click();
      cy.contains('Search repositories').should('be.visible');
      
      // Notes
      cy.get('aside').contains('/notes').click();
      cy.contains('Engineering Log').should('be.visible');
      
      // Overview
      cy.get('aside').contains('Overview').click();
      cy.contains('Pinned Repositories').should('be.visible');
    });

    it('should search repositories', () => {
      cy.get('aside').contains('Repositories').click();
      cy.get('input[placeholder="Search repositories..."]').type('rubber');
      cy.contains('rubberduck-core').should('be.visible');
      
      cy.get('input[placeholder="Search repositories..."]').clear().type('non-existent');
      cy.contains('rubberduck-core').should('not.exist');
    });

    it('should show infrastructure status', () => {
      cy.contains('Vercel').should('be.visible');
      cy.contains('Supabase').should('be.visible');
      cy.contains('Operational').should('be.visible');
    });

    it('should logout correctly', () => {
      cy.contains('Sign Out').click();
      cy.contains('Connect GitHub').should('be.visible');
      cy.window().then((win) => {
        expect(win.localStorage.getItem('gh_token')).to.be.null;
      });
    });
  });
});
