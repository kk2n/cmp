import { DatePicker } from 'antd'
import React from 'react'
const { RangePicker } = DatePicker
import moment from 'moment'

export default ({ m, k, w, mr, style, ...props }) => (
  <RangePicker
    style={{ width: w || 216, marginRight: mr || 10, ...style }}
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
