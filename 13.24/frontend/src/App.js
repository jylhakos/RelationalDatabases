// package.json "proxy": "http://localhost:3001"

import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, 
  Route, 
  Link
} from 'react-router-dom'

import Notification from './components/Notification'

import Togglable from './components/Togglable'

import NewBlog from './components/NewBlog'

import LoginForm from './components/LoginForm'

import Blogs from './components/Blogs'

import Blog from './components/Blog'

import Users from './components/Users'

import User from './components/User'

import Authors from './components/Authors'

import storage from './utils/storage'

import { setNotification } from './reducers/notification'

import { initializeBlogs, createBlog, searchBlogs } from './reducers/blogs'

import { login, logout } from './reducers/user'

import { initializeUsers } from './reducers/users'

import { getAuthors } from './reducers/authors'

const App = () => {

  const [keyword, setKeyword] = useState('')

  const user = useSelector(state => state.user)

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {

    console.log('useEffect')

    dispatch(initializeBlogs())

    dispatch(initializeUsers())

    dispatch(getAuthors())

    const user = storage.loadUser()

    if (user) {
      dispatch(login(user))
    }
  }, [dispatch])

  const handleCreateBlog = async (blog) => {

    blogFormRef.current.toggleVisibility()

    dispatch(createBlog(blog))

    dispatch(initializeUsers())

    dispatch(getAuthors())

    dispatch(setNotification(`New blog '${blog.title}' by ${blog.author} added.`))
  }

  const handleLogout = (user) => {

    console.log('handleLogout', user)

    if (user) {

      dispatch(setNotification(`${user.name} logout`))

      setTimeout(function() { 
        dispatch(logout(user))
        storage.logoutUser()
        window.location.reload()
      }, 2000)
    }
  }

  const handleChange = (event) => {

    console.log('handleChange', event.target.value)

    setKeyword(event.target.value)
  }

  const handleSearch = (event) => {

    event.preventDefault()

    console.log('handleSearch', keyword)

    dispatch(searchBlogs(keyword))
  }

  if (!user) {
    return (
      <div>
        <h2>Login</h2>

        <Notification />

        <LoginForm />
      </div>
    )
  }

  const padding = {
    padding: 5
  }

  const paddingLeft = {
    paddingLeft: '40%'
  }

  const navStyle = {
    margin: 10,
    padding: 10,
    backgroundColor: 'lightgray'
  }

  return (
    <Router>
      <div style={navStyle}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/authors">authors</Link>
        <Link style={padding} to="/users">users</Link>
        <span style={padding}>
          {user.name} logged in <button value={user} onClick={() => { handleLogout(user); } }>logout</button>
        </span>

        <span style={paddingLeft}>
          <input type='text' value={keyword} onChange={handleChange}/><button onClick={handleSearch}>search</button>
        </span>

      </div>

      <h2>Blogs</h2>

      <Notification />

      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/authors">
          <Authors />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
            <NewBlog createBlog={handleCreateBlog} />
          </Togglable>
          <Blogs />
        </Route>
      </Switch>

    </Router>
  )
}

export default App