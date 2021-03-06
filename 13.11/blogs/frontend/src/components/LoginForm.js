import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { login } from '../reducers/user'

import loginService from '../services/login'

import { setNotification } from '../reducers/notification'

import storage from '../utils/storage'

const LoginForm = () => {

  const [username, setUsername] = useState('fullstack')

  const [password, setPassword] = useState('fullstack')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {

    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')

      setPassword('')

      dispatch(login(user))

      dispatch(setNotification(`${user.name} welcome back!`))

      storage.saveUser(user)

    } catch(exception) {

      dispatch(setNotification('Error username or password', 'error'))
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            id='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login'>login</button>
      </form>
    </div>
  )
}

export default LoginForm