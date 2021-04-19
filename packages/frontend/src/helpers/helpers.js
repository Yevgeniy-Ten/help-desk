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

export const getHourWork = (millisec) => {
    let seconds = (millisec / 1000).toFixed(0);
    let minutes = Math.floor(seconds / 60);
    let hours = "";
    if (minutes === 0) {
        minutes = "00"
    }
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : ("0" + hours);
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : ("0" + minutes);
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours !== "") {
        return hours + ":" + minutes + ":" + seconds;
    }
    return "00" + ":" + minutes + ":" + seconds;
}