import axios from "axios";

//401 Unauthorized
//403 Forbidden
//404 Not Found
//500 Internal Server Error
axios.interceptors.request.use(
  (request) => {
    // Do something before request is sent
    document.body.classList.add("loading"); //this causes flickering in page whenever using axios request
    return request;
  },
  (error) => {
    // Do something with request error
    document.body.classList.remove("loading");
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    document.body.classList.remove("loading");
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    document.body.classList.remove("loading");
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log("Unauthorised");
          // alert("You are UnauthoriZed. Please Log In. ! ");
          // window.location.href = "/app/login"; //redirect to login page
        }
      }
    }

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
