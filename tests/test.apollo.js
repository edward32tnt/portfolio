const { ApolloClient, createHttpLink,InMemoryCache } = require("@apollo/client");
const { setContext } = require('@apollo/client/link/context')
const { gql } =  require('@apollo/client')

const getMainInfo = gql`
query MainInfos {
  mainInfos {
    id
    mainBackaground {
      ... on Image {
        id
        imageUrl {
          url
        }
      }
    }
    fullName
    currentTitle
  }
}

`
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HYGRAPH_URL,
})

const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({

  })
})

client.query({
  query: getMainInfo
}).then(data => console.log(data))
