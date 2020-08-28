import React from 'react'
import { Input } from 'antd'
/*
 * m model对象
 * k keys
 * w width
 * p placeholder
 * mr marginRight 默认为10
 * ml marginRight 默认为0
 * style 样式
 * */
export default ({ m, k, w, p, mr, ml, style, ...props }) => (
  <Input
    style={{ width: w || 180, marginRight: mr || 10, marginLeft: ml || 0, ...style }}
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
