const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;
  // above is same as this:
  // const speakerService = params.speakerService;

  // the / route now points to /speakers because it is mounted to /speakers
  router.get('/', async (request, response) => {
    const speakers = await speakerService.getList();
    return response.json(speakers);
  });

  // route for speaker detail
  // eslint-disable-next-line arrow-body-style
  router.get('/:shortname', (request, response) => {
    return response.send(`Detail page of ${request.params.shortname}`);
  });

  return router;
};
// by doing it the way we have it above (instead of just module.exports = router), we can pass arguments
// from our application down to the route as function parameters
// module.exports = router;
