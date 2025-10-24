const InternalServerError = (res, msg) => {
  res.status(500).json({ data: null, errorcode: 500, errormsg: msg });
};

const NotAuthorized = (res, msg) => {
  res.status(401).json({ data: null, errorcode: 401, errormsg: msg });
};

const BadRequest = (res, msg) => {
  res.status(400).json({ data: null, errorcode: 400, errormsg: msg });
};

const NotFound = (res, msg) => {
  res.status(404).json({ data: null, errorcode: 404, errormsg: msg });
};

module.exports = {
  InternalServerError,
  NotAuthorized,
  BadRequest,
  NotFound,
};
