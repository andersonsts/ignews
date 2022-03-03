import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'

import { Header } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('next-auth/client', () => {
  return {
    useSession: jest.fn().mockReturnValue([null, false])
  }
})

describe('Header component', () => {
  it('renders correctly', () => {
    render(<Header />)
  
    expect(useSession).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /posts/i })).toBeInTheDocument()
  })
})
