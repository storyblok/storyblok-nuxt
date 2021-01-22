/* eslint-disable */

describe('Storyblok', () => {
    it('Storyblok script should have been injected', () => {
      cy.visit('/')
      cy.wait(1000)

      cy.window().then((win) => {
        chai.expect(win).haveOwnProperty('storyblok')
        chai.expect(win.$nuxt.$storyapi).not.undefined
        chai.expect(win.$nuxt.$storybridge).not.undefined
      })

  
      cy.get('html').then((el) => {
        const html = el[0].innerHTML;
        
        chai
          .expect(html)
          .contain('<script src="https://app.storyblok.com/f/storyblok-latest.js" id="storyblok-javascript-bridge"></script>');

        chai
          .expect(html)
          .contain('hello');
      })
    })
  })