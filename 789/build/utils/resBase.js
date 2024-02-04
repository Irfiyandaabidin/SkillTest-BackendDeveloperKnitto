const resSuccess = (message = 'Success', data = null, statusCode = 200) => {
    return {
        message: message,
        statusCode: statusCode,
        error: false,
        data: data
    };
};
export default resSuccess;
