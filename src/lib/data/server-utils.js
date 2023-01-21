import { dev } from '$app/environment'
import { database } from '$lib/data/database.js'
import { createVerifier } from 'fast-jwt'

import 'dotenv/config'

const verify = createVerifier({ key: process.env.JWT_SECRET })

export const getUserFromCookies = async (cookies) => {
  if (!cookies.token) return
  try {
    const verifiedToken = verify(cookies.token)
    const userId = verifiedToken && verifiedToken.userId
    if (!userId) return
    // get the authenticated user from the db
    const user = await database.user.findUnique({ where: { id: userId } })
    if (!user) return
    delete user.password
    return user
  } catch (error) {
    dev && console.error('getUserFromCookies error', error)
  }
}
