describe('Responsive Design Tests', () => {
  const viewports = [
    { device: 'iPhone X', width: 375, height: 812 },
    { device: 'iPad Mini', width: 768, height: 1024 },
    { device: 'MacBook 13', width: 1280, height: 800 },
    { device: 'Desktop 1080p', width: 1920, height: 1080 }
  ];

  viewports.forEach(vp => {
    it(`should render correctly on ${vp.device}`, () => {
      cy.viewport(vp.width, vp.height);
      cy.visit('/');
      
      // Check core elements
      cy.get('nav').should('be.visible');
      cy.get('footer').should('be.visible');
      
      if (vp.width < 768) {
        // Mobile specific checks
        cy.get('button[aria-label="Toggle menu"]').should('be.visible');
        cy.get('nav').find('.hidden.md\\:flex').should('not.be.visible');
      } else {
        // Desktop specific checks
        cy.get('button[aria-label="Toggle menu"]').should('not.be.visible');
        cy.get('nav').find('.hidden.md\\:flex').should('be.visible');
      }
    });
  });

  it('should handle orientation change on mobile', () => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.viewport('iphone-x', 'landscape');
    cy.contains('The AI engineer').should('be.visible');
  });
});
