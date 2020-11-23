require("dotenv").config();
const express = require('express');
const router = express.Router();
const request = require('request');

const api_key = process.env.GUARDIAN_API_KEY;
const url = 'https://content.guardianapis.com/search?api-key=' + api_key + '&section=(sport|business|technology|politics)&show-blocks=all';


router.get('/', (err, res, body) => {
  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const json = JSON.parse(body);
      res.send(json);
    } else {
      console.log("There was an error: ") + response.statusCode;
      res.send(body);
    }
  });
});

module.exports = router;