export const createResponse = (message = '', data = null, statusCode = 200) => {
    const response = {
        message,
        statusCode
    };

    if (data !== null && data !== undefined) {
        response.data = data;
    }

    return response;
};
