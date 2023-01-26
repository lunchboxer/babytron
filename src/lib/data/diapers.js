import { writable } from 'svelte/store'
import { request } from '$graphql/client.js'
import { CREATE_DIAPER } from '$graphql/diapers.gql'

function createDiapersStore() {
  const { subscribe, set } = writable([])
  return {
    subscribe,
    set,
    // Create //
    create: async (diaper) =>
      await request(CREATE_DIAPER, {
        input: { ...diaper },
      }),
    // Remove //
    remove: async (id) => {
      // await request(DELETE_BABY, { id })
      // update((existing) => existing.filter((b) => b.id !== id))
    },
  }
}

export const diapers = createDiapersStore()
