import axios from '@/utils/axios'

const api = {
  getNewsListForHome: '/interfaces/newsContent/list',
  getNewsTypeList: '/interfaces/newsType/list',
  getNewsList: '/interfaces/newsContent/some',
  getNewsListAll: '/interfaces/newsContent/all',
  getNewsDetails: '/interfaces/newsContent/detail',
  getRecentNews: '/interfaces/newsContent/title'
}

// 首页新闻列表
export function getNewsListForHome (data) {
  return axios({
    url: api.getNewsListForHome,
    method: 'post',
    params: data,
    data: data
  })
}

// 获取新闻分类列表
export function getNewsTypeList (data) {
  return axios({
    url: api.getNewsTypeList,
    method: 'post',
    params: data,
    data: data
  })
}

// 获取新闻列表
export function getNewsList (data) {
  return axios({
    url: api.getNewsList,
    method: 'post',
    params: data,
    data: data
  })
}

// 获取全部新闻列表
export function getNewsListAll (data) {
  return axios({
    url: api.getNewsListAll,
    method: 'post',
    params: data,
    data: data
  })
}

// 获取新闻详情
export function getNewsDetails (data) {
  return axios({
    url: api.getNewsDetails,
    method: 'post',
    params: data,
    data: data
  })
}

// 获取近期新闻
export function getRecentNews (data) {
  return axios({
    url: api.getRecentNews,
    method: 'post',
    params: data,
    data: data
  })
}
