const chooseEndpoint = () => {
  const development = import.meta.env.DEV
  const endpoint = development
    ? import.meta.env.VITE_DEV_ENDPOINT
    : import.meta.env.VITE_PRODUCTION_ENDPOINT
  return endpoint
}
export const environment = {
  endpoint: chooseEndpoint(),
}
