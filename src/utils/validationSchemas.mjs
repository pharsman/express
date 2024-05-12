export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "UserName must be at least 5 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be String",
    },
  },
  displayname: {
    notEmpty: {
      errorMessage: "Displayname cannot be empty",
    },
  },
  password: true
};
