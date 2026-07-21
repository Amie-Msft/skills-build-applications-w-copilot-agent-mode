import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from './api.js'

const endpoint = buildApiUrl('users')

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('users')
      .then((items) => {
        if (!isMounted) return
        setUsers(items)
        setStatus('ready')
      })
      .catch((requestError) => {
        if (!isMounted) return
        setError(requestError.message)
        setStatus('error')
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="content-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Members</p>
          <h1>Users</h1>
        </div>
        <span className="count-pill">{users.length} profiles</span>
      </div>
      <p className="endpoint">{endpoint}</p>
      {status === 'loading' && <p className="status-note">Loading users...</p>}
      {status === 'error' && <p className="status-note error">{error}</p>}
      <div className="data-grid users-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id ?? user.username}>
            <h2>{user.firstName} {user.lastName}</h2>
            <p className="muted">@{user.username}</p>
            <dl>
              <div><dt>Email</dt><dd>{user.email}</dd></div>
              <div><dt>Role</dt><dd>{user.role}</dd></div>
              <div><dt>Team</dt><dd>{user.teamName}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users
