import React from 'react'

import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { initializeUsers } from '../reducers/users'

const Blogs = () => {

  const dispatch = useDispatch()

  dispatch(initializeUsers())

  const blogs = useSelector(state => state.blogs).sort((b1, b2) => b2.likes - b1.likes)

  console.log('Blogs', blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.user['name']}
          </Link>
        </div>
      )}
    </div>

  )
}

export default Blogs