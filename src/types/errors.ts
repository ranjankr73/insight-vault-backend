export class HttpError extends Error {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message);
        this.name = 'HttpError';
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message: string = 'Unauthorized') {
        super(401, message);
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string = 'Forbidden') {
        super(403, message);
        this.name = 'ForbiddenError';
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string = 'Not Found') {
        super(404, message);
        this.name = 'NotFoundError';
    }
}

export class ConflictError extends HttpError {
    constructor(message: string = 'Resource already exists') {
        super(409, message);
        this.name = 'ConflictError';
    }
}

export class ValidationError extends HttpError {
    constructor(message: string = 'Validation failed') {
        super(400, message);
        this.name = 'ValidationError';
    }
}