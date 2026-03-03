describe('RubberDuck.Space Main User Flows', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate between main pages', () => {
    // Check home page
    cy.contains('Autonomous code repair').should('be.visible');

    // Navigate to Docs
    cy.get('[data-testid="nav-link-docs"]').click();
    cy.url().should('include', '/docs');
    cy.contains('Documentation').should('be.visible');

    // Navigate back to Home via Logo
    cy.get('nav').find('a').contains('RubberDuck.Space').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should use the interactive demo to fix code', () => {
    // Scroll to demo section
    cy.contains('Try the agent yourself').scrollIntoView();

    // Check initial state
    cy.contains('Click "Fix Code" to start the agent').should('be.visible');

    // Click Fix Code
    cy.get('[data-testid="demo-fix-button"]').click();

    // Check progress states (scanning, patching, testing)
    cy.contains('Analyzing syntax').should('be.visible');
    
    // Wait for completion (demo has 4.5s total timeout)
    cy.contains('Fix applied successfully', { timeout: 10000 }).should('be.visible');
    cy.contains('calculateTotal').should('be.visible');

    // Reset demo
    cy.get('[data-testid="demo-reset-button"]').click();
    cy.contains('Click "Fix Code" to start the agent').should('be.visible');
  });

  it('should display the feature comparison matrix', () => {
    cy.contains('How we compare').scrollIntoView();
    cy.get('[data-testid="feature-matrix-table"]').should('be.visible');
    cy.contains('Autonomous Bug Fixing').should('be.visible');
    cy.contains('RubberDuck').should('be.visible');
  });

  it('should handle GitHub authentication flow mockup', () => {
    // Navigate to GitHub Dashboard
    cy.get('nav').find('a[href="/github"]').click();
    cy.url().should('include', '/github');

    // Check auth screen
    cy.contains('Connect GitHub').should('be.visible');

    // Enter token and authenticate
    cy.get('[data-testid="gh-token-input"]').type('ghp_test_token_long_enough');
    cy.get('[data-testid="gh-auth-button"]').click();

    // Check dashboard
    cy.contains('Ján Vývojár').should('be.visible');
    cy.contains('Pinned Repositories').should('be.visible');

    // Switch tabs
    cy.contains('Repositories').click();
    cy.contains('Search repositories').should('be.visible');
    cy.contains('resend-ui-clone').should('be.visible');

    // Logout
    cy.contains('Sign Out').click();
    cy.contains('Connect GitHub').should('be.visible');
  });
});
