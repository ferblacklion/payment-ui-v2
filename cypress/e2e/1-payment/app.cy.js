/// <reference types="cypress" />
describe('<app>', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should work properly', () => {
    cy.findByText(/gastos/i).should('exist');
  });
});
