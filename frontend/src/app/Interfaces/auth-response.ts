export interface AuthResponse {
    email: string,
    message: string,
    token:string,
    username:string,
    isAuthenticated: boolean,
    roles: Array<string>,
    refreshTokenExpiration: Date,
}
