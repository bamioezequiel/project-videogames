export const validationsRegister = (input: any) => {
  let errors = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    dateBirth: "",
  };
  const emailRegex = /\S+@\S+/;
  const passwordRegex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/g;
  const phoneRegex = /^\d{1,10}$/;

  if (!input.firstname) {
    errors.firstname = "Firstname is required";
  } else if (input.firstname.length > 255) {
    errors.firstname = "Enter less than 255 characters";
  }

  if (!input.lastname) {
    errors.lastname = "Lastname is required";
  } else if (input.lastname.length > 255) {
    errors.lastname = "Enter less than 255 characters";
  }

  if (!emailRegex.test(input.email) || input.email === "") {
    errors.email = "Invalid email";
  }
  if (!passwordRegex.test(input.password) || input.password === "") {
    errors.password = "Invalid password";
  } else if (input.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!phoneRegex.test(input.phone) || input.phone === "") {
    errors.phone = "Invalid phone";
  } else if (input.phone.length < 10) {
    errors.phone = "Phone must be at least 10 characters";
  }

  if (input.dateBirth === "") {
    errors.dateBirth = "Date of birth is required";
  } else if ( new Date(input.dateBirth).getFullYear() > new Date().getFullYear() - 13 ) {
    errors.dateBirth = "Must be over 13 years old";
  }

  return errors;
};

export const validationsLogin = (input: any) => {
  let errors = {
    email: "",
    password: "",
    general: "",
  };
  const emailRegex = /\S+@\S+/;

  if (!emailRegex.test(input.email) || input.email === "") {
    errors.general = "Enter valid data";
  }

  return errors;
};

export const validationsUpdate = (input: any) => {
  let errors = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    picture: "",
    dateBirth: "",
  };
  
  const emailRegex = /\S+@\S+/;
  const phoneRegex = /^\d{1,10}$/;

  if (!input.firstname) {
    errors.firstname = "Firstname is required";
  } else if (input.firstname.length > 255) {
    errors.firstname = "Enter less than 255 characters";
  }

  if (!input.lastname) {
    errors.lastname = "Lastname is required";
  } else if (input.lastname.length > 255) {
    errors.lastname = "Enter less than 255 characters";
  }

  if (!emailRegex.test(input.email) || input.email === "") {
    errors.email = "Invalid email";
  }

  if (!phoneRegex.test(input.phone) || input.phone === "") {
    errors.phone = "Invalid phone";
  } else if (input.phone.length < 10) {
    errors.phone = "Phone must be at least 10 characters";
  }

  if (input.dateBirth === "") {
    errors.dateBirth = "Date of birth is required";
  } else if ( new Date(input.dateBirth).getFullYear() > new Date().getFullYear() - 13 ) {
    errors.dateBirth = "Must be over 13 years old";
  }

  return errors;
}