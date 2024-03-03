module.exports = {
    isAdmin: (req, res, next) => {
      const isAdmin = req.user && req.user.isAdmin;
      
      if (isAdmin) {
        return next();
      }
      return res.status(403).json({ message: 'Forbidden. Admin privileges required.' });
    },
  };