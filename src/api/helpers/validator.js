export const validateEmail = email => {
  // eslint-disable-next-line
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (mailformat.test(email)) {
    return {
      correct: true,
      status: "is-success",
      message: "Your email is valid ✅"
    };
  } else {
    return {
      correct: false,
      status: "is-danger",
      message: "Your should provide a valid email ❌"
    };
  }
};

export const validatePassword = password => {
  if (password.length < 6 || password.length === 0) {
    return {
      correct: false,
      status: "is-danger",
      message: "Please provide a password above six characters ❌"
    };
  } else {
    return {
      correct: true,
      status: "is-success",
      message: "Your password is long enough ✅"
    };
  }
};

export const validateString = (string) => {
  if (string < 3 && string === "") {
    return {
      correct: false,
      status: "is-danger",
      message: "You name is not long enough ⚠️"
    };
  } else {
    return {
        correct: true,
        status: 'is-success',
        message: 'Your name is perfect ✅'
    }     
  }
};
