describe('GitHub Dashboard', () => {
  beforeEach(() => {
    cy.visit('/github');
    cy.clearLocalStorage();
  });

  it('should not ask for a personal access token', () => {
    cy.get('[data-testid="gh-token-input"]').should('not.exist');
    cy.contains('Personal Access Token').should('not.exist');
    cy.contains('Connect GitHub').should('not.exist');
  });

  it('should not store gh_token in localStorage', () => {
    cy.window().then((win) => {
      expect(win.localStorage.getItem('gh_token')).to.be.null;
    });
  });

  it('should show public repository information or an honest error', () => {
    cy.get('body').then(($body) => {
      const text = $body.text();
      const hasRepoView = text.includes('never-sleep') || text.includes('ENZO7700/never-sleep');
      const hasErrorView = text.includes('Unable to load repository');
      expect(hasRepoView || hasErrorView).to.eq(true);
    });
  });

  it('should link to the real GitHub repository', () => {
    cy.get('a[href="https://github.com/ENZO7700/never-sleep"]').should('exist');
  });
});
