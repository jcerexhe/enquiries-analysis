// Imports the Google Cloud client library
const Language = require('@google-cloud/language');

// Your Google Cloud Platform project ID
const projectId = process.env.ENQUIRESAPP_GOOGLE_ID;

// Instantiates a client
const language = Language({
  projectId: projectId
});

const textDoc = require('./textDoc');

// The text to analyze
// Make sure to add it as its in gitignore
const text = textDoc;

// Instantiates a Document, representing the provided text
const document = language.document({ content: text });

// Detects entities in the document
document.detectEntities()
  .then((results) => {
    const entities = results[1].entities;

    console.log('Entities:');
    entities.forEach((entity) => {
      console.log(entity.name);
      // console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
      // if (entity.metadata && entity.metadata.wikipedia_url) {
      //   console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
      // }
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
