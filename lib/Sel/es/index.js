import React from 'react'
import Select from '../Select'

/*
 * m model对象
 * k keys
 * w width
 * p placeholder
 * mr marginRight 默认为10
 * ml marginRight 默认为0
 * style 样式
 * noAllowClear 是否有清除功能，默认：有
 * */
export default ({ m, k, w, p, mr, ml, style, API, noAllowClear, ...props }) => (
  <Select
    allowClear={!noAllowClear}
    style={{ width: w || 180, marginRight: mr || 10, marginLeft: ml || 0, ...style }}
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
