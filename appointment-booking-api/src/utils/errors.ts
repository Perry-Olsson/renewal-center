export class DuplicateError extends Error {
  constructor(resource: string, message: string) {
    super(message);
    this.name = `duplicate${resource}`;
  }
}

export class TimeError extends Error {
  constructor(
    message = "Appointments must be scheduled and end at quarter hours"
  ) {
    super(message);
    this.name = "invalidTime";
  }
}

export class TimestampError extends Error {
  constructor(timestamp: any) {
    super(
      `timestamp ${timestamp} is invalid. Timestamp must be in json format`
    );
    this.name = "invalidTimestamp";
  }
}

export class EmailError extends Error {
  constructor(email: any) {
    super(`email "${email}" is not a valid email`);

    this.name = "invalidEmail";
  }
}

export class LoginError extends Error {
  constructor() {
    super("Invalid email or password");

    this.name = "invalidLogin";
  }
}

export class QueryError extends Error {
  constructor() {
    super(
      "Appointments query string must contain a 'start' and 'finish' field"
    );
    this.name = "invalidQuery";
  }
}

export class BoundryError extends Error {
  constructor() {
    super("The 'start' and 'end' queries must be valid numbers");

    this.name = "invalidBoundry";
  }
}
