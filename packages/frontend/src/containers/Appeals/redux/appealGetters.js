export const getAppealState = (state) => {
  return state.appeal;
};
export const getAppealCurrent = (state) => {
  return state.appeal.appeal;
};
export const getAppealStateLoader = (state) => {
  return state.appeal.isLoading;
};
