import React, { useState } from 'react'

const CreateBlogForm = ({ handleCreateNewBlog, addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlog = (event) => {
    event.preventDefault()
    handleCreateNewBlog()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    addBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <form onSubmit={newBlog}>
        <div>
          <h2>create new</h2>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            data-testid="titleInput"
            id='title-input'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            data-testid='authorInput'
            id='author-input'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url:
          <input
            type='text'
            value={url}
            name='Url'
            data-testid='urlInput'
            id='url-input'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type='submit' data-testid='submitButton' id='submit-button'>
          create
        </button>
      </form>
    </>
  )
}

export default CreateBlogForm
