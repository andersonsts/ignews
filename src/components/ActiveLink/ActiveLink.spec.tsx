import { render, screen } from '@testing-library/react'

import { ActiveLink } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    const { debug } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
  
    debug()
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
  })
  
  it('adds active class if the link is currently active', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(screen.getByRole('link', { name: /home/i })).toHaveClass('active')
  })
})
