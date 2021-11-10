describe("@storyblok/nuxt", () => {
  beforeEach(() => {
    cy.intercept("https://api.storyblok.com/**", {
      fixture: "stories.json",
    }).as("getStories");
    cy.visit("/");
    // cy.wait("@getStories");
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
    cy.get("[data-test=stories]").children().should("have.length", 3);
  });
});
