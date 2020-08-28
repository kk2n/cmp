import { Table, Pagination } from 'antd'
import React, { Component } from 'react'
import { eq } from '../../is'
import PropTypes from 'prop-types'
import './css.scss'
import { debounce } from 'underscore'
/**
 *
 * @param API
 * @param method
 * @param columns
 * @param url
 * @param params
 * @param config
 * @param pagination
 * @param pageSizeOptions
 * @return {*}
 * @constructor
 */
export class UrlTable extends Component {
  constructor(props) {
    super(props)
    this.search = debounce(this.getData, 600)
  }

  static propTypes = {
    getFn: PropTypes.object,
    API: PropTypes.object,
    method: PropTypes.string,
    columns: PropTypes.array,
    url: PropTypes.string,
    params: PropTypes.object,
    config: PropTypes.object,
    pagination: PropTypes.any,
    pageSizeOptions: PropTypes.any,
    initNoGet: PropTypes.bool //初始化化时不请求数据
  }
  static defaultProps = {
    API: {},
    method: 'get',
    columns: [],
    url: '',
    params: {},
    config: {
      list: 'list',
      pageNum: 'pageNum',
      pageSize: 'pageSize',
      total: 'total',
      totalRecord: 'totalRecord'
    },
    pagination: undefined,
    pageSizeOptions: undefined,
    initNoGet: false
  }
  state = {
    data: {},
    params: { ...this.props.params, ...this.props.sorter }
  }
  //获取表格书数据
  getData = async () => {
    let { config } = this.props
    let { list, pageNum } = config
    let { API, method, url } = this.props
    if (API && API[method] && url) {
      let { data, status } = await (API[method] && url && API[method](url, this.state.params))
      if (!status) return false
      //如果不是第一页查询没有数据时
      if (data[pageNum] !== 1 && !data[list]?.length) {
        await this.setState({
          params: {
            ...this.state.params,
            [pageNum]: 1
          }
        })
        this.getData()
      }
      this.setState({ data })
    }
  }
  componentDidMount = () => {
    this.props.getFn && this.props.getFn(this)
    !this.props.initNoGet && this.getData()
  }
  async shouldComponentUpdate(nextProps, nextState) {
    //参数发生变化更新
    if (!eq(this.props.params, nextProps.params)) {
      await this.setState({ params: nextProps.params })
      this.getData()
    } else if (!eq(this.props.sorter, nextProps.sorter)) {
      //排序发生变化时更新
      await this.setState({
        params: {
          ...this.state.params,
          ...nextProps.sorter
        }
      })
      this.getData()
    } else {
      //状态发生变化时更新
      return !eq(this.state, nextState)
    }
  }
  render() {
    let {
      columns = [],
      API = null,
      method = 'get',
      url = '',
      params = {},
      config = {},
      pagination,
      pageSizeOptions,
      ...props
    } = this.props
    let { pageNum, pageSize, total, list, totalRecord } = config
    return (
      <>
        <Table
          rowKey={'leadsId'}
          className={'UrlTable-css'}
          columns={columns}
          dataSource={
            (this.state.data[totalRecord]
              ? [this.state.data[totalRecord], ...(this.state.data[list] || [])]
              : [...(this.state.data[list] || [])]) || []
          }
          pagination={
            pagination === undefined &&
            !this.state.data[totalRecord] && {
              current: this.state.data[pageNum],
              pageSize: this.state.data[pageSize] + (this.state.data[totalRecord] ? 1 : 0),
              total: this.state.data[total],
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: pageSizeOptions || ['5', '10', '20', '40', '80', '100'],
              showTotal: (t, r) => (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ marginRight: 10 }}>共 {t} 条记录</span>
                  <span>
                    第 {r[0] === 1 ? r[0] : Math.ceil(r[0] / this.state.data[pageSize])} /{' '}
                    {Math.ceil(t / this.state.data[pageSize])} 页
                  </span>
                </div>
              ),
              onChange: async (page, pageSize) => {
                if (page !== this.state.params[pageNum]) {
                  await this.setState({
                    params: {
                      ...this.state.params,
                      [pageNum]: page
                    }
                  })
                  !props.onChange && this.getData()
                }
              },
              onShowSizeChange: async (current, size) => {
                if (size !== this.state.params[pageSize]) {
                  await this.setState({
                    params: {
                      ...this.state.params,
                      [pageNum]: 1,
                      [pageSize]: size
                    }
                  })
                  !props.onChange && this.getData()
                }
              }
            }
          }
          {...props}
        />
        {this.state.data[totalRecord] && (
          <div style={{ float: 'right', marginTop: 10, marginBottom: 10 }}>
            <Pagination
              onShowSizeChange={async (current, size) => {
                if (size !== this.state.params[pageSize]) {
                  await this.setState({
                    params: {
                      ...this.state.params,
                      [pageNum]: 1,
                      [pageSize]: size
                    }
                  })
                  !props.onChange && this.getData()
                }
              }}
              onChange={async (page, pageSize) => {
                if (page !== this.state.params[pageNum]) {
                  await this.setState({
                    params: {
                      ...this.state.params,
                      [pageNum]: page
                    }
                  })
                  !props.onChange && this.getData()
                }
              }}
              showSizeChanger
              showQuickJumper
              current={this.state.data[pageNum]}
              total={this.state.data[total]}
              showTotal={(t, r) => (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ marginRight: 10 }}>共 {t} 条记录</span>
                  <span>
                    第 {r[0] === 1 ? r[0] : Math.ceil(r[0] / this.state.data[pageSize])} /{' '}
                    {Math.ceil(t / this.state.data[pageSize])} 页
                  </span>
                </div>
              )}
            />
          </div>
        )}
      </>
    )
  }
}
export default UrlTable
