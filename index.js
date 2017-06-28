// Imports the Google Cloud client library
const Language = require('@google-cloud/language');

// Your Google Cloud Platform project ID
const projectId = process.env.ENQUIRESAPP_GOOGLE_ID;

// Instantiates a client
const language = Language({
  projectId: projectId
});

const textDoc = require('./sampleText');
// const textDoc = require('./sampleText');

// The text to analyze
// Make sure to add it as its in gitignore
const text = textDoc;

// Instantiates a Document, representing the provided text
const document = language.document({ content: text });

// Detects entities in the document
document.detectEntities()
  .then((results) => {
    const entities = results[1].entities;

    let items = [];

    console.log('Entities:');
    entities.forEach((entity) => {
      function findEntity(obj) {
        return obj.name === entity.name;
      }

      // return entity if it exists
      let foundEntity = items.find(findEntity);
      // if above line is undefined then below with be false
      if (!!foundEntity) {
        foundEntity.count = foundEntity.count + 1;
        // console.log('return:', items.find(findEntity)); 
      } else {
        let newEntity = new Object();
        newEntity.name = entity.name;
        newEntity.count = 1;
        items.push(newEntity);
      }
      
      // console.log(`${entity.name} - Type: ${entity.type}, Salience: ${entity.salience}`);
      // if (entity.metadata && entity.metadata.wikipedia_url) {
      //   console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
      // }
    });

    items.sort(function(a, b) {
      return b.count - a.count;
    })
    // console.log(items);

    function formatCSV(entityArray) {
      let csv = [];
      // csv format with just comma separated or with new line? How to easily import into excel?
      entityArray.forEach(entity => csv.push(`${entity.count} - ${entity.name}`));
      csv.join(', ');
      return csv;
    }

    console.log(formatCSV(items))
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
