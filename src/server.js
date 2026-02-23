require("dotenv").config();
const app = require("./app");
const connectDatabase = require("./database");
const { validateEnv } = require("./config/env");

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    validateEnv();
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar API:", error.message);
    process.exit(1);
  }
}

bootstrap();
