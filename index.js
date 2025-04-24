addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  // build xbox.com/play URL
  const target = new URL(request.url)
  target.hostname = 'xbox.com'
  target.pathname = '/play'

  // fetch original
  const res = await fetch(target.toString(), request)

  // strip blocking headers
  const headers = new Headers(res.headers)
  headers.delete('x-frame-options')
  headers.delete('content-security-policy')
  headers.set('content-security-policy', "frame-ancestors *")

  const body = await res.text()
  return new Response(body, {
    status: res.status,
    headers
  })
}
