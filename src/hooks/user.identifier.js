module.exports = async (context) => {
  const { data } = context;
  data.identifier = Buffer.from(`${data.username}@${data.org}`).toString('base64');
};
