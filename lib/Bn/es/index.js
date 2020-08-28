import { Button } from 'antd'
import React from 'react'
/*
p type=primary
t 文本，等于但优先于props.children
mr 右边的距离 默认为10
ml 右边的距离 默认为0
style 样式
* */
export default ({ p, t, mr, ml, style, ...props }) => (
  <Button type={p ? 'primary' : ''} style={{ marginRight: mr || 10, marginLeft: ml || 0, ...style }} {...props}>
    {t || props.children}
  </Button>
)
