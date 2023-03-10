import createAxios from './createAxios'

const configEnv = import.meta.env

export const axiosTest = createAxios(
  {
    baseURL: `${configEnv.VITE_BASE_URL}`
  },
  true,
  true
)
