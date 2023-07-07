export enum UserEndpoints {
  LOGIN = 'users/login',
  REGISTER = 'users/register',
  GET_USER = 'users/',
  UPDATE_USER = 'users/',
  SUBSCRIBE_FOR_NEWS = 'email/subscribe/',
}

export enum OrderEndpoints {
  GET_CURRENT_ORDERS = 'orders/',
  GET_ORDERS_HISTORY = 'orders/history/',
  GET_ORDER_BY_ID = 'orders/one/',
  PLACE_ORDER = 'orders/',
  DELETE_ORDER = 'orders/',
}

export enum ProductEndpoints {
  GET_PRODUCTS = 'products/',
  CREATE_PRODUCT = 'products/create',
  DELETE_PRODUCT = 'products/',
  UPDATE_PRODUCT = 'products/',
  GET_PRODUCTS_BY_ID = 'products/one/',
  GET_PRODUCTS_HISTORY = 'products/history/',
}
