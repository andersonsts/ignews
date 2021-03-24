import { NextApiRequest, NextApiResponse } from 'next'

const users = (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'Diego' },
    { id: 2, name: 'Pedro' }
  ]

  return response.json(users);
}

export default users;

/** Ways of auth */
// JWT (Storage)
// Next Auth (Social, ...)
// Cognito, Auth0 -> Others Providers