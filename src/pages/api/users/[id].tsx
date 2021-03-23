import { NextApiRequest, NextApiResponse } from 'next'

const users = (request: NextApiRequest, response: NextApiResponse) => {
  const id = request.query.id;
  console.log('id depois de user/', id)

  const users = [
    { id: 1, name: 'Diego' },
    { id: 2, name: 'Pedro' }
  ]

  return response.json(users);
}

export default users;