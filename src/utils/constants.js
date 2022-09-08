export const USER_STATUS = {
  OFFLINE: 0,
  ONLINE: 1,
}

export const HTTP_REQUEST_CONSTANTS = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
}

export const HTTP_ERROR_MESSAGES = {
  BAD_REQUEST: 'Bad request',
  NOT_FOUND: 'Not found',
}

export const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

// JWT const
export const SECRET_KEY = process.env.JWT_SECRET
export const ACCESS_TOKEN_EXPIRE_BY_SEC = Number(process.env.ACCESS_TOKEN_EXPIRE_BY_SEC) || 3600

// Redis const
export const EXPIRE_DURATION_BY_SEC = Number(process.env.EXPIRE_DURATION_BY_SEC) || 60
export const COOL_DOWN_DURATION_BY_SEC = Number(process.env.COOL_DOWN_DURATION_BY_SEC) || 60
export const RETRY_NUM = Number(process.env.RETRY_NUM) || 5
export const RETRY_PER_CODE = Number(process.env.RETRY_PER_CODE) || 3
export const EXPIRE_RETRY_COUNT_BY_SEC = Number(process.env.EXPIRE_RETRY_COUNT_DURATION_BY_SEC) || 3600

// Mail const
export const MAIL_SENDER = process.env.MAIL_SENDER_ADDRESS
export const TITLE = process.env.MAIL_TITLE
export const HOST_MAIL_NOREPLY = process.env.MAIL_NOREPLY_HOST
export const PORT_MAIL_NOREPLY = process.env.MAIL_NOREPLY_PORT
export const USERNAME_MAIL_NOREPLY = process.env.MAIL_NOREPLY_USERNAME
export const PASSWORD_MAIL_NOREPLY = process.env.MAIL_NOREPLY_PASSWORD

export const ERROR_CODE = {

  UNAUTHORIZED: 30001,
  EXIST_USER: 30002,
  INTERNAL_SERVER_ERROR: 31000,
  // Bad Request
  INVALID_INPUT: 30001,

  // Bad Gateway
  UNAVAILABLE_WEATHER_DATA: 30002,
  INVALID_WEATHER_DATA: 30003,
  EXCEED_REQUEST_QUOTA: 30004,
  REQUEST_TIMEOUT: 30005,
  NOT_FOUND: 30006,
  // Internal server error
  AUTH_SERVICE_ERROR: 30007,
  REQUIRED_JWT_TOKEN: 30008,
  PLAYER_ADDRESS_EXISTED: 30010,
  INVALID_ADDRESS: 30009,
  REQUEST_TOO_MANY_QUOTA: 30012,
  ORDER_REQUEST_REJECTED: 30015,
  ADDRESS_NOT_EXIST: 30013,
  PLAYER_NOT_EXIST: 30014,
}

export const ERROR_MESSAGE = {
  UNAUTHORIZED: 'Unauthorized',
  EXIST_USER: 'User is already exists',

  UNAVAILABLE_WEATHER_DATA: 'Weather data not available',
  INVALID_WEATHER_DATA: 'Invalid weather data',
  EXCEED_REQUEST_QUOTA: 'Exceeded API request quota',
  REQUEST_TIMEOUT: 'Request timeout error',
  NOT_FOUND: 'Not found',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  INVALID_INPUT: 'Invalid input',
  REQUEST_TOO_MANY_QUOTA: 'Too many requests',
  AUTH_SERVICE_ERROR: 'Auth service error',
  REQUIRED_JWT_TOKEN: 'Required JWT token',
  PLAYER_ADDRESS_EXISTED: 'Player address existed',
  INVALID_ADDRESS: 'Invalid address',
  ORDER_REQUEST_REJECTED: 'Order request rejected',
  ADDRESS_NOT_EXIST: 'Address not exist',
  PLAYER_NOT_EXIST: 'Player not exist',
}

export const SUCCESS_CODE = {
  OK: 20000,
  CREATED: 20001,
}

export const SUCCESS_MESSAGE = {
  SUCCESS_CREATED_USER: 'Created user successfully',
  LOGGED_IN: 'Logged in successfully',
}
