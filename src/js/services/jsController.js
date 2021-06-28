const GetAllActionContent = require("./actions/getAll");
const GetOneByIdActionContent = require("./actions/getOneById");
const UpdateByIdActionContent = require("./actions/updateById");
const DeleteActionContent = require("./actions/delete");
const CreateAuthMechanism = require("../services/Authentication/authService");
const GetCreateActionContent = require("./actions/create");
const {
  LoadMainLibraries,
  GetModuleExportContent
} = require("./libraryImpotrs");
const GetByJavascript = entity => {
  console.log(entity);
  
  const schemaName = entity.name.toUpperCase();

  const refs = entity.properties.filter(a=>a.hasRelationShip).map(a=>{
    
  return  a.ref.entityName
  });
  return `

   ${LoadMainLibraries(schemaName, entity)}
   ${CreateAuthMechanism(entity)}

   ${GetAllActionContent({schemaName,refs})}
   ${GetOneByIdActionContent({schemaName,refs})}
   ${UpdateByIdActionContent(entity, schemaName)}
   ${GetCreateActionContent(entity, schemaName)}
   ${DeleteActionContent(schemaName)}

   ${GetModuleExportContent(entity)}`;
};
module.exports = GetByJavascript;
