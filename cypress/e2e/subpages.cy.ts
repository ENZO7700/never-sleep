describe('Documentation & Subpages Tests', () => {
  const subpages = ['/docs', '/about', '/blog', '/careers', '/contact'];

  subpages.forEach(path => {
    it(`should render ${path} correctly`, () => {
      cy.visit(path);
      cy.get('h1').should('be.visible');
      cy.get('nav').should('be.visible');
      cy.get('footer').should('be.visible');
    });
  });

  describe('Documentation Page', () => {
    beforeEach(() => {
      cy.visit('/docs');
    });

    it('should have a search bar (mock)', () => {
      cy.get('input[placeholder*="Search"]').should('be.visible');
    });

    it('should have sidebar navigation', () => {
      cy.get('aside').should('be.visible');
      cy.get('aside').contains('Introduction').should('be.visible');
      cy.get('aside').contains('Quickstart').should('be.visible');
    });

    it('should display code snippets', () => {
      cy.get('pre').should('be.visible');
      cy.get('code').should('be.visible');
    });
  });

  describe('Blog Page', () => {
    it('should display blog posts', () => {
      cy.visit('/blog');
      cy.get('article').should('have.length.at.least', 1);
      cy.contains('Read more').should('be.visible');
    });
  });

  describe('Careers Page', () => {
    it('should display job openings', () => {
      cy.visit('/careers');
      cy.contains('Open Positions').should('be.visible');
      cy.contains('Apply Now').should('be.visible');
    });
  });
});
