const express = require('express');

const router = express.Router();

module.exports = () => {
  // the / route now points to /speakers because it is mounted to /speakers
  router.get('/', (request, response) => {
    return response.send('Speakers List');
  });

  // route for speaker detail
  router.get('/:shortname', (request, response) => {
    return response.send(`Detail page of ${request.params.shortname}`);
  });

  return router;
};
// by doing it the way we have it above (instead of just module.exports = router), we can pass arguments
// from our application down to the route as function parameters
// module.exports = router;
