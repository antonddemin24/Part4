// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(blog => {
        sum = sum + blog.likes
    })
    return sum
}

const bestBlog = (blogs) => {
    let best = {
        title: '',
        author: '',
        likes: 0
    }
    blogs.forEach(blog => {
        if (blog.likes > best.likes) {
            best.title = blog.title
            best.author = blog.author
            best.likes = blog.likes
        }
    })
    return best
}

const mostBlogs = (blogs) => {
    let best = {
        author: '',
        blogs: 0
    }
    let authorLikes = blogs.reduce((op, { author }) => {
        op[author] = op[author] || 0
        op[author] += 1
        return op
    },{})
    let mostLikes = Object.keys(authorLikes).sort((a,b) => authorLikes[b] - authorLikes[a])[0]
    // eslint-disable-next-line no-constant-condition
    best.author = mostLikes ? mostLikes : ''
    // eslint-disable-next-line no-constant-condition
    best.blogs = authorLikes[mostLikes] ? authorLikes[mostLikes] : 0
    return best
}

const mostLikes = (blogs) => {
    let best = {
        author: '',
        likes: 0
    }
    let authorLikes = blogs.reduce((op, { author, likes }) => {
        op[author] = op[author] || 0
        op[author] += likes
        return op
    },{})
    let mostLikes = Object.keys(authorLikes).sort((a,b) => authorLikes[b] - authorLikes[a])[0]
    // eslint-disable-next-line no-constant-condition
    best.author = mostLikes ? mostLikes : ''
    // eslint-disable-next-line no-constant-condition
    best.likes = authorLikes[mostLikes] ? authorLikes[mostLikes] : 0
    return best
}

module.exports = {
    dummy, totalLikes, bestBlog, mostBlogs, mostLikes
}