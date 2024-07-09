const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithManyBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const emptyList = [

    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has many blogs, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        expect(result).toBe(15)
    })

    test('empty list is zero', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })
})

describe('best blog', () => {
    const listWithOneBlog =[
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
    ]

    const listWithManyBlogs = [
        {
            title: 'bla',
            author: 'blabla',
            likes: 2,
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        },
        {
            title: 'ha',
            author: 'haha',
            likes: 3,
        }
    ]

    const emptyList = [

    ]

    const forEmptyList = {
        title: '',
        author: '',
        likes: 0
    }

    const forManyList =
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }

    test('when list has only one blog', () => {
        const result = listHelper.bestBlog(listWithOneBlog)
        expect(result).toEqual(forManyList)
    })

    test('best of three blogs', () => {
        const result = listHelper.bestBlog(listWithManyBlogs)
        expect(result).toEqual(forManyList)
    })

    test('empty list is zero', () => {
        const result = listHelper.bestBlog(emptyList)
        expect(result).toEqual(forEmptyList)
    })
})

describe('best author', () => {
    const listWithOneBlog =[
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
    ]

    const listWithManyBlogs = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        },
        {
            title: 'bla',
            author: 'blabla',
            likes: 2,
        },
        {
            title: 'ha',
            author: 'haha',
            likes: 4,
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        },
        {
            title: 'ha',
            author: 'haha',
            likes: 3,
        },
        {
            title: 'ha',
            author: 'haha',
            likes: 3,
        }
    ]

    const emptyList = [

    ]

    const forEmptyList = {
        author: '',
        blogs: 0
    }

    const forManyList = {
        author: 'haha',
        blogs: 3
    }
    const forOneList = {
        author: 'Edsger W. Dijkstra',
        blogs: 1,
    }

    test('when list has only one blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual(forOneList)
    })

    test('best of three authors', () => {
        const result = listHelper.mostBlogs(listWithManyBlogs)
        expect(result).toEqual(forManyList)
    })

    test('empty list is zero', () => {
        const result = listHelper.mostBlogs(emptyList)
        expect(result).toEqual(forEmptyList)
    })
})

describe('most likes author', () => {
    const listWithOneBlog =[
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
    ]

    const listWithManyBlogs = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        },
        {
            title: 'bla',
            author: 'blabla',
            likes: 2,
        },
        {
            title: 'ha',
            author: 'haha',
            likes: 5,
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        },
        {
            title: 'ha',
            author: 'haha',
            likes: 3,
        },
        {
            title: 'ha',
            author: 'haha',
            likes: 3,
        }
    ]

    const emptyList = [

    ]

    const forEmptyList = {
        author: '',
        likes: 0
    }

    const forManyList = {
        author: 'haha',
        likes: 11
    }
    const forOneList = {
        author: 'Edsger W. Dijkstra',
        likes: 5
    }

    test('when list has only one blog', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual(forOneList)
    })

    test('best of three authors', () => {
        const result = listHelper.mostLikes(listWithManyBlogs)
        expect(result).toEqual(forManyList)
    })

    test('empty list is zero', () => {
        const result = listHelper.mostLikes(emptyList)
        expect(result).toEqual(forEmptyList)
    })
})