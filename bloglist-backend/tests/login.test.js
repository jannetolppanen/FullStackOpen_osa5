const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const logger = require('../utils/logger')

const initialUser = {
  "username": "test",
  "name": "tim tester",
  "password": "salasana"
}

beforeEach(async () => {
  await User.deleteMany({})
})

describe('Login', () => {

  test('Login with the test user', async () => {
    const createUser = await api
      .post('/api/users')
      .send(initialUser)

    const login = await api
      .post('/api/login')
      .send({
        "username": initialUser.username,
        "password": initialUser.password
      })
      .expect(200)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})