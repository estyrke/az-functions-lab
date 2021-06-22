export const jsonResponse = (statusCode: number, jsonBody: any) => ({
  status: statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: jsonBody,
});
