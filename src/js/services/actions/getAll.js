const GetAllActionContent = ({ schemaName, refs }) => {
  getRefContent = () => {
    if (refs && refs.length) {
      return `.populate([${refs
        .map(a=>`"${a}"`)
        .join(",")}])`;
    }
    return '';
  };

  return `   const GetAll =  async (
        req,
        res
      ) => {
        try {
          return res.send(await ${schemaName}.find()
          ${getRefContent()}
          );
        } catch (error) {
          return res.status(400).send(error.message);
        }
      };`;
};
module.exports = GetAllActionContent;
