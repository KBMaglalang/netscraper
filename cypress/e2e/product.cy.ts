describe('product testing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should homepage loads', () => {
    cy.contains(/NetScraper/i);
  });

  // behavior
  it('should scrape amazon product', () => {
    // check that there is no amazon product listed on the page
    cy.get('[data-test="homepage-product-list"]').should('not.contain', 'Dutch Oven');

    // try scraping with valid url
    cy.get('[data-test="search-form"] > input').clear();
    cy.get('[data-test="search-form"] > input').type(
      'https://www.amazon.ca/dp/B000N501BK/ref=cm_gf_aaun_iaac_d_p0_e0_qd0_fA8t7uZ8dPCPKhkGmBav?th=1'
    );
    cy.get('[data-test="search-form"] > button').click();
    cy.wait(10000); // 10 second wait

    // check that the amazon product is listed on the page
    cy.get('[data-test="homepage-product-list"]').should('contain', 'Dutch Oven');

    // navigate to scraped product
    cy.get('[data-test="homepage-product-list"]').contains('Dutch Oven').click();

    // testing pinned function
    cy.get('[data-test="product-pinned-button"]').click();
    cy.contains(/Pinned status updated/i);

    // notification enabled
    cy.get('[data-test="product-notification-toggle-button"]').click();
    cy.get('[data-test="product-notification-toggle-button"]').contains(/Enable/i);

    // notification disabled
    cy.get('[data-test="product-notification-toggle-button"]').click();
    cy.get('[data-test="product-notification-toggle-button"]').contains(/Disable/i);

    // notification price update
    cy.get('[data-test="product-notification-price-form"] > input').clear();
    cy.get('[data-test="product-notification-price-form"] > input').type('100');
    cy.get('[data-test="product-notification-price-form"] > button').click();
    cy.contains(/Notification price updated/i);

    // visit product page on homepage
    cy.get('[data-test="product-visit-button"]').invoke('attr', 'href').should('include', 'amazon');

    // delete product
    cy.get('[data-test="product-delete-button"]').click();
    cy.get('[data-test="homepage-product-list"]').should('not.contain', 'Dutch Oven');
  });
});
