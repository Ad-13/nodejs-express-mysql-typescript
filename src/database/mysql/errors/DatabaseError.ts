class DatabaseError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export default DatabaseError;
