import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../Blog'

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

test('renders content title, author but not url', () => {
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('A Portrait in Time: The Victorian Era')
  expect(div).toHaveTextContent('Lillian Montague')

  expect(div).not.toHaveTextContent('https://www.portraitintimevictorian.com')

  expect(div).not.toHaveTextContent('likes')
})

test('clicking view button shows url, likes and user', async () => {
  const { container } = render(<Blog blog={blog} />)
  const testuser = userEvent.setup()
  const button = screen.getByText('view')
  await testuser.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('likes')
  expect(div).toHaveTextContent('Superadmin')
  expect(div).toHaveTextContent('https://www.portraitintimevictorian.com')
})

// test.only('how many times view gets pressed', async () => {
//   render(<Blog blog={blog} />)
//   const user = userEvent.setup()
//   const button = screen.getByText('view')

// })

test.only('if the Like button is clicked twice, the event handler is also called twice', () => {
  const mockHandler = jest.fn()
  render(<Blog blog={blog} addLike={mockHandler} />)
  const viewButton = screen.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = screen.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})