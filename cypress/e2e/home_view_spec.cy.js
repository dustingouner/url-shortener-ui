describe('User Home view', () => {
  beforeEach(() => {
    cy.intercept('GET', "http://localhost:3001/api/v1/urls", {
      fixture: '/urls.json'
    })
    cy.visit('http://localhost:3000')
  })

  
  it('User should see the page title and a form', () => {
    cy.get('h1').contains('URL Shortener')
    cy.get('form')
      .get('[name="title"]').should('have.value', '')
      .get('[name="urlToShorten"]').should('have.value', '')
      .get('button').contains('Shorten Please!')

  })

  it('User should be able to see any existing shortened urls displayed on the screen', () => {
    cy.get('section')
      .get('section > :nth-child(1)')
      .get(':nth-child(1) > h3').contains('Awesome photo')
      .get(':nth-child(1) > a').contains('http://localhost:3001/useshorturl/1')
      .get(':nth-child(1) > p').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
      .get('section > :nth-child(2)')
      .get(':nth-child(2) > h3').contains('new')
      .get(':nth-child(2) > a').contains('http://localhost:3001/useshorturl/2')
      .get(':nth-child(2) > p').contains('https://unsplash.com/photos/vsUP_nFAzJ8')
  })

  it('User can fill out the form and the user inputs are reflected in the input fields', () => {
    cy.get("form input[name='title']").type("Great Photo")
    cy.get("form input[name='urlToShorten']").type("https://unsplash.com/photos/m5Wj2ThjA14")
  })

  it('When user fills out the form and clicks Shorten Please button they will see the shortened url displayed', () => {
    cy.get("form input[name='title']").type("Great Photo")
    cy.get("form input[name='urlToShorten']").type("https://unsplash.com/photos/m5Wj2ThjA14")
    cy.get('button').click()
      .get('section > :nth-child(3)')
      .get(':nth-child(3) > h3').contains('Great Photo')
      .get(':nth-child(3) > p').contains('https://unsplash.com/photos/m5Wj2ThjA14')
  })

})