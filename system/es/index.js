import { getUrl } from '../getUrl'
import { url } from '../url'
let env = url().env
let domain = url().domain

let host = location.host.split('.')[0]
export let system =
  (/store/.test(host)
    ? 'store'
    : /crs/.test(host)
    ? 'crs'
    : /crm/.test(host)
    ? 'crm'
    : /bi/.test(host)
    ? 'bi'
    : /magicmirror/.test(host)
    ? 'bi'
    : /om/.test(host)
    ? 'om'
    : /inv/.test(host)
    ? 'inv'
    : /os/.test(host)
    ? 'os'
    : /trs/.test(host)
    ? 'trs'
    : /jyqd/.test(host)
    ? 'jyqd'
    : getUrl('to')) || (/yimifudao/.test(host) ? 'store' : 'crm')

export let setSystem = val => {
  return getUrl('to') || val || 'crm'
}

export let systemObj = {
  o: {
    name: '本地开发',
    href: `http://${env}o.${domain}:8010`
  },
  l: {
    name: '本地开发',
    href: `http://${env}l.${domain}:8010`
  },
  crm: {
    name: '销售客服系统',
    href: `https://${env}crm.${domain}`
  },
  store: {
    name: '线下店管理系统',
    href: `https://${env}store.${domain}`
  },
  bi: {
    name: '魔镜系统',
    href: `https://${env}magicmirror.${domain}`
  },
  magicmirror: {
    name: '魔镜系统',
    href: `https://${env}magicmirror.${domain}`
  },
  crs: {
    name: '销售客服系统',
    href: `https://${env}crs.${domain}`
  },
  om: {
    name: '商户平台',
    href: `https://${env}om.${domain}`
  },
  inv: {
    name: '招商平台',
    href: `https://${env}inv.${domain}`
  },
  os: {
    name: '线下店系统',
    href: `https://${env}os.${domain}`
  },
  trs: {
    name: '教学管理系统',
    href: `https://${env}trs.${domain}`
  },
  jyqd: {
    name: '米状元教学系统',
    href: `https://${env}jyqd.${domain}`
  }
}
export default { system, systemObj, setSystem }
