// export const isValidPassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)
export const isValidPassword = (password) => /^[0-9a-zA-Z!@#$%^&*]{6,40}$/.test(password)

// eslint-disable-next-line no-useless-escape
export const isValidEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/.test(email)
