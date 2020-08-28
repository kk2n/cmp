import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Icon } from 'antd'
import './Dialog.scss'

/*
Dialog组件
* */
export class Dialog extends React.Component {
  static propTypes = {
    text: PropTypes.any, //按钮文字
    hide: PropTypes.bool, //整体隐藏
    bnProps: PropTypes.any, // 按钮属性
    visible: PropTypes.bool, //Dialog隐藏
    isA: PropTypes.bool, //是a链接
    title: PropTypes.elementType, //Dialog隐藏
    img: PropTypes.any //图片预览
  }
  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.visible !== this.props.visible) {
      this.setState({
        visible: !this.state.visible
      })
    }
  }

  render() {
    let {
      img: imgUrl,
      text,
      hide,
      children,
      wrapClassName,
      isA,
      onCancel,
      onOk,
      bnProps,
      aProps,
      imgProps,
      ...props
    } = this.props
    let onClick = () => {
      this.setState({ visible: !this.state.visible })
    }
    return (
      !hide && (
        <>
          {imgUrl && <img src={imgUrl} alt={''} {...imgProps} onClick={onClick} />}
          {isA && !imgUrl && (
            <a onClick={onClick} {...aProps}>
              {text}
            </a>
          )}
          {!isA && !imgUrl && (
            <Button onClick={onClick} {...bnProps}>
              {text}
            </Button>
          )}
          {this.state.visible && (
            <Modal
              wrapClassName={wrapClassName || '' + (imgUrl ? ' imgDialog' : '')}
              centered
              {...(imgUrl ? { footer: false } : {})}
              {...(imgUrl ? { title: false } : {})}
              {...(imgUrl ? { closeIcon: <Icon type="close-circle" style={{ fontSize: 28 }} /> } : {})}
              {...props}
              visible={this.state.visible}
              okText={'确定'}
              cancelText={'取消'}
              onCancel={() => {
                onCancel && onCancel()
                onClick()
              }}
              onOk={() => {
                onOk && onOk()
                onClick()
              }}
            >
              {imgUrl && !children && <img style={{ maxWidth: '100%' }} src={imgUrl} alt={''} />}
              {!imgUrl && children}
            </Modal>
          )}
        </>
      )
    )
  }
}
export default Dialog
