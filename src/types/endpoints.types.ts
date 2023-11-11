export enum UserEndpoints {
  LOGIN = 'users/login',
  REGISTER = 'users/register',
  GET_USER = 'users/',
  UPDATE_USER = 'users/',
  SUBSCRIBE_FOR_NEWS = 'email/subscribe/',
}

export enum OrderEndpoints {
  GET_ORDERS = 'orders/',
  SEARCH_ORDERS = 'orders/search',
  GET_ORDER_BY_ID = 'orders/',
  GET_COUNTS = 'orders/status/counts',
  PLACE_ORDER = 'orders/create',
  DELETE_ORDER = 'orders/',
  CHANGE_STATUS = 'orders/status',
}

export enum ProductEndpoints {
  PRODUCTS = 'products/',
  GET_ONE = 'products/one/',
  SEARCH = 'products/search',
  CREATE_PRODUCT = 'products/create',
  GET_PRODUCTS_HISTORY = 'products/history/',
}

export enum DriverEndpoints {
  DRIVERS = 'drivers/',
  CREATE_DRIVER = 'drivers/create',
  UPDATE_DRIVER = 'drivers/',
  DELETE_DRIVER = 'drivers/',
}

export enum UsersEndpoints {
  USERS = 'users/',
  GET_ONE = 'users/one',
  USERS_LOGIN = 'users/login',
  CREATE_USER = 'users/create',
  UPDATE_USER = 'users/',
  DELETE_USER = 'users/',
}

export enum CustomerEndpoints {
  CUSTOMER = 'customers/',
  SEARCH = 'customers/search/',
  CUSTOMER_UPDATE = 'customers/',
  CUSTOMER_DELETE = 'customers/',
  CUSTOMER_ADDRESS = '/customers/address/',
}

export enum CategoryEndpoints {
  CATEGORIES = 'categories/',
  CREATE_CATEGORY = 'categories/create',
  UPDATE_CATEGORY = 'categories/',
  DELETE_CATEGORY = 'categories/',
}

export enum StorageEndpoints {
  STORAGES = 'storages',
  STORAGE_IMPORTS = 'storages/imports',
  ADD_STORAGE_IMPORTS = 'storages/create',
  UPDATE_STORAGE_IMPORT = 'storages/',
  DELETE_STORAGE_IMPORTS = 'storages/',
}

export enum NotesEndpoints {
  NOTES = 'notes/',
  NOTES_CREATE = 'notes/create',
  NOTES_UPDATE = 'notes/',
  NOTES_DELETE = 'notes/',
}

export enum CommonEndpoints {
  SEARCH = 'common/',
}
