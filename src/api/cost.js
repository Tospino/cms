import axios from '@/utils/axios'

const api = {
  getCategoryTree: '/interfaces/businessCategory/tree',
  exportManage: '/interfaces/exportQualifications/list',
  noExportManage: '/interfaces/noexportQualifications/list',
  personManage: '/interfaces/personalQualifications/list',
  componyManage: '/interfaces/companyQualifications/list',
  getPlatFormCost: '/interfaces/cost/list'
}

export function getCategoryTree (data) {
  return axios({
    url: api.getCategoryTree,
    method: 'post',
    data: data
  })
}

export function exportManage (data) {
  return axios({
    url: api.exportManage,
    method: 'post',
    data: data
  })
}

export function noExportManage (data) {
  return axios({
    url: api.noExportManage,
    method: 'post',
    data: data
  })
}

export function personManage (data) {
  return axios({
    url: api.personManage,
    method: 'post',
    data: data
  })
}

export function componyManage (data) {
  return axios({
    url: api.componyManage,
    method: 'post',
    data: data
  })
}

export function getPlatFormCost (data) {
  return axios({
    url: api.getPlatFormCost,
    method: 'post',
    data: data
  })
}
