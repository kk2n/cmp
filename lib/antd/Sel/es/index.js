import UrlSel from '../../UrlSel'
import React from 'react'
const Sel = ({ m, k, w, p, mr, style, API, noAllowClear, ...props }) => (
  <UrlSel
    allowClear={!noAllowClear}
    style={{ width: w || 200, marginRight: mr || 10, ...style }}
    API={API}
    placeholder={p || '请选择'}
    {...(m &&
      k && {
        value: m?.[k]
      })}
    {...(m?.[`${k}Up`] && {
      onChange: value => m?.[`${k}Up`](value)
    })}
    {...props}
  />
)
export default { Sel }
