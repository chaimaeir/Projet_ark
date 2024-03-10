module.exports = {
    isAdmin: (req, res, next) => {
      const userRole = req.user && req.user.role;
      const isAdmin = userRole === 'admin';
      if (isAdmin) {
        return next();
      }
      return res.status(403).json({ message: 'Forbidden. Admin privileges required.' });
    },
  };