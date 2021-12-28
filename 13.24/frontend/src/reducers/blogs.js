import blogService from '../services/blogs'

const reducer = (state = [], action) => {

  console.log('reducer', action.type)
  
  switch (action.type) {

  case 'INIT':
    return action.data

  case 'LIKE': {
    const liked = action.data
    return state.map(b => b.id===liked.id ? liked : b)
  }

  case 'COMMENT': {
    const commented = action.data
    return state.map(b => b.id===commented.id ? commented : b)
  }

  case 'DELETE': {
    return state.filter(b => b.id !== action.id)
  }

  case 'CREATE':
    return [...state, action.data]

  case 'SEARCH': {
    return action.data
  }

  default:
    return state
  }
}

export const createBlog = (content) => {

  return async dispatch => {

    const data = await blogService.create(content)

    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const removeBlog = (id) => {

  return async dispatch => {

    await blogService.remove(id)

    dispatch({
      type: 'DELETE',
      id
    })
  }
}

export const initializeBlogs = () => {

  return async dispatch => {

    const data = await blogService.getAll()

    console.log('initializeBlogs', JSON.stringify(data))

    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const likeBlog = (blog) => {

  return async dispatch => {

    const toLike = { ...blog, likes: blog.likes + 1 }

    const data = await blogService.update(toLike)

    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const commentBlog = (id, comment) => {

  return async dispatch => {

    const data = await blogService.comment(id, comment)

    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const searchBlogs = (keyword)  => {

  return async dispatch => {

    const data = await blogService.search(keyword)

    dispatch({
      type: 'SEARCH',
      data
    })
  }
}

export default reducer