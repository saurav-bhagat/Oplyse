var express = require('express');
var router = express.Router();

/* GET home page. */

var ae = function analyzeEntitiesOfText(text) {
  // [START language_entities_string]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
  const t = text;

  // Prepares a document, representing the provided text
  const document = {
    content: t,
    type: 'PLAIN_TEXT',
  };

  // Detects entities in the document
  client
    .analyzeEntities({document: document})
    .then(results => {
      const entities = results[0].entities;

      console.log('Entities:');
      entities.forEach(entity => {
        console.log(entity.name);
        console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
        if (entity.metadata && entity.metadata.wikipedia_url) {
          console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
        }
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END language_entities_string]
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Codespace' });
});

router.post('/filter', function(req, res, next) {

    let text = req.body.body;
    ae(text);
    res.send("saurav");

});

module.exports = router;
