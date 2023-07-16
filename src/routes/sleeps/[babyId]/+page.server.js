import { database } from '$lib/data/database.js'
// SvelteKit server route to fetch data
// Fetches all diaper records and exports them to the page.
//
//
export async function load({ params }) {
  return {
    sleeps: await database.sleep.findMany({
      where: {
        babyId: params.babyId,
      },
      orderBy: {
        start: 'desc',
      },
      include: {
        recordedBy: {
          select: {
            name: true,
          },
        },
      },
    }),
  }
}
