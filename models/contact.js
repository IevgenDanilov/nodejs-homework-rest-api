const { Schema, model } = require("mongoose");
const Joi = require("joi");

const codeRegexp = /^(?:\d{3}|\(\d{3}\))([-\/\ ])\d{3}([-\/\ ])\d{4}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name of contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const contactUpdStatusSchema = Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(5).max(20).pattern(codeRegexp).required(),
  favorite: Joi.boolean(),
});

const joiUpdStatusSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().min(5).max(20).pattern(codeRegexp),
  favorite: Joi.boolean(),
});

const Contact = model("contact", contactSchema);

const ContactUpdStatus = model("status", contactUpdStatusSchema);

module.exports = {
  Contact,
  joiSchema,
  ContactUpdStatus,
  joiUpdStatusSchema,
};
