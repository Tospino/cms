import axios from '@/utils/axios'

const api = {
  getRuleNavTree: '/interfaces/ruleCategory/getCategoryTreeList',
  getRuleList: '/interfaces/ruleContent/ruleListById',
  getRuleDetails: '/interfaces/ruleContent/ruleContentById',
  getRulesBySearch: '/interfaces/ruleContent/CategoryfuzzySearch'
}

export function getRuleNavTree (data) {
  return axios({
    url: api.getRuleNavTree,
    method: 'post',
    data: data
  })
}

export function getRuleList (data) {
  return axios({
    url: api.getRuleList,
    method: 'post',
    params: data,
    data: data
  })
}

export function getRuleDetails (data) {
  return axios({
    url: api.getRuleDetails,
    method: 'post',
    params: data,
    data: data
  })
}

export function getRulesBySearch (data) {
  return axios({
    url: api.getRulesBySearch,
    method: 'post',
    params: data,
    data: data
  })
}
