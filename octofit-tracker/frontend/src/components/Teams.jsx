import { useEffect, useState } from 'react'
import { extractItems, getCodespaceNameFromHostname } from './api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME || getCodespaceNameFromHostname()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        return response.json()
      })
      .then((payload) => {
        if (!isMounted) return
        const items = extractItems(payload, 'teams')
        setTeams(items)
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
          <p className="eyebrow">Squads</p>
          <h1>Teams</h1>
        </div>
        <span className="count-pill">{teams.length} teams</span>
      </div>
      <p className="endpoint">{endpoint}</p>
      {status === 'loading' && <p className="status-note">Loading teams...</p>}
      {status === 'error' && <p className="status-note error">{error}</p>}
      <div className="data-grid">
        {teams.map((team) => (
          <article className="data-card team-card" key={team._id ?? team.name}>
            <h2>{team.name}</h2>
            <p className="muted">Mascot: {team.mascot}</p>
            <p>{team.description}</p>
            <dl>
              <div><dt>Members</dt><dd>{team.memberUsernames?.join(', ')}</dd></div>
              <div><dt>Total points</dt><dd>{team.totalPoints}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams
