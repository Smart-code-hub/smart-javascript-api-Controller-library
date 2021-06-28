const CheckForImage = require("../Images/imageUtils");

const UpdateByIdActionContent = (entity, schemaName) => {
  getRefContent = () => {
    const refs = entity.properties.filter(a=>a.hasRelationShip).map(a=>{
  
      return  `"${a.ref.entityName}"`
      });
    if (refs && refs.length) {
      return `.populate([${refs
        .join(",")}])`;
    }
    return '';

  };
  return ` const UpdateById =  async (
        req,
        res
      ) => {
        try {
          
         let Obj = { ...req.body };
        ${CheckForImage(entity)}


        const doc =  await ${schemaName}.
        findOneAndUpdate({ _id: req.params.id }, Obj, {
          new: true
        });
         
        return res.send(await  ${schemaName}.findById(doc._id)
        ${getRefContent()}
      );
        } catch (error) {
          return res.status(400).send(error.message);
        }
      };`;
};
module.exports = UpdateByIdActionContent;
