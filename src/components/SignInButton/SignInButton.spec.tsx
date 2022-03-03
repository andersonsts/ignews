import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/client'

import { SignInButton } from '.'

jest.mock('next-auth/client')

afterEach(() => {
  jest.clearAllMocks()
})

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SignInButton />)

    expect(useSession).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: /sign in with github/i })).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([
      { user: { name: 'John Doe', email: 'john.doe@example.com' }, expires: 'fake-expires', activeSubscription: true }
      ,
      false])

    render(<SignInButton />)
  
    expect(useSession).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: /john doe/i })).toBeInTheDocument()
  })
})
