import { json, error } from '@sveltejs/kit'
import { database } from '$lib/data/database.js'
import { dev } from '$app/environment'
import { scryptSync, randomBytes } from 'node:crypto'
import { createSigner } from 'fast-jwt'
import 'dotenv/config'

const sign = createSigner({ key: process.env.JWT_SECRET })

const tokenExpiresIn = 30 // days

const encryptPassword = (password, salt) => {
  return scryptSync(password, salt, 32).toString('hex')
}
const hashPassword = (password) => {
  const salt = randomBytes(16).toString('hex')
  return encryptPassword(password, salt) + salt
}

// the graphql server validates this, but this isn't the graphql server
function isValidEmail(email) {
  // Real validation sends a verification email. Just do a basic format check
  const mailFormatRegex = /^\S+@\S+\.\S+$/
  return email.match(mailFormatRegex)
}

// only used for creating initial admin user
/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async ({ request, locals }) => {
  const users = await database.user.findFirst()
  if (users) {
    throw error(400, 'Initial user already exists')
  }
  const { username, name, email, password } = await request.json()
  if (email && !isValidEmail(email)) {
    throw error(400, 'email address not valid')
  }
  if (!username || !password) {
    throw error(400, 'A required argument is missing.')
  }
  const usernameTaken = await database.user.findFirst({
    where: { username },
  })
  if (usernameTaken) throw error(400, 'Username already exists')
  const hashedPassword = hashPassword(password)
  const user = await database.user.create({
    data: {
      username,
      name,
      email,
      password: hashedPassword,
      isAdmin: true,
    },
  })
  const token = sign({ userId: user.id })
  delete user.password
  const secure = dev ? '' : ' Secure;'
  return json(
    { user },
    {
      headers: {
        'set-cookie': [
          `token=${token}; Max-Age=${
            tokenExpiresIn * 24 * 60 * 60
          }; Path=/; ${secure} HttpOnly`,
        ],
      },
    },
  )
}
