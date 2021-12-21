import axios from 'axios'
const baseUrl = '/api/users'

const create = async credentials => {
  console.log('sigup',credentials)
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }