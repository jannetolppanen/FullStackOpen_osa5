import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  // Blog css style
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // Like button calls likefunction at App.js with unique id
  const Like = () => {
    handleLike(blog.id)
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
        likes {blog.likes} <button onClick={Like}>like</button> <br />
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