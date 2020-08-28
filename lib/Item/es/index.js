import React, { Fragment } from 'react'
import { Row, Col, Divider } from 'antd'
import PropTypes from 'prop-types'
let Item = ({ gutter, data = [], rowStyle, leftSpan = 6, colNum, underscore }) => {
  return (
    <Row gutter={gutter} style={{ lineHeight: '34px', ...rowStyle }}>
      {data.map((a, aa) => {
        return (
          <Fragment key={aa}>
            <Col span={24 / colNum} style={{ ...a.wrapStyle }}>
              <Col span={a.leftSpan || leftSpan} style={{ textAlign: 'right', ...a.leftStyle }}>
                {a.name}：
              </Col>
              <Col
                span={a.rightSpan ? a.rightSpan : a.leftSpan ? 24 - a.leftSpan : 24 - leftSpan}
                style={{ ...a.rightStyle }}
              >
                {a.value}
              </Col>
              {underscore && <Divider dashed={underscore === 'dotted'} />}
            </Col>
          </Fragment>
        )
      })}
    </Row>
  )
}

Item.propTypes = {
  //组件遍历项
  /*
  data={{
    wrapStyle:{},//父级包裹层样式
    leftStyle:{},//左边样式
    rightStyle:{},//右边样式
    leftSpan:'6',//左边Col的span值
    rightSpan:'',//右边Col的span值
    name:'',//左边文字
    value:'',//右文字
  
  }}
  * */
  data: PropTypes.array.isRequired,
  //左右padding
  gutter: PropTypes.number,
  //全局左边文字的Col的span,默认为6
  leftSpan: PropTypes.number,
  //全局父级Col的数量,会自动计算 24/colNum
  colNum: PropTypes.number,
  //是否有下横线，支持bool和字符串'dotted'
  underscore: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  //做外层的style
  rowStyle: PropTypes.object
}
Item.defaultProps = {
  data: [],
  colNum: 1
}
export default Item
