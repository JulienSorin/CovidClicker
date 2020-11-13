"use strict;";

const express = require("express");
const faker = require("faker");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const Sequelize = require("sequelize");

// Initialisation serveur
const app = express();

// data file
const dataPath = "./data/objects.json";

var dataFile = require(dataPath);

// Configuration Faker
faker.locale = "fr";

// Sécurité
app.use(cors());

// Configuration parser body
app.use(bodyParser.json());

// Route /
app.get("/", function (req, res) {
  res.send("Server ON");
});

/* Partie Sequelizer */

// Connexion à la base de donnée avec Sequelize
const sequelize = new Sequelize("sqlite:database.db");

// Modèle User avec Sequelize
const User = sequelize.define("user", {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
  },
  playerValues: {
    type: Sequelize.STRING,
    get: function () {
      return JSON.parse(this.getDataValue("playerValues"));
    },
    set: function (value) {
      this.setDataValue("playerValues", JSON.stringify(value));
    },
  },
});

/*User.sync({ force: true }).then(() => {
  console.log("Table user créée");
  User.create({
    username: "alice",
    password:
      "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
  });
  User.create({
    username: "bob",
    password:
      "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
  });
  User.create({
    username: "cyril",
    password:
      "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
  });
});*/

let saveData = function () {
  let json = JSON.stringify(dataFile);
  return new Promise((resolve, reject) => {
    fs.writeFile(dataPath, json, "utf-8", function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

let loadData = function () {
  delete require.cache[require.resolve(dataPath)];
  dataFile = require(dataPath);
};
/*
app.put("/user", function (req, res) {
  const username = req.body.username;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  console.log(username, oldPassword, newPassword);

  User.update(
    {
      password: newPassword,
    },
    {
      where: {
        username: username,
        password: oldPassword,
      },
    }
  ).then((data) => {
    res.status("200").send(data);
  });
});*/

app.delete("/user/:username/:password", function (req, res) {
  const username = req.params.username;
  const password = req.params.password;
  User.destroy({
    where: {
      username: username,
      password: password,
    },
  }).then((data) => {
    res.status("200").send(data);
  });
});

app.post("/objects/:type", function (req, res) {
  const object = req.body.object;
  const type = req.params.type;
  if (object === undefined) {
    res.status("400").send("Donnée non spécifiée.");
  } else if (type === undefined) {
    res.status("400").send("Type de donnée non spécifié.");
  } else {
    dataFile[type].push(object);
    saveData().then(() => {
      loadData();
      res.status("200").send("Donnée ajoutée.");
    });
  }
});

app.delete("/objects/:type/:id", function (req, res) {
  const id = req.params.id;
  const type = req.params.type;
  if (id === undefined) {
    res.status("400").send("Donnée non spécifiée.");
  } else if (type === undefined) {
    res.status("400").send("Type de donnée non spécifié.");
  } else {
    for (var i = 0; i < dataFile[type].length; i++) {
      if (dataFile[type][i].id == id) {
        dataFile[type].splice(i, 1);
      }
    }
    dataFile[type].sort((a, b) => {
      return a.id - b.id;
    });
    saveData().then(() => {
      loadData();
      res.status("200").send("Donnée supprimée.");
    });
  }
});

app.put("/objects/:type/:id", function (req, res) {
  const object = req.body.object;
  const id = req.params.id;
  const type = req.params.type;
  if (object === undefined) {
    res.status("400").send("Donnée non spécifiée.");
  } else if (type === undefined) {
    res.status("400").send("Type de donnée non spécifié.");
  } else {
    for (var i = 0; i < dataFile[type].length; i++) {
      if (dataFile[type][i].id == id) {
        console.log(dataFile[type][i]);
        dataFile[type].splice(i, 1);
      }
    }
    dataFile[type].push(object);
    dataFile[type].sort((a, b) => {
      return a.id - b.id;
    });
    saveData().then(() => {
      loadData();
      res.status("200").send("Donnée ajoutée.");
    });
  }
});

app.get("/objects", function (req, res) {
  dataFile = require(dataPath);
  fs.readFile(dataPath, (err, data) => {
    if (err) res.status("500").send("Erreur lors de la lecture.");
    else {
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(dataFile));
    }
  });
});

app.post("/save", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const playerValues = req.body.playerValues;
  console.log(Sequelize.JSON);
  User.update(
    {
      playerValues: playerValues,
    },
    {
      where: {
        username: username,
        password: password,
      },
    }
  ).then((data) => {
    res.status("200").send(data);
  });
});

app.get("/save", function (req, res) {
  const username = req.query.username;
  const password = req.query.password;

  User.findAll({
    where: {
      username: username,
      password: password,
    },
  }).then((users) => {
    if (users.length > 0) {
      res.status("200").send(users[0]);
    } else {
      res.status("403").send("Access denied");
    }
  });
});

// Login
app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.hashedPassword;
  User.findAll({
    where: {
      username: username,
      password: password,
    },
  }).then((users) => {
    if (users.length > 0) {
      res.status("200").send("Access granted");
    } else {
      res.status("403").send("Access denied");
    }
  });
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.hashedPassword;
  const password2 = req.body.hashedPassword2;
  const role = req.body.role;
  if (password != password2) {
    res.status("400").send("Mots de passe différents");
    return;
  }
  User.create({
    username: username,
    password: password,
    role: role,
  }).then((user) => {
    console.log("Utilisateur " + user + " créé.");
    res.status("200").send("Utilisateur créé");
  });
});

/* Démarrage serveur */
const server = app.listen(3000, function () {
  console.log("Serveur backend démarré !");
});

// Socket.io
const io = require("socket.io")(server);
io.on("connection", function (socket) {
  console.log("Connection " + socket.id);
});
