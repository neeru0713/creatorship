module.exports = {
    API_URL:
      process.env.NODE_ENV === "production"
        ? "https://tensorgo-assignment.onrender.com"
        : "http://localhost:8080",
  };
   