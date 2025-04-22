import {Request, Response, NextFunction} from 'express'

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: {userId: string}
  }
}

import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

// Secret used for signing and verifying JWT tokens
const secret = process.env.JWT_SECRET || 'your-secret-key'

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({message: 'No token provided, access denied'})
  }

  try {
    const decoded = jwt.verify(token, secret) as {userId: string}

    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({message: 'Invalid or expired token'})
  }
}
