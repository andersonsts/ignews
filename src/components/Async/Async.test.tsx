import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { Async } from '.'

test('it renders correctly', async () => {
  render(<Async />)

  expect(screen.getByText(/hello world/i)).toBeInTheDocument()
  expect(await screen.findByRole('button', { name: /button/i })).toBeInTheDocument() // 'find...' is used to components
})

test('it renders correctly [second way]', async () => {
  render(<Async />)

  expect(screen.getByText(/hello world/i)).toBeInTheDocument()
  await waitFor(() => expect(screen.getByRole('button', { name: /button/i })).toBeInTheDocument()) // 'waitFor...' is used to anything
})

test('it test if element disappeared #1', async () => {
  render(<Async />)
  
  await waitFor(() => 
    expect(screen.queryByRole('button', { name: /button/i })).not.toBeInTheDocument()
  )
})

test('it test if element disappeared #2', async () => {
  render(<Async />)

  await waitForElementToBeRemoved(screen.queryByRole('button', { name: /button/i }))
})