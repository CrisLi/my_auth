const mongoose = require('mongoose');

const { Schema } = mongoose;

const defaultOptions = {
  timestamps: true
};

// const toObject = {
//   versionKey: false,
//   virtuals: true,
//   transform(doc, ret) {
//     // eslint-disable-next-line
//     delete ret['_id'];
//     return ret;
//   }
// };

exports.schema = (schema, options) => {
  const withDefaultOptions = Object.assign({}, defaultOptions, options);
  const mongooseSchema = new Schema(schema, withDefaultOptions);
  // mongooseSchema.set('toObject', toObject);
  return mongooseSchema;
};

exports.model = (name, schema) => mongoose.model(name, schema);
