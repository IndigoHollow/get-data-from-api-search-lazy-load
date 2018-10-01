const requestApiSuccess = data => {
  return { type: "REQUESTED_API_SUCCEEDED", payload: data };
};

export default requestApiSuccess;
