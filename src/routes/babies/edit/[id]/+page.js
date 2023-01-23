import { request } from '$graphql/client.js'
import { BABY } from '$graphql/babies.gql'

export const load = async ({ params, fetch }) => {
  try {
    const response = await request(BABY, { id: params.id }, fetch)
    return { loadBaby: response.baby }
  } catch (error) {
    return { errors: error }
  }
}
