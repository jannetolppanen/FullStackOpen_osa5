import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logoutbutton from './components/LogoutButton'
// import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

import ActionMessage from './components/ActionMessage'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [TextAndCss, setTextAndCss] = useState({
    text: '',
    css: ''
  })

  // Retrieves blogs on the first page load
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  // Checks if localStorage already has login info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  // Empties login info from localStorage and removes user
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const CreateBlogForm = ({ blogs, setBlogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
  
    const addBlog = (event) => {
      event.preventDefault()
      console.log('blogpost')
  
      const blogObject = {
        title: title,
        author: author,
        url: url
      }
  
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setTitle('')
          setAuthor('')
          setUrl('')
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

  const createNotificationMessage = (text, color, name) => {
    setTextAndCss({
      text: `${text} ${name || ''}`,
      css: color

    })
    setTimeout(() => {
      setTextAndCss({
        text: '',
        css: ''
      })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      // createNotificationMessage('Logged in user', 'green', username)
    } catch (exception) {
      console.log('wrong creds')
      createNotificationMessage('Login failed', 'red')
    }
  }

  return (
    <div>
      <ActionMessage message={TextAndCss} />
      {!user && (
      <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword} />
      )}

{user && (
  <div>
    <h2>blogs</h2>
    {<p>{user.name} logged in <Logoutbutton onLogout={handleLogout} /></p>}
    <CreateBlogForm blogs={blogs} setBlogs={setBlogs} />

    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)}

    </div>
  )
}

export default App