const isAuth = () => {
//   return localStorage.getItem("token");
    return "token";
};

export const userType = () => {
//   return localStorage.getItem("type");
    return "jobseeker";
};

export default isAuth;
