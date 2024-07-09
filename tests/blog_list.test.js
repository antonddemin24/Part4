const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')


const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('4 blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(4)
}, 100000)

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
}, 100000)

test('adding new blog', async () => {
    const newBlog = {
        title: '111',
        author: 'String',
        url: 'bgbg',
        likes: 4
    }

    const initialBlogs = await api.get('/api/blogs')

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.body.length + 1)
}, 100000)

test('if likes undefined it will be 0', async () => {
    const newBlog = {
        title: '222',
        author: 'ing',
        url: 'bgbkjhkjg'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[response.body.length - 1].likes).toBe(0)
}, 100000)

test('title or url properties are missing', async () => {
    const newBlog = {
        author: 'ing',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
}, 100000)

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogAtStart = await api.get('/api/blogs')
        const blogToDelete = blogAtStart.body[0]
        console.log(blogToDelete)

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await api.get('/api/blogs')

        expect(blogsAtEnd.body).toHaveLength(
            blogAtStart.body.length - 1
        )

        const contents = blogsAtEnd.body.map(r => r.id)

        expect(contents).not.toContain(blogToDelete.id)
    })
})

describe('updating blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogAtStart = await api.get('/api/blogs')
        const blogToUpdate = blogAtStart.body[0]
        const blog = {
            id: blogToUpdate.id,
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: blogToUpdate.likes + 2,
        }

        await api
            .put(`/api/blogs/${blog.id}`, blog)
            .send(blog)
            .expect(204)

        const blogsAtEnd = await api.get('/api/blogs')
        const blogUpdated = blogsAtEnd.body[0]
        console.log(blog)

        expect(blogUpdated.likes).toBe(blogToUpdate.likes + 2)
    })
}, 100000)

describe('invalid users are not created', () => {
    test('succeeds with valid user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    test('unsucceeds with invalid user', async () => {
        const newUser = {
            username: 'ml',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
}, 100000)

afterAll(async () => {
    await mongoose.connection.close()
})