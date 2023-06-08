import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../Blog'
import blogService from '../../services/blogs'

test('blog renders title and author but not url or likes', () => {
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

  render(<Blog />)
  screen.debug()
})
