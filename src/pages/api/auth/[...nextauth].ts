import NextAuth from 'next-auth';
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
  ]
})

// FaunaDB ou DynamoDB -> As operações nesse DB não precisam de uma conexão ativa para realizar tal operação. Postgress e mongoDB por exemplo, 
// tem um custo maior para realizar tal conexão enquanto o FaunaDB nao tem. 
