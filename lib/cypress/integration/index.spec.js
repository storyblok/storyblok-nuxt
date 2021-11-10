describe("@storyblok/nuxt", () => {
  beforeEach(() => {
    cy.intercept("https://api.storyblok.com/**", {
      fixture: "stories.json",
    }).as("getStories");

    cy.visit("/");
  });

  it("should register $storyapi and $storybridge", () => {
    // TODO: find out how to access the context provided variables in Nuxt 3
    //
    // cy.window()
    //   .its("$nuxt.context")
    //   .then((ctx) => {
    //     cy.wrap(ctx).its("$storyapi").should("exist");
    //     cy.wrap(ctx).its("app.$storyapi").should("exist");
    //     cy.wrap(ctx).its("$storybridge").should("exist");
    //     cy.wrap(ctx).its("app.$storybridge").should("exist");
    //   });
  });

  it("should fetch and render stories", () => {
    cy.get("[data-test=stories]").children().should("have.length", 3);
  });

  it("should globally add v-editable directive", () => {
    cy.get("[data-test=stories]").then((div) => {
      cy.wrap(div).should(
        "have.attr",
        "data-blok-c",
        '{"id":12345,"uid":"fc34-uad1"}'
      );
      cy.wrap(div).should("have.attr", "data-blok-uid", "12345-fc34-uad1");
    });
  });
});
