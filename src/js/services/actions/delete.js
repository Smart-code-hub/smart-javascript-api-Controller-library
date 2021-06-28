const DeleteActionContent = schemaName => {
  return `   const Delete =  async (
        req,
        res
      ) => {
        try {
          return res.send(await ${schemaName}.remove({ _id: req.params.id }));
        } catch (error) {
          return res.status(400).send(error.message);
        }
      };`;
};
module.exports = DeleteActionContent;
