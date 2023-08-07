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
  PLACE_ORDER = 'orders/create',
  DELETE_ORDER = 'orders/',
}

export enum ProductEndpoints {
  PRODUCTS = 'products/',
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
}

export enum CategoryEndpoints {
  CATEGORIES = 'categories/',
  CREATE_CATEGORY = 'categories/create',
  UPDATE_CATEGORY = 'categories/',
  DELETE_CATEGORY = 'categories/',
}

export enum StorageEndpoints {
  STORAGE_IMPORTS = 'storages/',
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
