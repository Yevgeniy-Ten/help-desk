export const getAppealState = (state) => {
  return state.appeal;
};
export const getAppealCurrent = (state) => {
  return state.appeal.appeal;
};
export const getAppealStateLoader = (state) => {
  return state.appeal.isLoading;
};
export const getAppealMessages = (state) => {
  return state.appeal.messages;
};
