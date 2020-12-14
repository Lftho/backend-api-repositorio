const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const likes = 0

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title,  url, techs } = request.body;

  const repositorie = {
    id: uuid(), 
    title, 
    url, 
    techs,
    likes: 0,
  };

  //creating new project
  repositories.push(repositorie);

  //show project recent in screen
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const procuraRepositorieIndex = repositories.findIndex(
    repositorie => repositorie.id === id
  );

  if(procuraRepositorieIndex === -1) {
    return response.status(400).json({
      error: 'Repositorie does not exists - Traduzindo não existe esse repositorie'
    });
  };

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes:repositories[procuraRepositorieIndex].likes
  }

  repositories[procuraRepositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const procuraRepositorieIndex = repositories.findIndex(
    repositorie => repositorie.id === id
  );

    if (procuraRepositorieIndex >= 0) {
      repositories.splice(procuraRepositorieIndex, 1)
    } else {
      return response.status(400).json({
        error: 'Repositorie not exists'
      })
    }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const procuraRepositorieIndex = repositories.findIndex(
    repositorie => repositorie.id === id
  );

  if(procuraRepositorieIndex === -1) {
    return response.status(400).json({
      error: 'Repositorie does not exists'
    });
  };

  repositories[procuraRepositorieIndex].likes++;

  return response.json(
    repositories[procuraRepositorieIndex]
  );
});

module.exports = app;
 