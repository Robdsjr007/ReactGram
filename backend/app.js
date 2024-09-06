require("dotenv").config()

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Solve CORS
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB connection
require("./config/db.js");

// Routes
const router = require("./src/routes/Router.js");
app.use(router);

// Function to start server
const startServer = (port) => {
  app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Porta ${port} está em uso. Tentando na porta ${port + 1}...`);
      startServer(port + 1); // Tente a próxima porta
    } else {
      console.error('Erro ao iniciar o servidor:', err);
    }
  });
};

// Start the server
const port = parseInt(process.env.PORT, 10) || 5000;
startServer(port);
