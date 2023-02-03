import { toast } from "react-toastify";


export const validationsCreateGame = (input) => {
  const errors = {
    name: "",
    description: "",
    released: "",
    main_image: "",
    image0: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: '',
    image6: '',
    short_screenshots: "",
    price: "",
    on_sale: "",
    stock: "",
    featured: "",
    is_new: "",
    platforms: "",
    genres: "",
    tags: "",
  };

  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

  if (!input.name) {
    errors.name = "Name is required";
  } else if (input.name.length > 255) {
    errors.name = "Enter less than 255 characters";
  }
  if (!input.description) {
    errors.description = "Description is required";
  } else if (input.description.length > 1500) {
    errors.description = "Enter less than 1500 characters";
  }

  if (!input.price) {
    errors.price = "Price is required";
  } else if (input.price < 0) {
    errors.price = "";
  } else if (input.price > 10000) {
    errors.price = "";
  }

  if (!input.on_sale) {
    errors.on_sale = "On sale is required";
  } else if (input.on_sale < 0) {
    errors.on_sale = "";
  } else if (input.on_sale > 100) {
    errors.on_sale = "";
  }

  if (!input.stock) {
    errors.stock = "Stock is required";
  } else if (input.stock < 0) {
    errors.stock = "";
  }

  if (!imageRegex.test(input.image0) || !input.image0) {
    errors.short_screenshots = "The image 1 not valid";
  } else if (!imageRegex.test(input.image1) || !input.image1) {
    errors.short_screenshots = "The image 2 not valid";
  } else if (!imageRegex.test(input.image2) || !input.image2) {
    errors.short_screenshots = "The image 3 not valid";
  } else if (!imageRegex.test(input.image3) || !input.image3) {
    errors.short_screenshots = "The image 4 not valid";
  } else if (!imageRegex.test(input.image4) || !input.image4) {
    errors.short_screenshots = "The image 5 not valid";
  } else if (!imageRegex.test(input.image5)) {
    errors.short_screenshots = "The image 6 not valid";
  } else if (!imageRegex.test(input.image6)) {
    errors.short_screenshots = "The image 7 not valid";
  }

  if (input.tags.length > 20) {
    errors.tags = "Max 20";
  }
  if (input.genres.length > 20) {
    errors.genres = "Max 20";
  }
  if (input.platforms.length > 10) {
    errors.platforms = "Max 10";
  }

  return errors;
};

export const toastOptions = {
  osition: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const handleValidationLogin = (input) => {
  const { email, password } = input;

  if (email === "") {
    toast.error("Email and Password is required.", toastOptions);
    return false;
  } else if (password === "") {
    toast.error("Email and Password is required.", toastOptions);
    return false;
  }

  return true;
};

export const handleValidationSingup = (input) => {
    const { name, lastname, email, password, confirmPassword } = input;

    if (name.length < 3) {
      toast.error(
        "Name should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (lastname.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

export const validationsUpdate = (input) => {
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
  } else if (
    new Date(input.dateBirth).getFullYear() >
    new Date().getFullYear() - 13
  ) {
    errors.dateBirth = "Must be over 13 years old";
  }

  return errors;
};
