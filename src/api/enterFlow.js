import axios from '@/utils/axios'

const api = {
  getEnterFlow: '/interfaces/process/list'
}

export function getEnterFlow (data) {
  return axios({
    url: api.getEnterFlow,
    method: 'post',
    data: data
  })
}
