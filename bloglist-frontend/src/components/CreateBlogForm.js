import React, { useState } from "react"
import blogService from '../services/blogs'

const CreateBlogForm = ({ blogs, setBlogs, createNotificationMessage, handleCreateNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreateNewBlog()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    createNotificationMessage(`blogpost ${blogObject.title} by ${blogObject.author} added`, 'green')
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

      })
    
  }

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          <h2>create new</h2>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>

    </>
  )
}

export default CreateBlogForm