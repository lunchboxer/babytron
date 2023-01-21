import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars'
import { Query } from './query.js'
import { Mutation } from './mutation/index.js'

export const resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  Mutation,
  Query,
}
