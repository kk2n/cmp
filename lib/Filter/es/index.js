import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './filterSearch.scss'

export class Filter extends Component {
  static propTypes = {
    //遍历项
    /*
    data={{
      span:3,//占用的栅格数
      key:'a',
      wrapClassName:'',//包裹的class名称
      wrapStyle:{},//包裹的样式
      className:'',//class名称
      style:{},//样式
      title:'',//搜索项的名称，同beforeComponent
      beforeComponent:<div />,//前后的内容
      afterComponent:<div />,//前后的内容
      component:<div />,//内容或组件
    }}
    * */
    data: PropTypes.array,
    //全局 列数 计算为：24/span,默认为4，也就是6个
    span: PropTypes.number,
    //栅格间隔 Col的padding左右
    gutter: PropTypes.number
  }
  //默认值
  static defaultProps = {
    data: [],
    span: 4
  }
  render() {
    return (
      <Row gutter={this.props.gutter} className={'filterSearch'}>
        {this.props.data.map((a, aa) => {
          return (
            <Col
              style={{ minHeight: 54, ...a.wrapStyle }}
              span={a.span || parseInt(24 / this.props.span)}
              key={a.key || '' + 'Filter' + aa}
              className={a.wrapClassName}
            >
              <div
                style={{ marginBottom: 20, ...a.style }}
                className={a.className}
                key={(a.key || '') + 'FilterForm' + aa}
              >
                {a.title}
                {this.props.hasBr && <br />}
                {a.beforeComponent}
                {a.component}
                {a.afterComponent}
              </div>
            </Col>
          )
        })}
      </Row>
    )
  }
}
export default Filter
/*
//data例子
data=[{
  name: '',
  key: 'gradeId',
  wrapClassName: '',
  className: '',
  rules: {},
  component: (
    <UrlSel
      placeholder="年级"
      noMultiple
      API={API}
      url={'/biz/coursepack/student/gradesubject/list'}
      onChange={(val, data) => {
        let subjectData = data.find(a => a.id === val.key)
        this.setState({
          selGradeId: val.key,
          subjectData: subjectData.childer
        })
      }}
    />
  ),
  beforeComponent: null,
  afterComponent: null
}]

*/
