import { useEffect, useState } from 'react'
import { extractItems, getCodespaceNameFromHostname } from './api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME || getCodespaceNameFromHostname()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
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
        const items = extractItems(payload, 'workouts')
        setWorkouts(items)
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
          <p className="eyebrow">Recommendations</p>
          <h1>Workouts</h1>
        </div>
        <span className="count-pill">{workouts.length} plans</span>
      </div>
      <p className="endpoint">{endpoint}</p>
      {status === 'loading' && <p className="status-note">Loading workouts...</p>}
      {status === 'error' && <p className="status-note error">{error}</p>}
      <div className="data-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id ?? workout.title}>
            <h2>{workout.title}</h2>
            <p className="muted">{workout.focus} / {workout.difficulty}</p>
            <dl>
              <div><dt>Duration</dt><dd>{workout.durationMinutes} minutes</dd></div>
              <div><dt>Suggested for</dt><dd>{workout.suggestedFor?.join(', ')}</dd></div>
            </dl>
            <ul className="exercise-list">
              {workout.exercises?.map((exercise) => (
                <li key={exercise}>{exercise}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts
