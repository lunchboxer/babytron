import { request } from '$graphql/client.js'
import { USER } from '$graphql/users.gql'

export const load = async ({ params, fetch }) => {
  try {
    const response = await request(USER, { id: params.id }, fetch)
    return { loadUser: response.user }
  } catch (error) {
    return { errors: error }
  }
}
