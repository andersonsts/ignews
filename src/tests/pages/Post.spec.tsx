import { render, screen } from "@testing-library/react";
import { mocked } from 'jest-mock'

import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { getPrismicClient } from '../../services/prismic'
import { getSession } from "next-auth/client";

const post = {
  slug: 'post',
  title: 'My new post',
  content: '<p>Post excerpt</p>',
  updatedAt: '10 de Abril'
}

jest.mock('next-auth/client')
jest.mock('../../services/prismic')

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />)
    
    expect(screen.getByText('My new post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
  })

  it('redirects user if no subscriptions is found', async () => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    } as any)

    const response = await getServerSideProps({ params: { slug: 'my-new-post' } } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/'
        })
      })
    )
  })

  it('load initial data', async () => {
    const getSessionMocked = mocked(getSession)
    const getPrimicClientMocked = mocked(getPrismicClient)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any)

    getPrimicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My new post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post content' }
          ],
        },
        last_publication_date: '04-01-2021'
      })
    } as any)

    const response = await getServerSideProps({ params: { slug: 'my-new-post' } } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    )
  })
})