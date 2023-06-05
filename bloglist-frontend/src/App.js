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

  // Reference to Togglable
  const blogFormRef = useRef()
  // Closes blog creation form when new blog is submitted using blogFormRef
  const handleCreateNewBlog = () => {
    blogFormRef.current.toggleVisibility()
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
      createNotificationMessage('Logged in user', 'green', username)
    } catch (exception) {
      createNotificationMessage('wrong username or password', 'red')
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

    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
    <CreateBlogForm handleCreateNewBlog={handleCreateNewBlog} blogs={blogs} setBlogs={setBlogs} createNotificationMessage={createNotificationMessage} />
    </Togglable>
    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)}

    </div>
  )
}

export default App