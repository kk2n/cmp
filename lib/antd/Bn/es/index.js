import { Button } from 'antd'
import React from 'react'
export default ({ p, t, mr, style, ...props }) => (
  <Button type={p ? 'primary' : ''} style={{ marginRight: mr || 10, ...style }} {...props}>
    {t}
  </Button>
)
