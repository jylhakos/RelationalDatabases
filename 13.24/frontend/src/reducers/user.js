import logoutService from '../services/logout'

const reducer = (state = null, action) => {

  switch (action.type) {

  case 'LOGIN':
    return action.payload

  case 'LOGOUT':
    return action.payload
    //return null

  default:
    return state
  }

}

export const login = (user) => (
  {
    type: 'LOGIN',
    payload: user
  }
)

export const logout = (user) => {

  console.log('logout', user)

  return async dispatch => {

    const response = await logoutService.logout(user)

    dispatch({
      type: 'LOGOUT',
      payload: response 
    })
  }
}

export default reducer