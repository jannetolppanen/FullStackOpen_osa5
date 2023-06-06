import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, createNotificationMessage }) => {
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

  // Like button calls likefunction at App.js with unique id
  const handleLike = () => {
    addLike(blog.id)
  }

  const addLike = id => {
    const blogObject = blogs.find(b => b.id === id)
    const changedBlog = { ...blogObject, likes: blogObject.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))
      })
      .catch(() => {
        createNotificationMessage(`Blog '${blog.title}' was already removed from the server`, 'red')
        setBlogs(blogs.filter(b => b.id !== id))
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
        {blog.user.name}
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