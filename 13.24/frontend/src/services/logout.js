import axios from 'axios'

const baseUrl = '/api/logout'

const logout = async (user) => {

  console.log('logout', user)

  const response = await axios.delete(baseUrl, {
    headers: {
      Authorization: user.token
    },
    data: user
  })

  console.log('logout', response.data)

  return response.data
}

export default { logout }