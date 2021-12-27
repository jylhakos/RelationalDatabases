import axios from 'axios'

const baseUrl = '/api/authors'

const getAuthors = () => {

  const request = axios.get(baseUrl)

  console.log('getAuthors', request)

  return request.then(response => response.data)
}

export default { getAuthors }