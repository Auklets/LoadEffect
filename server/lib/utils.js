const sendJSON = (res, status, content) => {
  res.status(status);
  res.json(content);
};

module.exports = { sendJSON };
