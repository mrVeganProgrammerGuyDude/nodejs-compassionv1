const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'poo head',
    email: 'shit@balls.com',
    password: '23PoosInMyHead!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
   await User.deleteMany()
   await new User(userOne).save()
})


test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Sheldon',
        email: 'sheldon@example.com',
        password: 'MyPass777!'
    }).expect(201)
})

test('should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('should not login this non existant user', async () => {
    await request(app).post('/users/login').send({
        email: 'doesntExist@gmail.com',
        password: 'randoPassword'
    }).expect(400)
})

test('should not login this user cause they put in the wrong password', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'wrongAssPass'
    }).expect(400)
})

test('should GET USER PROFILE for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    })
