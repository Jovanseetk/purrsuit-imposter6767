import { Router } from 'express';
import passport from '../passport.js';
import { signToken } from '../middleware.js';

const router = Router();
const REDIRECT_URL = process.env.FRONTEND_URL; // after successful login, homepage will conditionally render
const LOGIN_DAYS = 7; // user will stay logged in for 7 days
const cookieOptions = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: LOGIN_DAYS * 24 * 60 * 60 * 1000,
};

// redirect user to google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

// google redirects back
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const token = signToken({ id: req.user.id, email: req.user.email });
    res.cookie('token', token, { ...cookieOptions, httpOnly: true });
    res.cookie('logged_in', 'true', { ...cookieOptions, httpOnly: false });
    res.redirect(REDIRECT_URL);
  }
);

// upon logout, clear cookies
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('logged_in');
  res.json({ success: true });
});

export default router;