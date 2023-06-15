describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testuser', name: 'Tom Tester', password: 'password'
    }).then(response => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
    // cypress.config.js määritelty baseUrl
    cy.visit('http://localhost:3000/')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-form').type('testuser')
      cy.get('#password-form').type('password')
      cy.get('#login-button').click()

      cy.contains('Logged in user testuser')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-form').type('wrong')
      cy.get('#password-form').type('credentials')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
      cy.contains('Logged in user').should('not.exist')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
    })

    it('A blog can be created', function() {
      // ...
    })
  })
})
