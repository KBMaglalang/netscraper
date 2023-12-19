describe('scraping spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should homepage loads', () => {
    cy.contains(/NetScraper/i);
  });

  // behavior
  // scrape amazon product
  it('should scrape amazon product', () => {
    // check that there is no amazon product listed on the page
    cy.get('[data-test="homepage-product-list"]').should('not.contain', 'Dutch Oven');

    // check the side bar does not contain the amazon product
    cy.get('[data-test="sidebar-button"]').click();
    cy.get('[data-test="sidebar-product-list"]').should('not.contain', 'Dutch Oven');
    cy.get('[data-test="sidebar-outside-layer"]').click();

    // try running scrapper with empty url
    cy.get('[data-test="search-form"] > button').should('be.disabled');

    // try scraping with invalid url
    cy.get('[data-test="search-form"] > input').type('invalid url');
    cy.get('[data-test="search-form"] > button').should('be.enabled');
    cy.get('[data-test="search-form"] > button').click();
    cy.contains(/Invalid Amazon Product Link/i);

    // try scraping with valid url
    cy.get('[data-test="search-form"] > input').clear();
    cy.get('[data-test="search-form"] > input').type(
      'https://www.amazon.ca/dp/B000N501BK/ref=cm_gf_aaun_iaac_d_p0_e0_qd0_fA8t7uZ8dPCPKhkGmBav?th=1'
    );
    cy.get('[data-test="search-form"] > button').click();
    cy.wait(10000); // 10 second wait

    // check that the amazon product is listed on the page
    cy.get('[data-test="homepage-product-list"]').should('contain', 'Dutch Oven');
    // check that the side bar contains the amazon product
    cy.get('[data-test="sidebar-button"]').click();
    cy.get('[data-test="sidebar-product-list"]').should('contain', 'Dutch Oven');
    cy.get('[data-test="sidebar-outside-layer"]').click();

    // navigate to scraped product
    cy.get('[data-test="homepage-product-list"]').contains('Dutch Oven').click();
    cy.get('[data-test="product-delete-button"]').click();
    cy.get('[data-test="homepage-product-list"]').should('not.contain', 'Dutch Oven');
  });
});
