export const getFaqs = (state) => {
  return state.faqs.faqs;
};
export const getFaqsLoader = (state) => {
  return state.faqs.isLoading;
};
export const getEditableFaqs = (state) => {
  return state.faqs.editableFAQS;
};
