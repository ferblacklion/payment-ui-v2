/// <reference types="cypress" />
const paymentsMockData = [
  {
    id: 'fFzh55i24odimK1tpzNU',
    name: 'comida-python',
    person: 'elisa',
    image:
      'https://storage.googleapis.com/moises-web-dev-v2.appspot.com/family-payments-invoice%2F4b01cbc4925f2974cd75921de6c0951d.png',
    updated: null,
    datetime: '2023-03-31T19:17:21.478Z',
  },
  {
    id: 'Iu570xUIohgaRIpPn5Nb',
    name: 'cafe-casa',
    person: 'moi',
    image:
      'https://storage.googleapis.com/moises-web-dev-v2.appspot.com/family-payments-invoice%2F8d380c1bf09cfd0f4542243626a3a6a6.png',
    updated: null,
    datetime: '2023-03-31T19:03:44.660Z',
  },
  {
    id: 'EzBGudAdcB26M6865tqL',
    name: 'iusi-casa',
    person: 'moi',
    image:
      'https://storage.googleapis.com/moises-web-dev-v2.appspot.com/family-payments-invoice%2F96c150495aae798f57855c39eba89ac9.png',
    updated: null,
    datetime: 1680137164364,
  },
  {
    id: 'zkDJOtdgNkXgNcgiRaWc',
    name: 'flores-casa',
    person: 'moi',
    image: null,
    updated: null,
    datetime: 1680137156460,
  },
  {
    id: 'c5KqWehBAAGFgLd9TpOw',
    name: 'comida-python',
    person: 'elisa',
    image:
      'https://storage.googleapis.com/moises-web-dev-v2.appspot.com/family-payments-invoice%2Fb15c5d6eac30d2bb7c4c20ae4b465f87.png',
    updated: null,
    datetime: 1680124805446,
  },
  {
    id: 'hNUWzkjiAmEib1Cx70gd',
    name: 'acova',
    person: 'moi',
    image:
      'https://storage.googleapis.com/moises-web-dev-v2.appspot.com/family-payments-invoice%2Fb15c5d6eac30d2bb7c4c20ae4b465f87.png',
    updated: null,
    datetime: 1680124798468,
  },
  {
    id: 'i3kEByOLyjhQn7ss8rDS',
    name: 'flores-casa',
    person: 'elisa',
    image:
      'https://storage.googleapis.com/moises-web-dev-v2.appspot.com/family-payments-invoice%2Fb15c5d6eac30d2bb7c4c20ae4b465f87.png',
    updated: null,
    datetime: 1680124787854,
  },
  {
    id: 'GGNGmb19C3ACoXj3x3Jd',
    name: 'basura',
    person: 'moi',
    image:
      'https://storage.googleapis.com/moises-web-dev-v2.appspot.com/family-payments-invoice%2Fb15c5d6eac30d2bb7c4c20ae4b465f87.png',
    updated: null,
    datetime: 1680124731094,
  },
  {
    id: 'FcOWoekgmwe37ny2TNWi',
    name: 'iusi-casa',
    person: 'moi',
    image:
      'https://storage.googleapis.com/moises-web-dev-v2.appspot.com/family-payments-invoice%2Fb15c5d6eac30d2bb7c4c20ae4b465f87.png',
    updated: null,
    datetime: 1680124659468,
  },
  {
    id: 'RYVNW4x123zufnLKrsXm',
    name: 'cafe-casa',
    person: 'elisa',
    image: null,
    updated: null,
    datetime: 1680124651684,
  },
  {
    id: 'z5bMxBwZsKGydd6CLJrk',
    name: 'basura',
    person: 'elisa',
    image:
      'https://storage.googleapis.com/moises-web-dev-v2.appspot.com/family-payments-invoice%2F211e624160fb7d58943d477ebd493c24.png',
    updated: null,
    datetime: 1680124413663,
  },
  {
    id: 'IkS3uWX3uT1AbUDCDsjZ',
    name: 'acova',
    person: 'moi',
    image:
      'https://storage.googleapis.com/moises-web-dev-v2.appspot.com/family-payments-invoice%2F96c150495aae798f57855c39eba89ac9.png',
    updated: null,
    datetime: 1680124300882,
  },
];
describe('<app>', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('/v1/api/payments', paymentsMockData);
  });
  it('should render without any errors', () => {
    cy.findByText(/gastos/i).should('exist');
    cy.getSaveButton().should('exist');
    cy.findByTestId('table-body').children().should('have.length.at.least', 1);
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should display error message when click only in the payment', () => {
    cy.contains(/IUSI Casa/i).click();
    cy.getSaveButton().click();
    cy.findByText('Los datos no estan completos!').should('exist');
  });
  it('should display error message when click only in the person', () => {
    cy.contains(/Moi/i).click();
    cy.getSaveButton().click();
    cy.findByText('Los datos no estan completos!').should('exist');
  });
  it('should display error message if any data is not selected', () => {
    cy.getSaveButton().click();
    cy.findByText('Los datos no estan completos!').should('exist');
  });
  it('should save a payment properly', () => {
    cy.intercept('POST', `${Cypress.config().baseUrl}/v1/api/payments`, {
      id: 'PTrZFxEeRdm9xbsGuDcX',
      success: true,
    });
    cy.findByText(/IUSI Casa/i).click();
    cy.contains(/Moi/i).click();
    cy.getSaveButton().click();
    cy.findByText(/Guardado/i).should('exist');
  });
  it('should open the image in a new window', () => {
    cy.findAllByTitle(/Image/).should('have.length.at.least', 1);
    cy.findAllByTitle(/Image/).first().should('have.attr', 'target');
  });
});
