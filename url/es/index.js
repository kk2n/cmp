import mUrl from 'url'
import { rest, last } from 'underscore'

export let { URL } = window
export function url() {
  let myUrl = mUrl
  //添加env
  myUrl.env = (location.host.match(/\w+(?:-)/) || [])[0] || ''
  //添加domain
  myUrl.domain = rest(myUrl.parse(location.origin).hostname.split('.')).join('.')
  //添加system
  myUrl.system = last((((location.host || '').split('.') || [])[0] || '').split('-') || [])
  //添加obj
  myUrl = { ...myUrl, ...myUrl.parse(location.href, { querystring: true }) }
  myUrl.winURL = URL
  return myUrl
}

/**
 * 强制到HTTPS
 */
export const toHttps = () => {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1])
}

/**
 * 强制到HTTPS
 */
export const toHttp = () => {
  if (location.protocol !== 'http:') location.replace('http://' + location.href.split('//')[1])
}

/**
 *强制文件的访问协议与访问地址一致
 */
export const urlProtocol = u =>
  mUrl.parse(u).protocol !== location.protocol ? location.protocol + '//' + u.split('//')[1] : u

export default { URL, url, toHttps, toHttp }
