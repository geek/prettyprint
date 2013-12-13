#!/usr/bin/env node

var Pretty = require('./');

process.stdin.pipe(new Pretty()).pipe(process.stdout);
