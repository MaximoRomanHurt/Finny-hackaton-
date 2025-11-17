export async function getSummary() {
  const res = await fetch('/api/summary')
  if (!res.ok) throw new Error('Failed to load summary')
  return res.json()
}

export async function addTransaction(tx) {
  const res = await fetch('/api/transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tx),
  })
  if (!res.ok) throw new Error('Failed to add transaction')
  return res.json()
}
