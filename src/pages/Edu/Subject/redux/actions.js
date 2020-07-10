import { reqGetSubject } from "@api/edu/subject";

import { GET_SUBJECT_LIST } from "./constants";

const getSubjectListSync = list => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

export const getSubjectList = (page, limit) => {
  return dispatch => {
    return reqGetSubject(page, limit).then(response => {
      console.log(response, 'abc')
      dispatch(getSubjectListSync(response));
      return response
    });
  };
};

