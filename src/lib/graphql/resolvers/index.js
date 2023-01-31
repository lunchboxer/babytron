import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars'
import { Query } from './query.js'
import { Mutation } from './mutation/index.js'
import { User } from './user.js'
import { Baby } from './baby.js'
import { Measurement } from './measurement.js'
import { Diaper } from './diaper.js'
import { Sleep } from './sleep.js'
import { Feeding } from './feeding.js'
import { MilestoneAchievement } from './milestone-achievement.js'

export const resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  Mutation,
  Query,
  User,
  Baby,
  Measurement,
  Diaper,
  Sleep,
  Feeding,
  MilestoneAchievement,
}
