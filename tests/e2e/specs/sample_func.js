// This file describes a simple cypress test to open the app, and run a complete user cycle through the app.

describe('Interacting with the app', () => {
    it('Selects a month and year', () => {
      cy.visit('/');
  
      cy.get('[data-test="yearSelector"]').select('2019');

      cy.get('[data-test="monthSelector"]').select('June');

      cy.get('[data-test="maxInput"]').type('192.68');

      cy.get('[data-test="maxSet"]').click();

      cy.contains("192.68");

      cy.get('[data-test="currentMonthCard"]').contains("June").contains("2019");
    });
  });