const BASE_URL = 'https://mindbloom-backend-szwj.onrender.com';

export async function getLessons() {
  const response = await fetch(`${BASE_URL}/lessons`);
  return response.json();
}

export async function submitOrder(order) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  return response.json();
}
