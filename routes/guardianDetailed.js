require("dotenv").config();
const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res, body) => {
    if (req.query.source == 'guardian') {
        const guardian_api_key = process.env.GUARDIAN_API_KEY;
        request('https://content.guardianapis.com/' + req.query.id + '?api-key=' + guardian_api_key + '&show-blocks=all', (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const json = JSON.parse(body);
                res.send(json);
            } else {
                console.log("There was an error: ") + response.statusCode;
                res.send(body);
            }
        });

    } else {
        const ny_api_key = process.env.NY_API_KEY;
        request('https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("' + req.query.id + '")&api-key=' + ny_api_key, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const json = JSON.parse(body);
                res.send(json);
            } else {
                console.log("There was an error: ") + response.statusCode;
                res.send(body);
            }
        });        
    }
});

module.exports = router;