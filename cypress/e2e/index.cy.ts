describe('@storyblok/nuxt', () => {
  describe('Composition API', () => {
    beforeEach(() => {
      // cy.intercept("https://api.storyblok.com/**", {
      //   fixture: "stories.json"
      // }).as("getStories");
      cy.visit('/vue/test');
    });

    it('should fetch and render stories', () => {
      it('Renders the expected story when loading the components', () => {
        cy.get('[data-test=page]').should('exist');
        cy.get('[data-test=grid]').should('exist');
        cy.get('[data-test=feature]').should('have.length', 2);
        cy.get('[data-test=teaser]').should('exist').and('have.text', 'hello');
      });
    });
  });

  describe('Composition API - Long form', () => {
    beforeEach(() => {
      cy.visit('/vue');
    });

    it('should fetch and render stories', () => {
      it('Renders the expected story when loading the components', () => {
        cy.get('[data-test=page]').should('exist');
        cy.get('[data-test=grid]').should('exist');
        cy.get('[data-test=feature]').should('have.length', 3);
        cy.get('[data-test=teaser]').should('exist').and('have.text', 'hello');
      });
    });
  });
});
