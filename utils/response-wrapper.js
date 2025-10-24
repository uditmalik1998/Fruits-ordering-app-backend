const okResponse = (res, data) => {
  res.status(200).json({ data: data, errorcode: null, errormsg: null });
};

const createResponse = (res, data) => {
  res.status(201).json({ data: data, errorcode: null, errormsg: null });
};

module.exports = {
  okResponse,
  createResponse,
};
