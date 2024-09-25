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
    // Extraer el texto de la cita y el autor de los parámetros de la consulta
    const addQuote = req.query.quote;
    const addAuthor = req.query.person;
  
    // Comprobar si se proporcionaron tanto la cita como el autor
    if (!addQuote || !addAuthor) {
      // Si falta alguno de los dos, devolver un error 400 (solicitud incorrecta)
      return res.status(400).send({ error: "No quote/author provided" });
    } else {
      // Si ambos parámetros están presentes, crear un nuevo objeto de cita
      const newQuote = { quote: addQuote, person: addAuthor };
  
      // Agregar la nueva cita al array de citas
      quotes.push(newQuote);
  
      // Devolver un estado 201 (creado) y enviar el nuevo objeto de cita en la respuesta
      res.status(201).send({ quote: newQuote });
    }
  });
  

quotesRouter.put("/:id", (req, res, next) => {
  // Obtener el ID de la cita a actualizar desde los parámetros de la ruta
  const quoteId = req.params.id;

  // Extraer los nuevos valores de la cita y del autor desde los parámetros de la consulta
  const updatedQuote = req.query.quote;
  const updatedAuthor = req.query.person;

  // Usar la función helper getIndexById para encontrar el índice de la cita en el array
  const quoteIndex = getIndexById(quotes, quoteId);
  
  // Comprobar si el índice es -1, lo que significa que no se encontró la cita
  if (quoteIndex === -1) {
    // Devolver un error 404 si la cita no fue encontrada
    return res.status(404).send({ error: "Quote not found" });
  } 
  
  // Verificar si se proporcionaron los nuevos valores para la cita y el autor
  if (!updatedQuote || !updatedAuthor) {
    // Devolver un error 400 si faltan los parámetros necesarios
    return res.status(400).send({ error: "Missing quote/author information" });
  } 
  
  // Si ambos valores son válidos, proceder a actualizar la cita
  quotes[quoteIndex].quote = updatedQuote; // Actualizar el texto de la cita
  quotes[quoteIndex].person = updatedAuthor; // Actualizar el autor de la cita

  // Devolver un estado 200 y la cita actualizada en la respuesta
  res.status(200).send({ quote: quotes[quoteIndex] });
});
