import { DatePicker } from 'antd'
import React from 'react'
const { RangePicker: Index } = DatePicker
import moment from 'moment'
/*
 * m model对象
 * k keys
 * w width
 * p placeholder
 * mr marginRight 默认为10
 * ml marginRight 默认为0
 * style 样式
 * */
export default ({ m, k, w, mr, ml, style, ...props }) => (
  <Index
    style={{ width: w || 216, marginRight: mr || 10, marginLeft: ml || 0, ...style }}
    {...(m &&
      k && {
        value: [m?.[k]?.[0] && moment(m?.[k]?.[0]), m?.[k]?.[1] && moment(m?.[k]?.[1])]
      })}
    {...(m?.[k + 'Up'] && {
      onChange: (v, v2) => m?.[k + 'Up'](v2)
    })}
    {...props}
  />
)
