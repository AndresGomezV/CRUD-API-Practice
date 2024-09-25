//Require the 'express' package and save it to a variable named express
const express = require('express');

//Create an Express instance and save it to a variable called app.
const app = express();

//Start your server listening on the port defined by the PORT variable.
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

//Write a GET /sausages route that sends back the whole sausageTypes array.
const sausageTypes = ['bratwurst', 'andouille', 'chorizo', 'boudin', 'kielbasa'];

app.get('/sausages', (req, res, next) => {
    res.send(sausageTypes);
  })


//Fix the route so that it sends back the array of metal building materials
const buildingMaterials = {
    wood: ['plywood', '2x4s', 'cedar shingles'],
    metal: ['steel girders', 'wall studs', 'rebar'],
  };

app.get('/metals', (req, res, next) => {
    const arrayToSend = buildingMaterials.metal;
    res.send(arrayToSend);
  });

// Complete the GET /battlefields/:name route. Send back the battlefield object if a battlefield exists, and set the status to 404 and send an empty response if it does not.

const battlefields = {
    fortSumter: {
      state: 'SC',
    },
    manassas: {
      state: 'VA',
    },
    gettysburg: {
      state: 'PA',
    },
    antietam: {
      state: 'MD',
    }
  }

// Definimos una ruta GET para '/battlefields/:name'
// ':name' es un parámetro de ruta que puede ser cualquier nombre de campo de batalla
app.get('/battlefields/:name', (req, res, next) => {
    // Obtenemos el nombre del campo de batalla de los parámetros de la ruta
    const battlefieldName = req.params.name;
  
    // Verificamos si el campo de batalla existe en el objeto 'battlefields'
    if (battlefields[battlefieldName]) {
      // Si existe, enviamos el objeto correspondiente como respuesta
      res.send(battlefields[battlefieldName]);
    } else {
      // Si no existe, enviamos una respuesta con el estado 404 (No encontrado)
      res.status(404).send();
    }
  });

/*Write a route to handle PUT requests to /currencies/:name/countries.
The :name param represents the currency name in the currencies object. The updated array of countries that use this currency will be sent in a query.

This route handler should replace the countries array of the correct single-currency object with an updated array from the query. It should send the updated array as a response.*/

app.put('/currencies/:name/countries', (req, res, next) => {
    const countries = req.query;
    currencies[req.params.name] = countries;
    res.send(currencies[req.params.name]);
  });

/*
app.put('/currencies/:name/countries', (req, res, next) => {
  const currencyName = req.params.name;
  const countries = req.query;
  currencies[currencyName] = countries;
  res.send(currencies[currencyName]);
});
*/

//Create a POST /soups route. It should add a new soup name to the soups array from the name property of the req.query object. It should also set a status code for ‘Created’

app.post("/soups", (req, res, next) => {
    const addSoup = req.query.name;
    if (!addSoup) {
        return res.status(400).send({ error: "No soup name provided" });
    }    
    soups.push(addSoup);
    res.status(201).send({ soup: addSoup });
  });

/*
Write a route to handle DELETE requests to /puddings/:flavor. It should delete the correct pudding and send a 204 response if the pudding name exists and send a 404 response if it does not.

You can use the helper functions findPuddingIndex to find the index of the pudding by flavor and deletePuddingAtIndex to delete a pudding from the puddingFlavors array by index.
*/

//Helper functions
const findPuddingIndex = (name) => {
    return puddingFlavors.indexOf(name);
  }
  
  const deletePuddingAtIndex = (index) => {
    puddingFlavors.splice(index, 1);
  }

//CODE
app.delete('/puddings/:flavor', (req, res, next) => {
    const puddingIndex = findPuddingIndex(req.params.flavor);
    if (puddingIndex !== -1) {
      deletePuddingAtIndex(puddingIndex);
      res.status(204).send()
    } else {
      res.status(404).send()
    }
  });

//Mount the sauceRouter with app.use so that a GET /sauces request sends back the sauces array.

const sauceRouter = express.Router();
// Add your code here:
app.use('/sauces', sauceRouter);

const sauces = ['carbonara', 'primavera', 'bolognese', 'puttanesca', 'fra diavolo']

sauceRouter.get('/', (req, res, next) => {
  res.send(sauces);
});


//Create two routers - mountainsRouter and mountainRangesRouter. Mount them at /mountains and /mountain-ranges, respectively.
const mountains = ['denali', 'olympus', 'kilimanjaro', 'matterhorn'];
const mountainRanges = ['alps', 'andes', 'himalayas', 'rockies'];


const mountainsRouter = express.Router();
const mountainRangesRouter = express.Router();

app.use('/mountains', mountainsRouter);
app.use('/mountain-ranges', mountainRangesRouter);

//Create a route handler with mountainsRouter to send back the mountains array in response to a GET /mountains request.
mountainsRouter.get('/', (req, res, next) => {
  res.send(mountains);
});

//Create a route handler with mountainRangesRouter to send back the mountainRanges array in response to a GET /mountain-ranges request
mountainRangesRouter.get('/', (req, res, next) => {
  res.send(mountainRanges);
});

