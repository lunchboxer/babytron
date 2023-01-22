import { request } from '$graphql/client.js'
import { USER } from '$graphql/users.gql'

export async function load({ fetch, params }) {
  try {
    const variables = { id: params.id }
    const response = await request(USER, variables, fetch)
    return {
      loadUser: response.user,
    }
  } catch (error) {
    return { errors: error }
  }
}
