import { render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import { SubscribeButton } from '.'

jest.mock('next-auth/client')
jest.mock('next/router')

afterEach(() => {
  jest.clearAllMocks()
})

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null,false])

    render(<SubscribeButton />)

    expect(screen.getByRole('button', { name: /subscribe now/i })).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated.', () => {
    const useSessionMocked = mocked(useSession)
    const signInMocked = mocked(signIn)
    useSessionMocked.mockReturnValueOnce([null,false])

    render(<SubscribeButton />)

    const subscribeButton = screen.getByRole('button', { name: /subscribe now/i })

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalledWith('github')
  })

  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      { 
        user: { 
          name: 'John Doe', 
          email: 'john.doe@example.com' 
        }, 
        expires: 'fake-expires', 
        activeSubscription: true 
      },
      false
    ])
    
    useRouterMocked.mockReturnValueOnce({ push: pushMock } as any)
    render(<SubscribeButton />)
     
    const subscribeButton = screen.getByRole('button', { name: /subscribe now/i })

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(pushMock).toHaveBeenCalledWith('/posts')
  })
})
