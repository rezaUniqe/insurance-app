const createUrlFromPath = (path: string) => {
  return process.env.BASE_URL + path;
};

export const ApiEndpoints = {
  submitForm: createUrlFromPath("/api/insurance/forms/submit"),
  getSubmittedForms: createUrlFromPath("/api/insurance/forms/submit"),
  getForms: createUrlFromPath("/api/insurance/forms"),
};
