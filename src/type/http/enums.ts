export enum HttpExitCode {
  OK = 200,
  CREATED = 201,
}

export enum HttpErrorUserCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export enum HttpErrorServerCode {
  INTERNAL_SERVER_ERROR = 500,
}
