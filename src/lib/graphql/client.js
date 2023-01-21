import { environment } from '$lib/environment'

function removeEmptyStrings(variables) {
  if (!variables) return
  for (const key of Object.keys(variables)) {
    if (typeof variables[key] === 'object') removeEmptyStrings(variables[key])
    if (variables[key] === '') {
      variables[key] = undefined
    }
  }
  return variables
}

export const request = async (query, variables, fetchFun) => {
  const fetchFunction = fetchFun || fetch
  const body =
    typeof query === 'function'
      ? query(variables)
      : JSON.stringify({ query, variables: removeEmptyStrings(variables) })
  const coldAuth =
    typeof localStorage !== 'undefined' && localStorage.getItem('token')
  const token = coldAuth ? JSON.parse(coldAuth) : undefined
  const response = await fetchFunction(environment.endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: token || '',
    },
    body,
  })
  const result = response && (await response.json())
  if (response && response.ok && !result.errors && result.data) {
    return result.data
  } else {
    throw result.errors
  }
}
