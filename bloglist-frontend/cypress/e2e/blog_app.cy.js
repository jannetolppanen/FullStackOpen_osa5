describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ username: 'testuser', name: 'Tom Tester', password: 'password' })
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
      cy.get('#username-form').type('testuser')
      cy.get('#password-form').type('password')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('button', 'create new blog').click()
      cy.get('#title-input').type('My first blog')
      cy.get('#author-input').type('Author Anna')
      cy.get('#url-input').type('www.annasblog.com')
      cy.get('#submit-button').click()
      cy.contains('My first blog Author Anna')
    })
  })
})
