
const unAuthenticateError = (msg = 'Your Session May Have Expired!') => {
    const error = new Error(msg)
    error.status = 401
    return error
}

const notFoundError = (msg='Resource not found') => {
    const error = new Error(msg);
    error.status = 404;
    return error;
}

const serverError = (msg='Server Not Responding')=> {
    const error = new Error(msg)
    error.status = 500
    return error
}

export {
    unAuthenticateError,
    serverError,
    notFoundError,
    
}