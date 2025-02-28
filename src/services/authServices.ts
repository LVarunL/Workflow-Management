import AuthController from "../controllers/authController";

const AuthServices = (function() {
  function login(email: string, password: string) {
    //handle validation
    
    const response = AuthController.signin(email,password);
    console.log(response);
    const responseCode = response.responseCode;
    if(responseCode===404){
        //user not found
        console.log("404")
    }
    else if(responseCode===401){
        //wrong password
        console.log("401")
    }
    else if(responseCode===200){
        //set token in localsotrage
        console.log("200");
    
    }
    //showtoast
    //redirect wherever needed
  }

  function register(email: string, password: string, confirmPassword: string) {
    if(password!==confirmPassword){
        console.log("passwords do not match")
    }
    
    const response = AuthController.signup(email,password);

    //showtoast
    //redirect to login page
  }
  const saveToken = function (token: string) {
      localStorage.setItem("auth", token);
    };
  
    const removeToken = function () {
      localStorage.removeItem("auth");
    };
  return {
    login, register
  }
  

})();

export default AuthServices;