import { Input } from 'antd'
import React from 'react'

export default ({ m, k, w, p, mr, style, ...props }) => (
  <Input
    style={{ width: w || 200, marginRight: mr || 10, ...style }}
    placeholder={p || '请输入..'}
    {...(m &&
      k && {
        value: m?.[k]
      })}
    {...(m?.[`${k}Up`] && {
      onChange: e => m?.[`${k}Up`](e.target.value)
    })}
    {...props}
  />
)
