export async function POST(
  req: Request
) {
  const data = await req.json()

  const accessToken = data.accessToken
  const restli = data.restli
  const linkedin_version = data.linkedin_version

  delete data.accessToken
  delete data.restli
  delete data.linkedin_version

  console.log('making call to linkedin')

  const response = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-Restli-Protocol-Version': restli,
      'LinkedIn-Version': linkedin_version,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  console.log(response.status)

  return new Response('sent', {
    status: response.status
  })
}