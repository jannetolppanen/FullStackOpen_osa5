import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong creds')
      // setErrorMessage('wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  }

  return (
    <div>
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
    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)}
    </div>
  )
}

export default App