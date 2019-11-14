import express from 'express'
import Routes from './routes'
import { loginAdmin, signupUser } from './middlewares/auth';
import { fetchArticles } from './middlewares/article';

const api = express.Router()

/**
 * User endpoints
 */
api.post(Routes.auth.login, loginAdmin)

api.post(Routes.auth.signup, signupUser)

/**
 * Article endpoints
 */
api.get(Routes.articles["fetch-all"], fetchArticles)

export default api;