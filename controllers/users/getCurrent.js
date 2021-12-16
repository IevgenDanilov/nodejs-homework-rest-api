const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const getCurrent = async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new Unauthorized(`Not authorized`);
  }
  const { email, subscription } = req.user;

  res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;
