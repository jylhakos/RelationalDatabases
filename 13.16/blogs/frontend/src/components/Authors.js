import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'

import { getAuthors } from '../reducers/authors'

const Authors = () => {

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getAuthors())

  }, [])

  const authors = useSelector(state => state.authors)

  console.log('Authors', authors)

  return (
    <table>
      <thead>
        <tr>
          <th>
          Author
          </th>
          <th>
           Articles
          </th>
          <th>
           Likes
          </th>
        </tr>
      </thead>
      <tbody>
        {authors.map(author =>
          <tr key={author.author}>
            <td>
              {author.author}
            </td>
            <td>
              {author.articles}
            </td>
            <td>
              {author.likes}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Authors