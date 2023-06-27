class Response {
    httpSuccessResponse(res, status, result) {
      res.status(status).json(result);
    }
  
    httpErrorResponse(res, error: any, code: number = 500) {
      let statusCode = error?.code ? error?.code : code;
  
      let message = error?.message ? error.message : error;
  
      if (typeof message !== "string") {
        message = "Failed to process this request";
      }
  
      res.status(statusCode).json({ error: message });
    }
  }
  
  export default new Response();