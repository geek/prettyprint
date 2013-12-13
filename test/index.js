// Load modules

var ChildProcess = require('child_process');
var Lab = require('lab');
var Path = require('path');
var PassThrough = require('stream').PassThrough;
var Pretty = require('../');


// Declare internals

var internals = {};


// Test shortcuts

var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;
var describe = Lab.experiment;
var it = Lab.test;


describe('prettyprint', function () {

    describe('CLI', function () {

        var cliPath = Path.join(__dirname, '../', 'cli.js');

        it('prettifies json input stream on stdin', function (done) {

            var pretty = ChildProcess.spawn('node', [cliPath]);
            var input = '{ "hello": "world" }';

            pretty.stdout.on('data', function (data) {

                expect(data.toString()).to.equal('{\n\t"hello": "world"\n}');
                pretty.kill();
                done();
            });

            pretty.stderr.on('data', function (data) {

                expect(data).to.not.exist;
            });

            pretty.stdin.write(input);
            pretty.stdin.end();
        });
    });

    describe('api', function () {

        it('prettifies json stream', function (done) {

            var input = '{ "hello": "world" }';
            var passThrough = new PassThrough();
            var pretty = new Pretty();
            passThrough.pipe(pretty);

            pretty.on('data', function (data) {

                expect(data.toString()).to.equal('{\n\t"hello": "world"\n}');
            });

            pretty.on('finish', function () {

                done();
            });

            passThrough.write(input);
            passThrough.end();
        });
    });
});
