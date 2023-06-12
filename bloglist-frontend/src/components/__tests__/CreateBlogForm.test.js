import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import CreateBlogForm from '../CreateBlogForm'

test.only('calls addBlog with corrent data', async () => {
  const blog = {
    title: 'A Portrait in Time: The Victorian Era',
    author: 'Lillian Montague',
    url: 'https://www.portraitintimevictorian.com',
    likes: 16,
    user: {
      username: 'New superadmin',
      name: 'Superadmin',
      id: '647386ec0d35be92ea9826d5',
    },
    id: '647449c8ed3c11e11f1ca9ed',
  }
  const addBlogMock = jest.fn()
  const handleCreateNewBlogMock = jest.fn()
  render(<CreateBlogForm addBlog={addBlogMock} handleCreateNewBlog={handleCreateNewBlogMock} />)

  const titleInput = screen.getByTestId('titleInput')
  const authorInput = screen.getByTestId('authorInput')
  const urlInput = screen.getByTestId('urlInput')
  const submitButton = screen.getByTestId('submitButton')

  fireEvent.change(titleInput, { target: { value: blog.title } })
  fireEvent.change(authorInput, { target: { value: blog.author } })
  fireEvent.change(urlInput, { target: { value: blog.url } })

  fireEvent.click(submitButton)

  expect(addBlogMock).toHaveBeenCalledWith({
    title: 'A Portrait in Time: The Victorian Era',
    author: 'Lillian Montague',
    url: 'https://www.portraitintimevictorian.com',
  })


})