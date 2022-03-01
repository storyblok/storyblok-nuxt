describe("@storyblok/nuxt", () => {
  describe("Options API", () => {
    beforeEach(() => {
      // cy.intercept("https://api.storyblok.com/**", {
      //   fixture: "stories.json"
      // }).as("getStories");
      cy.visit("/test");
    });

    it("should register $storyapi and $storybridge", () => {
      cy.window()
        .its("$nuxt.context")
        .then((ctx) => {
          cy.wrap(ctx).its("$storyapi").should("exist");
          cy.wrap(ctx).its("app.$storyapi").should("exist");
          cy.wrap(ctx).its("$storybridge").should("exist");
          cy.wrap(ctx).its("app.$storybridge").should("exist");
        });
    });

    it("should fetch and render stories", () => {
      it("Renders the expected story when loading the components", () => {
        cy.get("[data-test=page]").should("exist");
        cy.get("[data-test=grid]").should("exist");
        cy.get("[data-test=feature]").should("have.length", 2);
        cy.get("[data-test=teaser]").should("exist").and("have.text", "hello");
      });
    });
  });

  describe("Composition API", () => {
    beforeEach(() => {
      cy.visit("/vcalong");
    });

    it("should fetch and render stories", () => {
      it("Renders the expected story when loading the components", () => {
        cy.get("[data-test=page]").should("exist");
        cy.get("[data-test=grid]").should("exist");
        cy.get("[data-test=feature]").should("have.length", 2);
        cy.get("[data-test=teaser]").should("exist").and("have.text", "hello");
      });
    });
  });

  describe("Composition API - Short form", () => {
    beforeEach(() => {
      cy.visit("/vca");
    });

    it("should fetch and render stories", () => {
      it("Renders the expected story when loading the components", () => {
        cy.get("[data-test=page]").should("exist");
        cy.get("[data-test=grid]").should("exist");
        cy.get("[data-test=feature]").should("have.length", 2);
        cy.get("[data-test=teaser]").should("exist").and("have.text", "hello");
      });
    });
  });
});
