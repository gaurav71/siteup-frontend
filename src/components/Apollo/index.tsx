import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { config } from '../../config/config';

const link = createHttpLink({
  uri: `${config.backendBaseUrl}graphql`,
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