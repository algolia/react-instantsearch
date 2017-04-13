import builder from './builder.js';
import revAssets from './plugins/rev-assets.js';
import { build as middlewares } from './middlewares';

process.exit(1);

builder(
  {
    middlewares,
  },
  err => {
    if (err) {
      throw err;
    }

    revAssets();
  }
);
