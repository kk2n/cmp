import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import { mapObject, values, isArray } from 'underscore'

let ModalArr = ({ data, m, ...props }) => {
  return values(
    mapObject(data, (a, aa) => {
      if (!isArray(a)) return null
      return (
        <Modal
          key={aa}
          title={a[0]}
          centered
          {...a?.[1]}
          visible={a?.[1]?.visible || m?.[aa + 'Show']}
          onCancel={() => {
            if (m?.[aa + 'ShowUp']) {
              m?.[aa + 'ShowUp'](false)
              a?.[1]?.onCancel && a?.[1]?.onCancel()
            } else if (a?.[1]?.onCancel) {
              a?.[1]?.onCancel()
            }
          }}
          onOk={() => {
            if (m?.[aa + 'ShowUp']) {
              m?.[aa + 'ShowUp'](false)
              a?.[1]?.onOk && a?.[1]?.onOk()
            } else if (a?.[1]?.onOk) {
              a?.[1]?.onOk()
            }
          }}
        >
          {props.children}
        </Modal>
      )
    })
  )
}
ModalArr.propTypes = { data: PropTypes.object }
ModalArr.defaultProps = { children: 'Hello World!' }
export default ModalArr
