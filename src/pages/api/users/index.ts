import { NextApiRequest, NextApiResponse } from 'next'

const users = (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'Diego' },
    { id: 2, name: 'Pedro' }
  ]

  return response.json(users);
}

export default users;

/** Formas de autenticacao */
// JWT (Storage)
// Next Auth (Social, ...)
// Cognito, Auth0 -> Providers externos

// Serverless => Toda vez que essa rota api/users é chamada, o ambiente retorna o resultado e logo após o ambiente é deletado.