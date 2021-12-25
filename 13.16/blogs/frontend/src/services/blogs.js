import axios from 'axios'

import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {

  const request = axios.get(baseUrl)

  console.log('getAll', request)

  return request.then(response => response.data)
}

const create = (blog) => {

  const request = axios.post(baseUrl, blog, getConfig())

  console.log('create', request)

  return request.then(response => response.data)
}

const update = (blog) => {

  const request = axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())

  console.log('update', request)

  return request.then(response => response.data)
}

const comment = (id, comment) => {

  const request = axios.post(`${baseUrl}/${id}/comments`, { comment }, getConfig())
  
  console.log('comment', request)

  return request.then(response => response.data)
}

const remove = (id) => {

  const request = axios.delete(`${baseUrl}/${id}`, getConfig())

  console.log('remove', request)

  return request.then(response => response.data)
}

const search = (keyword) => {

  console.log('search', keyword)

  const request = axios.get(baseUrl, { params: { search: keyword } } )

  return request.then(response => response.data)
}

export default { getAll, create, update, remove, comment, search }