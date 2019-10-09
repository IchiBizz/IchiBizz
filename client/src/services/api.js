import axios from "axios";

const signup = (username, email, password) => {
  return axios
    .post("/api/auth/signup", { username, email, password })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const login = (email, password) => {
  return axios
    .post("/api/auth/login", { email, password })
    .then(response => {
      console.log("login api? :", response);
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const logout = () => {
  return axios
    .delete("/api/auth/logout")
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export { signup, login, logout };
