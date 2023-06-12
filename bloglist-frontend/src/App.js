import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logoutbutton from './components/LogoutButton'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
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
    css: '',
  })

  // Retrieves blogs on the first page load
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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

  // Reference to Togglable
  const blogFormRef = useRef()
  // Closes blog creation form when new blog is submitted using blogFormRef
  const handleCreateNewBlog = () => {
    blogFormRef.current.toggleVisibility()
  }

  // Creates config for notification messages
  const createNotificationMessage = (text, color, name) => {
    setTextAndCss({
      text: `${text} ${name || ''}`,
      css: color,
    })
    setTimeout(() => {
      setTextAndCss({
        text: '',
        css: '',
      })
    }, 5000)
  }

  // Login handler
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      createNotificationMessage('Logged in user', 'green', username)
    } catch (exception) {
      createNotificationMessage('wrong username or password', 'red')
    }
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
        createNotificationMessage('Blog was already removed from the server', 'red')
        setBlogs(blogs.filter(b => b.id !== id))
      })
  }

  // Adds new blogs
  const addBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      createNotificationMessage(`blogpost ${blogObject.title} by ${blogObject.author} added`, 'green')

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        createNotificationMessage('Error: Bad Request', 'red')
      }
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
          setPassword={setPassword}
        />
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          {
            <p>
              {user.name} logged in <Logoutbutton onLogout={handleLogout} />
            </p>
          }

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <CreateBlogForm
              handleCreateNewBlog={handleCreateNewBlog}
              blogs={blogs}
              setBlogs={setBlogs}
              createNotificationMessage={createNotificationMessage}
              addBlog={addBlog}
            />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                blogs={blogs}
                setBlogs={setBlogs}
                user={user}
                addLike={addLike}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
