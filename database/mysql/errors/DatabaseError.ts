class DatabaseError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default DatabaseError;
