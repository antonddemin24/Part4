const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    // const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author || null,
        url: body.url,
        likes: body.likes || 0,
        user: user.id,
    })

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } catch(exception) {
        next(exception)
        response.status(400).end()
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    // try {
    //     await Blog.findByIdAndRemove(request.params.id)
    //     response.status(204).end()
    // } catch (exception) {
    //     next(exception)
    // }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = request.user
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).json({ error: 'Blog not found' })
    }

    // const userId = decodedToken.id.toString()

    if (blog.user.toString() !== user.id) {
        return response.status(401).json({ error: 'Unauthorized access' })
    }

    // Delete the blog
    // await Blog.findByIdAndRemove(request.params.id)

    // response.status(204).end()
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter