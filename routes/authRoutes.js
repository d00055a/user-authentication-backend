const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { register, login, logout, me } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', auth, me);            

// Sensitive route
router.get("/secret", auth, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}!` });
});

module.exports = router;
