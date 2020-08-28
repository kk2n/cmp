import Filter from '../Filter'
import React from 'react'
import { values, mapObject, isArray, compact } from 'underscore'
import { Button } from 'antd'

/*
data 数据 为对象
 eg:data={
    keys:['标题',CMP,props],说明：keys为model中的键，CMP为组件，可以是antd的组件，如：Input,也可以是标签，<Input/>,props为组件的属性
 }
 
m model
span 栅格数
inline 按钮是否在同一行
search 自定义搜索事件
clear 自定义清除事件
hasBr title与控件是否换行
bnStyle  按钮组的样式
bnWrapStyle 按钮包裹层样式
hideBn 隐藏按钮
* */
export default ({ data, m, span, inline, search, clear, hasBr, bnStyle, bnWrapStyle, hideBn }) => {
  let item = mapObject(data, (a, aa) => {
    if (!a || !isArray(a)) return null
    let title = a[0]
    let Cmp = a[1]
    let props = a[2]
    return {
      title: title,
      component: typeof Cmp === 'function' ? <Cmp key={aa} m={m} k={aa} {...props} /> : Cmp,
      span: props?.span,
      style: props?.parentStyle,
      wrapStyle: props?.wrapStyle
    }
  })
  return (
    <Filter
      hasBr={hasBr}
      span={span}
      data={[
        ...compact(values(item)),
        ...compact([
          hideBn
            ? null
            : {
                wrapStyle: { width: inline ? 160 : '100%', textAlign: 'center', ...bnWrapStyle },
                component: (
                  <span style={{ width: inline ? 'auto' : '100%' }}>
                    <div
                      style={{
                        width: inline ? 160 : '100%',
                        textAlign: 'center',
                        marginTop: span > 4 ? 20 : 0,
                        ...bnStyle
                      }}
                    >
                      <Button
                        style={{ marginRight: 10 }}
                        type="primary"
                        onClick={() => (search && search()) || (m?.search && m.search())}
                      >
                        查询
                      </Button>
                      <Button onClick={() => (clear && clear()) || (m?.clear && m.clear())}>清除</Button>
                    </div>
                  </span>
                )
              }
        ])
      ]}
    />
  )
}
