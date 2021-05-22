export const getWebsites = (state) => {
  return state.faqs.faqs;
};
export const getfaqsLoader = (state) => {
  return state.faqs.isLoading;
};
export const getEditableElement = (state) => {
  return state.faqs.editableSetting;
};
