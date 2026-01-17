declare global {
  namespace Express {
    interface Request {
      user_id?: string;
      email?: string;
      firstname?: string;
      lastname?: string;
      fullname?: string;
      role?: string;
    }
  }
}

export { };
