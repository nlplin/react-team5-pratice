import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";
// const SUBJECT_URL = `http://localhost:3002${BASE_URL}`

// 获取讲师
export function reqGetSubject(page,limit) {
  return request({
    // url: `${BASE_URL}/get/${id}`,
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}
