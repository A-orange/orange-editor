import axios from "axios";

// 获取网址数据
export function getUrlData(query: any) {
  return axios({
    url: '/woLai/v1/embed/iframely',
    params: query,
    headers: {
      // 'wolai-app-version': '1.1.0-16'
    }
  })
}