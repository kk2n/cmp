import React from 'react'
import { message, Upload, Icon, Button } from 'antd'
import './css.scss'
import PropTypes from 'prop-types'

export default class UploadImage extends React.Component {
  static propTypes = {
    accept: PropTypes.string, //允许上传的文件
    maxSize: PropTypes.number, //允许文件的大小，默认5MB
    beforeUpload: PropTypes.func, // 上传前的执行函数，返回true 时继续
    customRequest: PropTypes.func, //上传方法，一般为BOS或OSS
    onSuccess: PropTypes.func, //上传成功后，执行的方法
    onError: PropTypes.func, //上传出现错误后，执行的方法
    files: PropTypes.array, //初始化文件数组
    maxLength: PropTypes.number, //最大能上传的文件的数量
    onDelete: PropTypes.func //删除已上传的文件方法，传出一个参数，文件序列index
  }
  static defaultProps = {
    accept: '',
    maxSize: 5,
    beforeUpload: file => {},
    customRequest: action => {},
    onSuccess: data => {},
    onError: msg => {},
    files: [],
    maxLength: 1,
    onDelete: index => {}
  }
  state = { loading: false }
  render() {
    const uploadProps = {
      accept: this.props.accept,
      name: 'file',
      showUploadList: false,
      beforeUpload: file => {
        const isLt1M = file.size / 1024 / 1024 <= this.props.maxSize || 5
        if (!isLt1M) {
          message.error(`不得超过${this.props.maxSize}MB!`)
          return false
        }
        if (this.props.beforeUpload && !this.props.beforeUpload?.(file)) {
          return false
        }
        message.loading('上传中...')
        this.setState({ loading: true })
      },
      customRequest: action => this.props.customRequest(action),
      onSuccess: data => {
        this.setState({ loading: false })
        this.props.onSuccess(data)
      },
      onError: msg => {
        this.setState({ loading: false })
        this.props.onError(msg)
      }
    }
    return (
      <div className={'UploadFile'}>
        <div style={{ marginBottom: 6 }}>
          {(this.props.files?.length || 0) < this.props.maxLength && (
            <Upload {...uploadProps}>
              <Button>
                <Icon type={this.state.loading ? 'loading' : 'upload'} /> 上传
              </Button>
            </Upload>
          )}
        </div>
        {this.props.files?.map((a, aa) => {
          return (
            <div className={'UploadFileArr'} key={aa}>
              <a href={a.url}>{a.name}</a>
              &nbsp;&nbsp;&nbsp;
              <i className={'close'} onClick={() => this.props.onDelete(aa)} />
            </div>
          )
        })}
      </div>
    )
  }
}
