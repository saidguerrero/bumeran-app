export const configHeaders = (token, params) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
  params: params,
});
