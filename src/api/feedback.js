import axios from '@/utils/axios'

const api = {
  solveHandler: `/interfaces/solveRecording/add`,
  feedbackHandler: '/interfaces/feedback/add',
  getTagList: '/interfaces/problemLabel/list'
}

export function solveHandler (params) {
  return axios({
    url: api.solveHandler,
    method: 'get',
    params: params
  })
}

export function feedbackHandler (data) {
  return axios({
    url: api.feedbackHandler,
    method: 'get',
    params: data
  })
}

export function getTagList (data) {
  return axios({
    url: api.getTagList,
    method: 'post',
    data: getTagList
  })
}
