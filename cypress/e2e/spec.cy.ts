describe('Navigation', () => {
  it('Should go to contact', () => {
    cy.visit('http://localhost:3000/contact');
    cy.url().should('include','/contact');
    cy.get('h1').contains('Contactez-nous');
  })
  it('Should go to home page', () => {
    cy.visit('http://localhost:3000');
    cy.url().should('include','/');
    cy.get('h1').contains('Contactez-nous formulaire');
  })
})

describe('Formulaire', () => {
  it('Should display error messages for invalid form submission', () => {
    cy.visit('http://localhost:3000/contact');
    cy.url().should('include', '/contact');

    // Submit the form without filling out any fields
    cy.get('button[type="submit"]').click();

    // Validate error messages for each form field
    cy.get('input[name="lastName"]').should('have.value', '');
    cy.contains('String must contain at least 2 character(s)').should('be.visible');

    cy.get('input[name="firstName"]').should('have.value', '');
    cy.contains('String must contain at least 2 character(s)').should('be.visible');

    cy.get('input[name="email"]').should('have.value', '');
    cy.contains('Invalid email').should('be.visible');

    cy.get('textarea[name="message"]').should('have.value', '');
    cy.contains('String must contain at least 2 character(s)').should('be.visible');
  });

  it('Should successfully submit the form with valid data', () => {
    cy.visit('http://localhost:3000/contact');
    cy.url().should('include', '/contact');

    // Fill out the form with valid data
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('textarea[name="message"]').type('This is a test message.');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert that the form submission was successful
    cy.contains('Form submitted successfully!');
  });
});
