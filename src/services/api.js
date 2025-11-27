const BASE_URL = 'http://localhost:3000'

export async function getLessons() {
  const response = await fetch(`${BASE_URL}/lessons`)
  return response.json()
}
