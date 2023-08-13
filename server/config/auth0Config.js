import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience: "https://dev-yb8l6fr6pu5d8zju.us.auth0.com/api/v2/",
    issuerBaseURL: "https://dev-yb8l6fr6pu5d8zju.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck