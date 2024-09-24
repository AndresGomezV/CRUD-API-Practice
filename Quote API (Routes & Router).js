const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const quotesRouter = express.Router();
app.use('/api/quotes', quotesRouter);

quotesRouter.get('/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote});
  });

quotesRouter.get('/', (req, res, next) => {
    // Obtener el parámetro de consulta 'person' de la solicitud
    const quoteByAuthor = req.query.person;
  
    // Verificar si el parámetro 'person' está presente en la consulta
    if (quoteByAuthor) {
      // Filtrar las citas para obtener solo las que coinciden con el autor especificado
      const quoteByAuthorArr = quotes.filter(quote => quote.person === quoteByAuthor);
      
      // Enviar las citas filtradas en la respuesta
      res.send({ quotes: quoteByAuthorArr });
    } else {
      // Si no hay parámetro 'person', enviar todas las citas en la respuesta
      res.send({ quotes });
    }
  });

quotesRouter.post("/", (req, res, next) => {
  const addQuote = req.query.quote;
  const addAuthor = req.query.person;
  if (!addQuote || !addAuthor) {
    res.status(400).send({ error: "No quote/author provided" });
  } else {
    const newQuote = { quote: addQuote, person: addAuthor };
    quotes.push(newQuote);
    res.status(201).send({ quote: newQuote });
  }
});


