export const handleErrors = (error: string) => {
    const errors = { email: "", password: "" };
    const message = error;
  
    if (message === "USER_ALREADY")
      errors.email = "That email already used";
    if (message === "USER_NOT_FOUND")
      errors.email = "That email does not exist";
    if (message === "PASSWORD_INCORRECT")
      errors.password = "Incorrect Email or Password"; 
    
    return errors;
  };
  