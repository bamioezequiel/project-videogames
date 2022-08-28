export const validationsRegister = (input: any) => {
  let errors = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
  const emailRegex = /\S+@\S+/;
  const passwordRegex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/g;

  if (!input.firstname || input.firstname.length === 0) {
    errors.firstname = "Ingrese un nombre";
  }

  if (!input.lastname || input.lastname.length === 0) {
    errors.lastname = "Ingrese un apellido";
  }

  if (!emailRegex.test(input.email)) {
    if (input.email !== "") {
      errors.email = "Ingrese un e-mail válido";
    }
  }
  if (!passwordRegex.test(input.password) || input.password === "") {
    errors.password = "Contraseña no valida";
  } else if (input.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }
  if (input.repeatPassword.length < 8) {
    errors.repeatPassword = "La contraseña debe tener al menos 8 caracteres";
  } else if (input.repeatPassword !== input.password) {
    if (input.repeatPassword !== "") {
      errors.repeatPassword = "Las contraseñas no coinciden";
    }
  }

  return errors;
};
export const validationsLogin = (input: any) => {
  let errors = {
    email: "",
    password: "",
  };
  const emailRegex = /\S+@\S+/;

  if (!emailRegex.test(input.email)) {
    if (input.email !== "") {
      errors.email = "Ingrese datos válidos";
    }
  }
  
  return errors;
};
