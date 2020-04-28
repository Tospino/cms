import axios from '@/utils/axios'

const api = {
  getHelpNavTree: '/interfaces/helpCategory/getCategoryTreeList',
  getHelpList: '/interfaces/helpContent/ruleListById',
  getHelpDetails: '/interfaces/helpContent/HelpContentById',
  getHelpListBySearch: '/interfaces/helpContent/CategoryfuzzySearch'
}

export function getHelpNavTree (data) {
  return axios({
    url: api.getHelpNavTree,
    method: 'post',
    data: data
  })
}

export function getHelpList (data) {
  return axios({
    url: api.getHelpList,
    method: 'post',
    params: data,
    data: data
  })
}

export function getHelpDetails (data) {
  return axios({
    url: api.getHelpDetails,
    method: 'post',
    params: data,
    data: data
  })
}

export function getHelpListBySearch (data) {
  return axios({
    url: api.getHelpListBySearch,
    method: 'post',
    params: data,
    data: data
  })
}
