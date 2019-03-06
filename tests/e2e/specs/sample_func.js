// This file describes a simple cypress test to open the app, and run a complete user cycle through the app.

describe('Interacting with the app', () => {

  before( () => {
    cy.visit('/');
  })

  it('Selects a month and year and sets a maximum, then enters an item', () => {
    cy.get('[data-test="yearSelector"]').select('2019');

    cy.get('[data-test="monthSelector"]').select('June');

    cy.get('[data-test="maxInput"]').type('192.68');

    cy.get('[data-test="maxSet"]').click();

    cy.contains("192.68");

    cy.get('[data-test="currentMonthCard"]').contains("June").contains("2019");
  });
  
  it('Inputs an item', () => {
    cy.get('[data-test="productName"]').type("Item1");
    cy.get('[data-test="productPrice"]').type("100.10");

    cy.get('[data-test="registerProduct"]').click();

    cy.get('[data-test="productName"]').should('have.value', '');
    cy.get('[data-test="productPrice"]').should('have.value', '');

    cy.get('[data-test="itemsList"]').contains("Item1").contains("100.10");
  });

  it('Inputs another item and deletes the first', () => {
    cy.get('[data-test="productName"]').type("Item2");
    cy.get('[data-test="productPrice"]').type("101.01");

    cy.get('[data-test="registerProduct"]').click();

    cy.get('[data-test="productName"]').should('have.value', '');
    cy.get('[data-test="productPrice"]').should('have.value', '');

    cy.get('[data-test="itemsList"]').contains("Item1").contains("100.10");

    cy.get('[data-test="itemsList"]').within(() => {
      cy.get('li').first().find('[data-test="RemoveItemButton"]').click();
    })
    
    cy.get('[data-test="itemsList"]').should('not.contain', "Item1");
  });

  it('Selects another month, inputs another item and checks persistence of both', ()=>{
    cy.get('[data-test="monthSelector"]').select('July');
    cy.should('not.contain', "Item2");

    cy.get('[data-test="productName"]').type("Item3");
    cy.get('[data-test="productPrice"]').type("999.01");

    cy.get('[data-test="registerProduct"]').click();

    cy.get('[data-test="itemsList"]').contains("Item3").contains("999.01");

    cy.get('[data-test="monthSelector"]').select('June');
    cy.should('not.contain', "Item3");
    cy.get('[data-test="itemsList"]').should('contain', "Item2");

    cy.get('[data-test="monthSelector"]').select('July');
    cy.should('not.contain', "Item2");
    cy.get('[data-test="itemsList"]').should('contain', "Item3");

  });

});