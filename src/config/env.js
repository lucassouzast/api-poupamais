function getJwtSecret() {
  return process.env.JWT_SECRET || process.env.JWT_KEY || process.env.SECRET_KEY;
}

function validateEnv() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI nao definida");
  }

  if (!getJwtSecret()) {
    throw new Error("JWT_SECRET nao definida (ou alias JWT_KEY/SECRET_KEY)");
  }
}

module.exports = {
  getJwtSecret,
  validateEnv
};
