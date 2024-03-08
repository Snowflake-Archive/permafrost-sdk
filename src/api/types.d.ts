/*
  Request Types
*/

export type DefaultError = {
  error: {
    code: "NotFound" | "CouldNotConnect" | string;
    field?: string;
    resource?: string;
    message: string;
  };
};

export type Error<C extends string> = {
  error: {
    code: "NotFound" | "CouldNotConnect" | string | C;
    field?: string;
    resource?: string;
    message: string;
  };
};

/*
  Primitives
*/

export type GenericSuccess = {
  success: true;
};

export type UserPrimitive = {
  id: string;
  username: string;
  displayName: string;
  createdAt: string;
};

export type ApplicationPrimitive = {
  id: string;
  name: string;
  createdAt: string;
  users: number;
};

export type Session = {
  id: string;
  token: string;
  lastActivity: string;
};
