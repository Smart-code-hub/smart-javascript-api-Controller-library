const CheckForImage = require("../Images/imageUtils");
const {
  CheckForPasswordAndHashIt
} = require("../Authentication/passwordUtils");

const GetCreateActionContent = (entity, schemaName) => {
 
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
  return `
    const Create =  async (
        req,
        res
      ) => {
        try {
           let Obj = { ...req.body };
         ${CheckForImage(entity)}
         ${CheckForPasswordAndHashIt(entity)}


            const doc = await ${schemaName}.create({ ...Obj });

            return res.send(await  ${schemaName}.findById(doc._id)
              ${getRefContent()}
            );
        
        } catch (error) {
          return res.status(400).send(error.message);
        }
      };
    `;
};
module.exports = GetCreateActionContent;
