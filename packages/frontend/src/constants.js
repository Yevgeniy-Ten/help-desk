import axios from "axios";

export const facebookAppId = "";
export const imageStub =
    "https://imagizer.imageshack.com/img922/9586/q0vczR.jpg";
// export const imageStub =
//   "https://lh3.googleusercontent.com/proxy/w9oDeFv84ocz0JOY-EZX1R1ZR8EfWHKRRiR1gz8im854KStziEQnTc5RHZNbC0FEH8tL_TOsWfqY3Y02jbH_r0gb9mk0gDVPKcQZAi9Sj9MwyqdxHc6Opjg";
// export const apiURL = `http://${process.env.REACT_APP_BACK_HOST || "localhost"}:${process.env.REACT_APP_BACK_PORT || 3000}`;

export const apiURL = `http://localhost:${process.env.REACT_APP_BACK_PORT || 3000}`;
export const instance = axios.create({
    baseURL: apiURL,
    withCredentials: "include",
});
export const prioritets = [
    {
        name: "Критично",
        value: "Критично",
    },
    {
        name: "Стандартно",
        value: "Стандартно",
    },
    {
        name: "Средний",
        value: "Средний",
    },
    {
        name: "Срочно",
        value: "Срочно",
    },
];
export const statuses = [
    {
        name: "Открыто",
        value: "Открыто",
    },
    {
        name: "Выполняется",
        value: "Выполняется",
    },
    {
        name: "Выполнено",
        value: "Выполнено",
    },
];
