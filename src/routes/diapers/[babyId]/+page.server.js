import { database } from "$lib/data/database.js";
// SvelteKit server route to fetch data
// Fetches all diaper records and exports them to the page.
//
//
export async function load({ params }) {
  return {
    diapers: await database.diaper.findMany({
      where: {
        babyId: params.babyId,
      },
      orderBy: {
        timestamp: "desc",
      },
      include: {
        recordedBy: {
          select: {
            name: true,
          },
        },
      },
    }),
  };
}
