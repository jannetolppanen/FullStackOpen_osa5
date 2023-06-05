const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    result = blogs.reduce((accumulator, blog) => {
      return accumulator + blog.likes
    }, 0)
  }
  return result
}

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    const mostLikedBlog = _.maxBy(blogs, 'likes')
    const { title, author, likes } = mostLikedBlog
    return { title, author, likes }
  } else {
    return 0
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length > 0) {
    const authorWithMostBlogs = _.maxBy(blogs, 'author').author
    const numberOfBlogs = _.countBy(blogs, { author: authorWithMostBlogs }).true
    return {
      author: authorWithMostBlogs,
      blogs: numberOfBlogs
    }

  } else {
    return 0
  }
}

const mostLikes = (blogs) => {
  if (blogs.length > 0) {
    const authorWithMostLikes = _.chain(blogs)
      .groupBy('author')
      .map((blogs, author) => ({ author, likes: _.sumBy(blogs, 'likes') }))
      .maxBy('likes')
      .value();
    return authorWithMostLikes
  } else {
    return 0
  }
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
