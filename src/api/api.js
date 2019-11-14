import express from 'express'
import Routes from './routes'
import { loginAdmin, signupUser } from './middlewares/auth';

const api = express.Router()

/**
 * User endpoints
 */
api.post(Routes.auth.login, loginAdmin)

api.post(Routes.auth.signup, signupUser)

export default api;