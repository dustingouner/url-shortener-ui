describe('Form submission', () => {
  beforeEach(() => {
    cy.intercept('GET', "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      fixture: 'urls.json'
    });

    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      statusCode: 201,
      body: {
        id: 7,
        long_url: 'https://unsplash.com/photos/m5Wj2ThjA14',
        short_url: 'http://localhost:3001/useshorturl/11',
        title: 'Great Photo',
      }
    });

    cy.visit('http://localhost:3000');
  });

  it('User can fill in the form, click submit button, and view the new shortened URL on the page', () => {
    cy.get('form')
      .get("input[name='title']").type('Great Photo')
      .get("input[name='urlToShorten']").type('https://unsplash.com/photos/m5Wj2ThjA14')
      .get('button').click();

    cy.wait(1000); 

    cy.get('section')
      .get(':nth-child(3) > h3').should('contain', 'Great Photo')
      .get(':nth-child(3) > a').should('contain', 'http://localhost:3001/useshorturl/11')
      .get(':nth-child(3) > p').should('contain', 'https://unsplash.com/photos/m5Wj2ThjA14');
  });
});