const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    if (res.headersSent) {
      return next(err);
    }
    
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Error interno del servidor",
      error: process.env.NODE_ENV === 'development' ? err : {}
    });
  };
  
  module.exports = errorHandler;