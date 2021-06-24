export interface Context {
    auth?: {
        email?: string
        exp?: bigint
        iat?: bigint
        clienteid?: number
    } | undefined,
    handleLoggout?: Function | any,
    setUser?: Function
}