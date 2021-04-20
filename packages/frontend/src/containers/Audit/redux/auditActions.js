import {
  AUDIT_GET_SUCCESS,
  AUDIT_REQUEST_ERROR,
  AUDIT_REQUEST_STARTED
} from "./auditType";

const auditStarted = () => {
  return { type: AUDIT_REQUEST_STARTED };
};
const auditError = (errors) => {
  return { type: AUDIT_REQUEST_ERROR, errors };
};
const auditGetSuccess = (audit) => {
  return { type: AUDIT_GET_SUCCESS, audit };
};

export const fetchAudit = () => {
  return async (dispatch, _, axios) => {
    dispatch(auditStarted());
    try {
      const response = await axios.get("/requests/audit");
      dispatch(auditGetSuccess(response.data));
    } catch (err) {
      dispatch(auditError(err));
    }
  };
};
