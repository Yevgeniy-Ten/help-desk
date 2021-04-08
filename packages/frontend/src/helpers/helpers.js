export const getFieldError = (errors, fieldName) => {
    try {
        const error = errors.errors.find(err => err.path === fieldName)
        if (error) return error.message
    } catch {
        return undefined;
    }
}
export const createMultiFormData = (data) => {
    const multiPostData = new FormData()
    Object.keys(data).forEach((name) => multiPostData.append(name, data[name]))
    return multiPostData
}