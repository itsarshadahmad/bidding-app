const errorHandler = (error, req, res, next) => {
    console.log(error);
    return res.status(error.statusCode || 500).json({
        statusCode: error.statusCode,
        success: false,
        timestamp: new Date().toISOString(),
        error: error.name,
        message: error.message,
        ...error,
        errors: error?.errors,
        stack: error.stack,
    });
};

export { errorHandler };
