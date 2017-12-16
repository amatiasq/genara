#!/usr/bin/env node
'use strict';
Promise.all([
    require('./genara').connect(process.env.GENARA_TOKEN),
    require('./antuan').connect(process.env.ANTUAN_TOKEN),
    require('./maram').connect(process.env.MARAM_TOKEN),
])
.then(() => console.log('Ready.'))
.catch(error => console.error(error));