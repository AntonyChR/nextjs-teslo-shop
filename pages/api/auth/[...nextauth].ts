import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [

    // ...add more providers here
    Credentials({
        name: 'Custom Login',
        credentials: {
            email:{label: 'Email', type: 'email', placeholder:'Email'},
            password:{label: 'Password', type: 'password', placeholder:'Password'}
        },
        async authorize(credentials){
            console.log(credentials)
            return {name:'juan', email:'email@email.com', role:'admin'}
        }
    }),

    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
  ],
})