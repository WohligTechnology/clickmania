var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    demo2: {
        type: Schema.Types.ObjectId,
        ref: "Demo2",
        index: true,
        required: true,
        key: "demo1"
    },
});

schema.plugin(deepPopulate, {
    'demo2': {
        select: 'name _id'
    },
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Demo1', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "demo2", "demo2"));
var model = {};
module.exports = _.assign(module.exports, exports, model);