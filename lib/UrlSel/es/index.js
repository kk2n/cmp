import React, { Component } from 'react'
import { Select, Spin } from 'antd'
import { last, keys, debounce } from 'underscore'
import { eq } from '../../is'
import './SearchSel.scss'
import PropTypes from 'prop-types'
import { filterArr, filterObj, findObj } from '../../array'

const Option = Select.Option
class UrlSel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      API: this.props.API,
      url: this.props.url,
      params: this.props.params,
      data: [],
      fetching: false,
      value: this.props.value
    }
    //防抖
    this.search = debounce(this.search, props.debounceTime || 6000, true)
  }
  static propTypes = {
    debounceTime: PropTypes.number, //搜索时防抖
    noMultiple: PropTypes.bool, //是否是多选
    API: PropTypes.object, // 存在时，调API
    method: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.object,
    beforeData: PropTypes.array,
    afterData: PropTypes.array,
    value: PropTypes.any,
    allowClear: PropTypes.bool,
    getPopupContainer: PropTypes.object,
    placeholder: PropTypes.string,
    reverse: PropTypes.object,
    changeData: PropTypes.oneOfType([PropTypes.func]),
    labelHasKey: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]) //option中的文本包括Id,如果是字符，请用‘[]或（）’
  }

  static defaultProps = {
    API: null,
    method: 'get',
    url: '',
    params: {},
    beforeData: [],
    afterData: [],
    vt: '',
    placeholder: '请选择'
  }

  //打开下拉框数据
  selOpen = async open => {
    let { API, method, onSearch } = this.props
    //如果onSearch存在，禁止下拉事件
    if (onSearch) return false
    //排除关闭事件
    if (!open) return false
    //排除已有数据时
    if ((this.state.data || []).length) return false

    if (API && API[method] && this.state.url) {
      this.setState({ fetching: true })
      let { data = [], status } = await API[method](this.state.url, this.state.params, { load: false })
      if (!status) return false
      this.setState({
        data: this.props.changeData ? this.props.changeData(data) : data,
        fetching: false
      })
    } else {
      this.setState({
        data: [],
        fetching: false
      })
    }
  }
  //没有多选，也就是下拉框单选
  noMultiple = () => {
    let allData = [...this.props.beforeData, ...this.state.data, ...this.props.afterData]
    if (this.props.noMultiple) {
      return {
        className: `${this.props.className || ''} SearchSel-noMultiple UrlSel`,
        ref: sel => (this.sel = sel),
        onChange: async value => {
          value = last(value)
          let selData = findObj(allData, { [this.getVT()?.[0]]: value?.key })
          await this.setState({ value: value ? value : undefined })
          //导出数据，第一个为选择得到值，第二个为所有的下拉框数据,
          this.props.onChange && this.props.onChange(value, allData, selData)
          this.sel.blur()
        }
      }
    } else {
      return {
        className: `${this.props.className || ''} UrlSel`,
        onChange: async value => {
          let selData = filterArr(allData, { [this.getVT()?.[0]]: value.map(a => a.key) })
          this.setState({ value })
          this.props.onChange && this.props.onChange(value, allData, selData)
        }
      }
    }
  }
  shouldComponentUpdate(nextProps) {
    if (!eq(this.props.params, nextProps.params)) {
      this.setState({
        params: nextProps.params,
        value: nextProps.value,
        data: []
      })
    }
    if (!eq(this.props.url, nextProps.url)) {
      this.setState({
        url: nextProps.url,
        value: nextProps.value,
        data: []
      })
    }
    if (!eq(this.props.value, nextProps.value)) {
      this.setState({
        value: nextProps.value
      })
    }
    return true
  }
  setValue = () => {
    if (this.props.form) return {}
    else return { value: this.state.value }
  }
  search = async val => {
    let { API, method, onSearch } = this.props
    if (onSearch) await onSearch(val)
    await this.setState({ fetching: true })
    await setTimeout(async () => {
      if (API && API[method] && this.state.url) {
        let { data = [], status } = await API[method](this.state.url, this.state.params, { load: false })
        if (!status || data?.length === 0) {
          this.setState({ fetching: false })
          return false
        }
        this.setState({
          data: this.props.changeData ? this.props.changeData(data) : data,
          fetching: false
        })
        return false
      }
      this.setState({ fetching: false })
    }, 1500)
  }
  getVT = () => {
    let vt = []
    if (this.props.vt) {
      vt = this.props.vt.split(',')
    } else {
      let aData = this.props.beforeData?.length
        ? this.props.beforeData
        : this.props.afterData?.length
        ? this.props.afterData
        : this.state.data?.length
        ? this.state.data
        : [{ id: 1, name: 1, filter: 1 }]
      let arrKey = aData?.length && aData[0] ? keys(aData[0]) : []
      vt = this.props.reverse ? arrKey.reverse() : arrKey
    }
    return vt
  }
  render() {
    let data = this.state.data || []
    let vt = this.getVT()
    return (
      <Select
        allowClear={this.props.allowClear === false ? false : this.props.allowClear || !this.props.noAllowClear}
        showArrow
        optionFilterProp={'children'}
        labelInValue
        mode="multiple"
        loading={this.state.fetching}
        onDropdownVisibleChange={this.selOpen}
        notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
        {...this.props}
        {...this.noMultiple()}
        {...this.setValue()}
        onSearch={this.search}
      >
        {[...this.props.beforeData, ...data, ...this.props.afterData].map((d, dd) => {
          return (
            d[vt[0]] !== undefined && (
              <Option key={d[vt[0]] + '-' + dd} value={d[vt[0]]} title={d[vt[1]]}>
                {d[vt[1]]}
                {this.props.labelHasKey &&
                  `${typeof this.props.labelHasKey === 'string' ? this.props.labelHasKey?.split('')?.[0] || '' : ''}${
                    d[vt[0]]
                  }${typeof this.props.labelHasKey === 'string' ? this.props.labelHasKey?.split('')?.[1] || '' : ''}`}
              </Option>
            )
          )
        })}
      </Select>
    )
  }
}

export default UrlSel

/*
多选
例子：
<SearchSel
  placeholder="全部"
  className="search-gaoji-sel"
  url="/biz/sales/list/staff/cc"
  vt={'ccid,ccname'}
  value={props.CCId}
  onChange={val => props.CCIdUp(val)}
/>


单选

<SearchSel
  noMultiple
  placeholder="请选择"
  className="search-gaoji-sel"
  url="/biz/sales/list/org/staff"
  param={{ orgIds: props.fenPeiSelZuzhiId }}
  vt={'staffId,staffRealName'}
/>

//注意：使用此组件是onChange会返回两个数据，单选时onChange={(val,data)=>{}},val:是对象eg:{key:*,label:*},data:是接口请求到的数据，也就是下拉框的option

 */
