const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const logger = require('../utils/logger')

const initialUsers = [
  {
    "username": "testuser1",
    "name": "Test User 1",
    "password": "P@ssw0rd123"
  }
  ,
  {
    "username": "testuser2",
    "name": "Test User 2",
    "password": "Testing123!"
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()
  userObject = new User(initialUsers[1])
  await userObject.save()
})

describe('Creating users', () => {

  test('2 initial users are created', async () => {
    const response = await api
      .get('/api/users')

    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('Duplicate users cant be created', async () => {

    const duplicateUser = {
      "username": "testuser1",
      "name": "New name",
      "password": "d123"
    }

    const response = await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)

      expect(response.body.error).toEqual(expect.stringContaining('User validation failed: username: Error'))

    const getResponse = await api
      .get('/api/users')

    expect(getResponse.body).toHaveLength(initialUsers.length)
  })

  test('Password must be atleast 3 characters', async () => {

    const newUserShortPassword = {
      "username": "testuser5",
      "name": "Test user5",
      "password": "qw"
    }

    const createShortPassword = await api
      .post('/api/users')
      .send(newUserShortPassword)
      .expect(400)

    expect(createShortPassword.body.error).toEqual("Password needs to be atleast 3 characters")

    const getResponse = await api
      .get('/api/users')
    expect(getResponse.body.length).toBe(initialUsers.length)
  })

  test('Username must be atleast 3 characters', async () => {

    const newUserShortUsername = {
      "username": "te",
      "name": "Test user4",
      "password": "qwerty"
    }
    const createShortName = await api
      .post('/api/users')
      .send(newUserShortUsername)
      .expect(400)

    expect(createShortName.body.error).toEqual("Username needs to be atleast 3 characters")

    const getResponse = await api
      .get('/api/users')
    expect(getResponse.body.length).toBe(initialUsers.length)
  })

  test('A new user can be created', async () => {
    const newUser = {
      "username": "testuser3",
      "name": "Test user3",
      "password": "qwerty"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const getResponse = await api
      .get('/api/users')
    expect(getResponse.body.length).toBe(initialUsers.length + 1)
  })



})

afterAll(async () => {
  await mongoose.connection.close()
})