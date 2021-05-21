export const getMenuShow = (state) => {
  return state.faqs;
};
export const getReglaments = (state) => {
  return state.faqs.reglaments;
};
export const getCompanies = (state) => {
  return state.faqs.companies;
};
export const getDepartments = (state) => {
  return state.faqs.departments;
};
export const getfaqsLoader = (state) => {
  return state.faqs.isLoading;
};
export const getPositions = (state) => {
  return state.faqs.positions;
};
export const getEditableElement = (state) => {
  return state.faqs.editableSetting;
};
export const getOrgStructures = (state) => {
  return state.faqs.orgStructures;
};
export const getMailMessages = (state) => {
  return state.faqs.mailMessages;
};
