import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../Blog'

test('renders content', () => {
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

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'A Portrait in Time: The Victorian Era'
  )
  expect(div).toHaveTextContent(
    'Lillian Montague'
  )

  expect(div).not.toHaveTextContent(
    'https://www.portraitintimevictorian.com'
  )

  expect(div).not.toHaveTextContent(
    'likes'
  )

})