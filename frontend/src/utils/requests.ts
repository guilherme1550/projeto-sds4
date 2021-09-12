// ?? = Significa que se a variável de ambiente não estiver definida, será utilizado http://localhost:8080
export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';