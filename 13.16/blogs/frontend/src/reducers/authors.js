import authorsService from '../services/authors'

const reducer = (state = [], action) => {

  switch (action.type) {

  case 'GET_AUTHORS':
    return action.data

  default:
    return state
  }
}

export const getAuthors = () => {

  return async dispatch => {

    const data = await authorsService.getAuthors()

    console.log('getAuthors', data)

    dispatch({
      type: 'GET_AUTHORS',
      data
    })
  }
}

export default reducer