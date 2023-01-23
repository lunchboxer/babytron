import { shield, rule, or } from 'graphql-shield'

const isAuthenticated = rule()(async (_, parameters, context) => {
  return !!context.user || new Error('Only authenticated users may access')
})
const isAdmin = rule()(async (root, parameters, { user }) => {
  return user.isAdmin || new Error('Must be admin to access')
})
const isThisUser = rule()(async (root, parameters, context) => {
  return (
    context.user?.id === parameters.id ||
    new Error('Only the same user may access this data.')
  )
})

export const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
      users: isAdmin,
      user: isAdmin,
    },
    Mutation: {
      createUser: isAdmin,
      deleteUser: isAdmin,
      updateUser: or(isThisUser, isAdmin),
      changePassword: or(isThisUser, isAdmin),
      createBaby: isAuthenticated,
      updateBaby: isAuthenticated,
      deleteBaby: isAuthenticated,
    },
  },
  {
    allowExternalErrors: true,
  },
)
