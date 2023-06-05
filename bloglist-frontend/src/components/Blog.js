import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    console.log("liked")
  }

  const handleView = () => {
    setVisible(!visible)
  }

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