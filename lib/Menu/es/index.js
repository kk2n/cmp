import PropTypes from 'prop-types'
import { Menu as MenuAntd, Icon } from 'antd'
import { objIndex, rejectBad } from '../../array'
import './css.scss'

const SubMenu = MenuAntd.SubMenu
const { React } = window
export class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sanMenu: []
    }
  }

  static propTypes = {
    menuData: PropTypes.array,
    theme: PropTypes.string,
    history: PropTypes.object,
    collapsed: PropTypes.bool
  }
  static defaultProps = {
    menuData: [],
    theme: 'dark',
    collapsed: false
  }
  render() {
    let myMenuData = this.props.menuData
    let pathname = location.pathname.split('/').map(a => a && a)
    pathname = '/' + rejectBad(pathname).join('/')
    let urlArr = pathname.split('/')
    let selIndex //selIndex高亮的菜单
    let openMenu //openMenu展开的菜单
    if (pathname === '/') {
      openMenu = 's-0'
      selIndex = 's-0'
    } else {
      let i = objIndex(myMenuData, { pathname: '/' + urlArr[1] })
      openMenu = 's-' + i
      if (i === -1) {
        console.log('一级菜单路径不正确：\n访问路径：' + '/' + urlArr[1], '\n菜单数据：', myMenuData)
      }
      if (urlArr.length === 2) {
        selIndex = 's-' + objIndex(myMenuData, { pathname: '/' + urlArr[1] })
      } else if (urlArr.length >= 3) {
        let ii = objIndex(myMenuData[i]?.subMenu, { pathname: '/' + urlArr[1] + '/' + urlArr[2] })
        selIndex = 'sub-' + i + '-' + ii
        if (ii === -1) {
          console.log(
            '二级菜单路径不正确：\n访问路径：' + '/' + urlArr[1] + '/' + urlArr[2],
            '\n菜单数据：',
            myMenuData[i]?.subMenu
          )
        }
      }
    }

    return (
      <MenuAntd
        className={'ym-menu'}
        theme={this.props.theme}
        mode="inline"
        defaultSelectedKeys={[selIndex]}
        defaultOpenKeys={[openMenu]}
      >
        {this.props.menuData.map((item, index) => {
          // 只有一级菜单
          if (!item.subMenu) {
            return (
              item.show && (
                <MenuAntd.Item
                  key={item.key || 's-' + index}
                  onClick={() => {
                    item.clickBefore && item.clickBefore()
                    if (item.isOpen) {
                      location.href = item.url
                    } else {
                      this.props.history.push(item.url)
                    }
                  }}
                >
                  <Icon type={item.icon || 'file'} />
                  {!this.props.collapsed && <span>{item.name}</span>}
                </MenuAntd.Item>
              )
            )
          }
          return (
            item.show && (
              <SubMenu
                data-title={'s-' + index}
                key={item.key || 's-' + index}
                title={
                  <span>
                    <Icon type={item.icon || 'file'} />
                    {!this.props.collapsed && <span>{item.name}</span>}
                  </span>
                }
              >
                {item.subMenu.map((sub, sIndex) => {
                  let ii = index + '-' + sIndex
                  if (sub.show) {
                    if ((sub.subMenu || []).length > 0) {
                      //拥有三级菜单
                      return (
                        <MenuAntd.Item key={(sub.key && 'sub-' + sub.key) || 'sub-' + sIndex}>
                          <span
                            onClick={() => {
                              this.setState(state => {
                                state.sanMenu[ii] = !state.sanMenu[ii]
                                return { ...state }
                              })
                            }}
                          >
                            {sub.icon && <Icon type={sub.icon} />}
                            {!this.props.collapsed && sub.name}
                            <Icon
                              style={{ fontSize: 8, fontWeight: 700, marginLeft: 12 }}
                              type={this.state.sanMenu[ii] ? 'up' : 'down'}
                              className={'suoxiao'}
                            />
                          </span>
                          <div
                            className={'sanji-menu'}
                            style={{
                              display: this.state.sanMenu[ii] ? 'block' : 'none'
                            }}
                          >
                            <ul>
                              {sub.subMenu.map((a, aa) => {
                                return (
                                  <li
                                    key={aa}
                                    onClick={() => {
                                      if (sub.isOpen) {
                                        sub.delCookieOM && sub.delCookieOM()
                                        window.location.href = a.url
                                      } else {
                                        this.props.history.push(a.url)
                                      }
                                    }}
                                  >
                                    {a.icon && <Icon type={a.icon} />}
                                    {!this.props.collapsed && a.name}
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        </MenuAntd.Item>
                      )
                    } else {
                      //只有二级菜单
                      return (
                        <MenuAntd.Item key={(sub.key && 'sub-' + sub.key) || 'sub-' + sIndex}>
                          <a
                            onClick={() => {
                              sub.clickBefore && sub.clickBefore()
                              if (sub.isOpen) {
                                window.location.href = sub.url
                              } else {
                                this.props.history.push(sub.url)
                              }
                            }}
                          >
                            {sub.icon && <Icon type={sub.icon} />}
                            {!this.props.collapsed && sub.name}
                          </a>
                        </MenuAntd.Item>
                      )
                    }
                  }
                  //否则，返回空
                  return null
                })}
              </SubMenu>
            )
          )
        })}
      </MenuAntd>
    )
  }
}
export default Menu
