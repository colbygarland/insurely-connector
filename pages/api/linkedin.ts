import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const accessToken = req.body.accessToken
  const restli = req.body.restli
  const linkedin_version = req.body.linkedin_version

  delete req.body.accessToken
  delete req.body.restli
  delete req.body.linkedin_version

  const response = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-Restli-Protocol-Version': restli,
      'LinkedIn-Version': linkedin_version,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body)
  })

  res.status(response.status)
}