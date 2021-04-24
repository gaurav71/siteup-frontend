import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: 'http://localhost:9000/graphql',
  credentials: 'include'
})

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

const Provider: React.FC = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)

export default Provider