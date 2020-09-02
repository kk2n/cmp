import URL from 'url'

/**
 * 获取 blob
 * @param  {String} url 目标文件地址
 * @return {Promise}
 */
export function getBlob(url) {
  // eslint-disable-next-line no-undef
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.send()
  })
}

/**
 * 保存blob
 * @param  {Blob} blob
 * @param  {String} filename 想要保存的文件名称
 */
export function saveAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    const link = document.createElement('a')
    const body = document.querySelector('body')
    link.href = window.URL.createObjectURL
      ? window.URL.createObjectURL(blob)
      : window.webkitURL.createObjectURL
      ? window.webkitURL.createObjectURL(blob)
      : window.mozURL.createObjectURL
      ? window.URL.createObjectURL(blob)
      : ''
    if (!link.href) {
      console.log('下载失败！')
      return false
    }
    link.download = filename
    // fix Firefox
    link.style.display = 'none'
    body.appendChild(link)
    link.click()
    body.removeChild(link)
    // eslint-disable-next-line no-unused-expressions
    window.URL.revokeObjectURL
      ? window.URL.revokeObjectURL(link.href)
      : window.webkitURL.revokeObjectURL
      ? window.webkitURL.revokeObjectURL(link.href)
      : window.mozURL.revokeObjectURL
      ? window.URL.revokeObjectURL(link.href)
      : ''
  }
}

/**
 * 下载
 * @param  {String} url 目标文件地址
 * @param  {String} filename 想要保存的文件名称
 */
export function downFile(url, filename) {
  if (URL.parse(url).protocol !== window.location.protocol) {
    url = window.location.protocol + '//' + url.split('//')[1]
  }
  getBlob(url + '?' + Math.random()).then(blob => {
    saveAs(blob, filename)
  })
}
export default { getBlob, saveAs, downFile }
