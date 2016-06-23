module.exports.sendJSON = (res, status, content) => {
  res.status(status);
  res.json(content);
};
