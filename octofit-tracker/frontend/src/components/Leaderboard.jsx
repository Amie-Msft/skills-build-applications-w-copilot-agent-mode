import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from './api.js'

const endpoint = buildApiUrl('leaderboard')

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('leaderboard')
      .then((items) => {
        if (!isMounted) return
        setLeaderboard(items)
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
          <p className="eyebrow">Competition</p>
          <h1>Leaderboard</h1>
        </div>
        <span className="count-pill">{leaderboard.length} ranked</span>
      </div>
      <p className="endpoint">{endpoint}</p>
      {status === 'loading' && <p className="status-note">Loading leaderboard...</p>}
      {status === 'error' && <p className="status-note error">{error}</p>}
      <div className="leader-list">
        {leaderboard.map((entry) => (
          <article className="leader-row" key={entry._id ?? entry.username}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h2>{entry.username}</h2>
              <p className="muted">{entry.teamName}</p>
            </div>
            <strong>{entry.totalPoints} pts</strong>
            <span>{entry.weeklyPoints} this week</span>
            <span>{entry.workoutsCompleted} workouts</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard
