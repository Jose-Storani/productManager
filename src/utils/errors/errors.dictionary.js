
export const errors = {
    BadRequest: {
        name: "400_BAD_REQUEST",
        cause:
            "The request sent by the client was syntactically incorrect or contains invalid parameters.",
        message: "Bad Request",
        code: 400,
    },

    Unauthorized: {
        name: "401_UNAUTHORIZED",
        cause:
            "The request requires authentication or the authentication credentials provided are invalid.",
        message: "Authentication is required.",
        code: 401,
    },

    Forbidden: {
        name: "403_FORBIDDEN",
        message: "Access is forbidden.",
        cause: "The server understood the request, but is refusing to fulfill it.",
        code: 403,
    },

    NotFound: {
        name: "404_NOT_FOUND",
        message: "The requested resource was not found.",
        cause: "The requested resource could not be found on the server.",
        code: 404,
    },

    MethodNotAllowed: {
        name: "405_METHOD_NOT_ALLOWED",
        message: "The HTTP method is not allowed.",
        cause:
        "The requested HTTP method is not supported for the requested resource.",
        code: 405,
    },

    InternalServerError: {
        name: "500_INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred on the server.",
        cause: "An unexpected error occurred on the server.",
        code: 500,
    },

    BadGateway: {
        name: "502_BAD_GATEWAY",
        message: "Bad Gateway",
        cause:
        "The server, while acting as a gateway or proxy, received an invalid response from an upstream server.",
        code: 502,
    },

    GatewayTimeout: {
        name: "504_GATEWAY_TIMEOUT",
        message: "Gateway Timeout",
        cause:
        "The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server.",
        code: 504,
    },

		
};
