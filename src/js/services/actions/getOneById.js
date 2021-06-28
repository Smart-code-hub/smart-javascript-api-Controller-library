const GetOneByIdActionContent = ({schemaName,refs}) => {
  getRefContent = () => {
    if (refs && refs.length) {
      return `.populate([${refs
        .map(a=>`"${a}"`)
        .join(",")}])`;
    }
    return '';

  };
  return `   const GetOneById =  async (
    req,
    res
  ) => {
    try {
      return res.send(await ${schemaName}.findById(req.params.id)
      ${getRefContent()}
      );
    } catch (error) {
      return res.status(400).send(error.message);
    }
  };`;
};
module.exports = GetOneByIdActionContent;
