#!/usr/bin/env node
/* eslint no-process-env:0 */
'use strict';

require('./mongodb')
    .then((db) => Promise.all([
        require('./genara').connect(process.env.GENARA_TOKEN, db),
        require('./antuan').connect(process.env.ANTUAN_TOKEN, db),
        require('./maram').connect(process.env.MARAM_TOKEN, db),
    ]))
    .then(() => console.log('Ready.'))
    .catch(error => console.error(error));
