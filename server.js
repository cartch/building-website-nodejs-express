const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

// defaults to the index.js file
// it is the module.exports function we created in index.js
const routes = require('./routes');

const app = express();

const port = 3000;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['asfsadf234234FD', 'asdfasdf983lsDS'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));

app.locals.siteName = 'ROUX Meetups';

app.use(async (request, response, next) => {
  try {
    const names = await speakerService.getNames();
    response.locals.speakerNames = names;
    console.log(response.locals.speakerNames);
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/',
  routes({
    feedbackService, // passes down the services to the routes
    speakerService,
  })
); // catch all for all routes under /

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
