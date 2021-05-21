export const getTopics = (state) => {
  return state.settings.topics;
};
export const getReglaments = (state) => {
  return state.settings.reglaments;
};
export const getCompanies = (state) => {
  return state.settings.companies;
};
export const getDepartments = (state) => {
  return state.settings.departments;
};
export const getSettingsLoader = (state) => {
  return state.settings.isLoading;
};
export const getPositions = (state) => {
  return state.settings.positions;
};
export const getEditableElement = (state) => {
  return state.settings.editableSetting;
};
export const getOrgStructures = (state) => {
  return state.settings.orgStructures;
};
export const getMailMessages = (state) => {
  return state.settings.mailMessages;
};
