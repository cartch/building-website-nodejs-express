const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (request, response) => {
    const feedback = await feedbackService.getList();
    return response.json(feedback);
  });

  // route for speaker detail
  // eslint-disable-next-line arrow-body-style
  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });

  return router;
};
// by doing it the way we have it above (instead of just module.exports = router), we can pass arguments
// from our application down to the route as function parameters
// module.exports = router;
