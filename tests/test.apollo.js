const {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} = require('@apollo/client');
const { setContext } = require('@apollo/client/link/context');
const { gql } = require('@apollo/client');

const createGuestBook = gql`
mutation MyMutation ($hash: String!, $content: String!, $nickname: String!){
  createGuestBook(data: {content: $content, nickname: $nickname, hash: $hash}) {
    id
    nickname
    content
  }
  publishGuestBook(where: {hash: $hash}) {
    id
  }
}
`;

const getGuestBook = gql`
query GuestBooks ($skip: Int = 0) {
  guestBooks(orderBy: publishedAt_DESC, first: 10, skip: $skip) {
    nickname
    id
    hash
    publishedAt
    content
  }
}
`
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HYGRAPH_URL
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({})
});

(async function() {
  const res = await client.query({
    query: getGuestBook,
  })
  console.log(res)
  await client.mutate({
    mutation: createGuestBook,
    variables: {
      nickname: 'test111',
      content:'test222',
      hash: 'test111test222',
    }
  })
  const res2 = await client.query({
    query: getGuestBook,
  })
  console.log(res2)
})()
