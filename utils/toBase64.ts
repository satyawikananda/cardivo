import fetch from 'isomorphic-unfetch'

export default async function toBase64ImageUrl(imgUrl: any): Promise<string> {
  const fetchImageUrl = await fetch(imgUrl)
  const responseArrBuffer = await fetchImageUrl.arrayBuffer()
  const toBase64 = 
    `data:${ fetchImageUrl.headers.get('Content-Type') || 'image/png' };base64,${Buffer.from(responseArrBuffer).toString('base64')}`
  return toBase64
}