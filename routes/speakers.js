const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;
  // above is same as this:
  // const speakerService = params.speakerService;

  // the / route now points to /speakers because it is mounted to /speakers
  router.get('/', async (request, response, next) => {
    try {
      const speakers = await speakerService.getList();
      const artwork = await speakerService.getAllArtwork();
      return response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  // route for speaker detail
  router.get('/:shortname', async (request, response, next) => {
    try {
      const speaker = await speakerService.getSpeaker(request.params.shortname);
      const artwork = await speakerService.getArtworkForSpeaker(request.params.shortname);

      return response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers-detail',
        speaker,
        artwork,
      });
    } catch (err) {
      return next();
    }
  });

  return router;
};
// by doing it the way we have it above (instead of just module.exports = router), we can pass arguments
// from our application down to the route as function parameters
// module.exports = router;
