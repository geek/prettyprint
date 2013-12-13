var Transform = require('stream').Transform;
var Util = require('util');


module.exports = Pretty;

function Pretty () {

    console.assert(this.constructor === Pretty, 'Must be constructed with new');

    Transform.call(this);
    this._chunks = [];
    this._length = 0;
}

Util.inherits(Pretty, Transform);


Pretty.prototype._transform = function (chunk, encoding, done) {

    this._chunks.push(chunk);
    this._length += chunk.length;

    done();
};


Pretty.prototype._flush = function (done) {

    var buff = Buffer.concat(this._chunks, this._length);
    var jsonStr = buff.toString();
    var obj = JSON.parse(jsonStr);
    var pretty = JSON.stringify(obj, null, '\t');

    this.push(new Buffer(pretty));
    done();
};