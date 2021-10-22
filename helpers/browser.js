export function updateURLQueryStrings(address) {
  if (!history.pushState) {
    return
  }
  const { protocol, host, pathname } = window.location
  const newurl = protocol + "//" + host + pathname + `?address=${address}`
  window.history.pushState({ path: newurl }, '' , newurl)
}