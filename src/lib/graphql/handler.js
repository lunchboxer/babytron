import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphql } from 'graphql'
import { database } from '$lib/data/database.js'
import { resolvers } from './resolvers/index.js'
import { permissions } from './permissions.js'
import { handleErrors } from './error-handler.js'
import typeDefs from './schema.graphql?raw'

const schema = makeExecutableSchema({ typeDefs, resolvers })

const schemaWithPermissions = applyMiddleware(
  schema,
  permissions.generate(schema),
  handleErrors,
)

export async function handler(query, variables, user) {
  const contextValue = {
    prisma: database,
    user,
  }

  const result = await graphql({
    schema: schemaWithPermissions,
    source: document,
    contextValue,
    variableValues: variables,
  })
  return result
}
