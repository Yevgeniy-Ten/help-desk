export const getFieldError = (errors, fieldName) => {
    try {
        return errors.errors[fieldName].message;
    } catch {
        return undefined;
    }
}
export const createMultiFormData = (data) => {
    const multiPostData = new FormData()
    Object.keys(data).forEach((name) => multiPostData.append(name, data[name]))
    return multiPostData
}