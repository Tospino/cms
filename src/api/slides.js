import axios from '@/utils/axios'

const api = {
  getHomeSlides: '/interfaces/homePicture/list',
  getNewsSlides: '/interfaces/newsPicture/list'
}

export function getHomeSlides (data) {
  return axios({
    url: api.getHomeSlides,
    method: 'post',
    data: data
  })
}

export function getNewsSlides (data) {
  return axios({
    url: api.getNewsSlides,
    method: 'post',
    data: data
  })
}
