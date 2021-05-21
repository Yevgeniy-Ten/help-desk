export const getMenuShow = (state) => {
  return state.faqs;
};
export const getBookkeeping = (state) => {
  return state.faqs.bookkeeping;
};
export const getSupports = (state) => {
  return state.faqs.supports;
};
export const getWebsites = (state) => {
  return state.faqs.websites;
};
export const getMedicine = (state) => {
  return state.faqs.medicine;
};
export const getfaqsLoader = (state) => {
  return state.faqs.isLoading;
};
export const getEditableElement = (state) => {
  return state.faqs.editableSetting;
};
export const getMailMessages = (state) => {
  return state.faqs.mailMessages;
};
