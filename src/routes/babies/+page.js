import { request } from '$graphql/client.js'
import { BABIES } from '$graphql/babies.gql'

export const load = async ({ fetch }) => {
  try {
    const response = await request(BABIES, undefined, fetch)
    return { loadBabies: response.babies }
  } catch (error) {
    return { errors: error }
  }
}
