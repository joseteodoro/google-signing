const path = require("path");
const express = require("express");
const { googleCloudAuthId, afterLogin } = require('./config');

const notfound = (_, res) => {
  res.status(404).json({ message: "not found on this server." });
};

const ok = (_, res) => {
  res.status(200).json({ message: "ok" });
};

const app = express();
app.use(express.json({limit: '1mb'}))
app.use(express.urlencoded({limit: '1mb'}))
app.get("/health/liveness", ok);
app.get("/health/readiness", ok);
app.use("/static", express.static(path.join(__dirname, "static")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.get("/", (req, res) =>
  res.send(
    '<h1 style="color: blue">Utilizando Template Engine Pug com Express</h1>'
  )
);
app.get("/login-popup", (req, res) =>
  res.render('login-popup', { googleCloudAuthId, afterLogin })
);

app.get("/login-redirect", (req, res) =>
  res.render('login-redirect', { googleCloudAuthId, afterLogin })
);

app.get("/logged", (req, res) => {
    console.log({ ...req })
    res.json({message: "ok"})
  });

app.post("/logged", (req, res) => {
  console.log({ ...req })
  res.json({message: "ok"})
});

// non-existent routes will recieve Forbidden
app.use(notfound);

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
