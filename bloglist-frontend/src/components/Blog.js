import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, createNotificationMessage, user }) => {
  const [visible, setVisible] = useState(false)

  // Blog css style
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: '#f0f0f5'
  }

  const removeButtonStyle = {
    backgroundColor: 'red'
  }

  // Handles like button clicks
  const handleLike = () => {
    addLike(blog.id)
  }

  // Add like to blogpost with certain id
  const addLike = id => {
    const blogObject = blogs.find(b => b.id === id)
    const changedBlog = { ...blogObject, likes: blogObject.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(() => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))
      })
      .catch(() => {
        createNotificationMessage(`Blog '${blog.title}' was already removed from the server`, 'red')
        setBlogs(blogs.filter(b => b.id !== id))
      })
  }

  // returns true if blogpost belongs to logged in user
  const isBlogPostOwner = () => {
    return blog.user.username === user.username
  }

  // Handles remove button clicks
  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlogPost(blog.id)
    }
  }

  // Removes blogpost
  const removeBlogPost = id => {
    blogService
      .remove(id, user.token)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
  }

  // Toggle fullinfo visibility
  const handleView = () => {
    setVisible(!visible)
  }

  // Shows more info about the blog
  const fullInfo = () => {
    return (
      <>
        {blog.url}<br />
        likes {blog.likes} <button onClick={handleLike}>like</button> <br />
        {blog.user.name}<br />
        {isBlogPostOwner() && <button style={removeButtonStyle} onClick={handleRemove}>remove</button>}
      </>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={handleView}>view</button> <br />
      {visible && fullInfo()}
    </div>
  )
}

export default Blog