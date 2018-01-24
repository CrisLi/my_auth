const mongoose = require('mongoose');

const { Schema } = mongoose;

const defaultOptions = {
  timestamps: true
};

exports.schema = (schema, options) => {
  const withDefaultOptions = Object.assign({}, defaultOptions, options);
  const mongooseSchema = new Schema(schema, withDefaultOptions);
  return mongooseSchema;
};

exports.model = (name, schema) => mongoose.model(name, schema);
