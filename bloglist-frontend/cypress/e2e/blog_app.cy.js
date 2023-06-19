describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ username: 'testuser', name: 'Tom Tester', password: 'password' })
    cy.createUser({ username: 'testuser2', name: 'Timothy Tester', password: 'password' })
  })
  // it('This is for login testing', function () {
  //   cy.visit('http://localhost:3000')
  //   cy.login({ username: 'testuser', password: 'password' })
  //   cy.createBlog({ title: 'Should be first', author: 'Test Blogger', url: 'www.google.com' })
  // })
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
  describe.only('When logged in', function() {
    beforeEach(function() {
      // cy.login({ username: 'testuser', password: 'password' })
      cy.visit('http://localhost:3000')
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

    it('A blog can be liked', function() {
      cy.contains('button', 'create new blog').click()
      cy.get('#title-input').type('My first blog')
      cy.get('#author-input').type('Author Anna')
      cy.get('#url-input').type('www.annasblog.com')
      cy.get('#submit-button').click()
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed by creator', function() {
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(true)
      })

      cy.contains('button', 'create new blog').click()
      cy.get('#title-input').type('My first blog')
      cy.get('#author-input').type('Author Anna')
      cy.get('#url-input').type('www.annasblog.com')
      cy.get('#submit-button').click()
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.contains('My first blog').should('not.exist')
    })

    it('Only creator sees the remove blog button', function() {
      cy.contains('button', 'create new blog').click()
      cy.get('#title-input').type('My first blog')
      cy.get('#author-input').type('Author Anna')
      cy.get('#url-input').type('www.annasblog.com')
      cy.get('#submit-button').click()
      cy.get('#logout-button').click()
      cy.get('#username-form').type('testuser2')
      cy.get('#password-form').type('password')
      cy.get('#login-button').click()
      cy.get('#view-button').click()
      cy.get('#remove-button').should('not.exist')
    })
  })
  describe.only('Order of blogs is correct', function () {
    it('Blogs are in order of likes', function() {
      cy.login({ username: 'testuser', password: 'password' })
      cy.createBlog({ title: 'Should be 3rd', author: 'Test Blogger', url: 'www.google.com', likes: 1 })
      cy.createBlog({ title: 'Should be 2nd', author: 'Test Blogger', url: 'www.google.com', likes: 2 })
      cy.createBlog({ title: 'Should be 1st', author: 'Test Blogger', url: 'www.google.com', likes: 3 })
      cy.createBlog({ title: 'Should be 4th', author: 'Test Blogger', url: 'www.google.com', likes: 0 })
      cy.visit('http://localhost:3000')

    })
  })
})
