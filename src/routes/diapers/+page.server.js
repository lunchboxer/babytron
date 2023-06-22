// SvelteKit server route to fetch data
// Fetches all diaper records and exports them to the page.
//
/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    diapers: await prisma.diapers.findMany()
  };
}

