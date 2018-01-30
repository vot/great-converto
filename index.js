'use strict';

const _ = require('lodash');
const express = require('express');
const clarg = require('clarg');
const ffbinLib = require('./lib/ffbinLib');
const fmt = require('./lib/fmt');
const routes = require('./routes');

const clOpts = clarg().opts;

function startApp (port) {
  const portParsed = parseInt(port, 10);
  const portFinal = (port == portParsed) ? portParsed : 3000;

  console.log(`[${fmt.date()} ${fmt.time()}] Ensuring ffmpeg and ffprobe binaries are present.`);
  ffbinLib.ensureBinaries(function (err, data) {
    console.log(`[${fmt.date()} ${fmt.time()}] ffmpeg and ffprobe binaries are present.`);
    const app = express();
    app.disable('x-powered-by');

    routes(app);

    app.listen(portFinal, function () {
      console.log(`[${fmt.date()} ${fmt.time()}] Great Converto listening on port ${portFinal}`);
    });

    return app;
  });

}

startApp(clOpts.port || clOpts.p);
