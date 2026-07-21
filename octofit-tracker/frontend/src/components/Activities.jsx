import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from './api.js'

const endpoint = buildApiUrl('activities')

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('activities')
      .then((items) => {
        if (!isMounted) return
        setActivities(items)
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
          <p className="eyebrow">Training log</p>
          <h1>Activities</h1>
        </div>
        <span className="count-pill">{activities.length} entries</span>
      </div>
      <p className="endpoint">{endpoint}</p>
      {status === 'loading' && <p className="status-note">Loading activities...</p>}
      {status === 'error' && <p className="status-note error">{error}</p>}
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Athlete</th>
              <th>Activity</th>
              <th>Duration</th>
              <th>Distance</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.username}-${activity.activityDate}`}>
                <td>{activity.username}</td>
                <td>{activity.activityType}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.distanceMiles ? `${activity.distanceMiles} mi` : 'N/A'}</td>
                <td>{activity.caloriesBurned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities
