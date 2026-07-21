export function getCodespaceNameFromHostname() {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.location.hostname.endsWith('-5173.app.github.dev')
    ? window.location.hostname.replace('-5173.app.github.dev', '')
    : ''
}

export const codespaceName = import.meta.env.VITE_CODESPACE_NAME || getCodespaceNameFromHostname()
const fallbackApiBaseUrl = 'http://localhost:8000/api'
const codespaceApiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : fallbackApiBaseUrl

export function buildApiUrl(component) {
  return `${codespaceApiBaseUrl}/${component}/`
}

export function extractItems(payload, collectionName) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.[collectionName])) {
    return payload[collectionName]
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.[collectionName]?.results)) {
    return payload[collectionName].results
  }

  return []
}

export async function fetchCollection(collectionName) {
  const response = await fetch(buildApiUrl(collectionName))

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return extractItems(await response.json(), collectionName)
}

export const apiBaseUrl = codespaceApiBaseUrl
export const isUsingCodespaceApi = Boolean(codespaceName)
