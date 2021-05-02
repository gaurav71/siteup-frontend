import React from 'react'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { config } from '../../config/config'
import { getMainDefinition } from '@apollo/client/utilities'
import { cache, cacheUpdator } from './cache'

const httpLink = createHttpLink({
  uri: `${config.backendBaseUrl}graphql/`,
  credentials: 'include',
})

const wsLink = new WebSocketLink({
  uri: config.webSocketUrl,
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache,
})

const Provider: React.FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default Provider

export { client, cacheUpdator }
