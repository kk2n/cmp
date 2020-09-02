import { useState } from 'react'
import { Modal } from 'antd'

/**
 * @param initTitle 标题 string
 * @param modalProps Modal属性 string
 * @param initContent 内容 string | React.ReactElement
 * */
export const useModal = (initTitle = '', initContent = null, modalProps = {}) => {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState(initTitle)
  const [content, setContent] = useState(initContent)
  const CustomModal = () => {
    return (
      visible && (
        <Modal centered visible={visible} title={title} closable={false} footer={null} {...modalProps}>
          {content}
        </Modal>
      )
    )
  }
  const show = newCcontent => {
    newCcontent && setContent(newCcontent)
    setVisible(true)
  }
  const hide = delay => {
    if (delay) {
      setTimeout(() => setVisible(false), delay)
    } else {
      setVisible(false)
    }
  }
  return {
    show, //显示的方法
    hide, //隐藏的方法
    CustomModal, //DOM
    setTitle, //重新设置标题
    setContent //重新设置内容
  }
}
