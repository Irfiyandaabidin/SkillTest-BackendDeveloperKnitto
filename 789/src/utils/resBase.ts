const resSuccess = (message = 'Success', data : null | undefined | any = null , statusCode = 200) => {
  return {
    message: message,
    statusCode: statusCode,
    error: false,
    data: data
  }
}

export default resSuccess