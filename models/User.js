/* eslint-disable prettier/prettier */
const { Schema, model, Types } = require("mongoose")

module.exports = model(
  "User",
  new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    links: [{ type: Types.ObjectId, ref: "Link" }],
  }),
)
