const {
  GenrateHasingFuntionIfPassword
} = require("./Authentication/passwordUtils");

const LoadAuthLibraries = entity =>
  entity.authPayLoads
    ? `
   const {sign} = require("jsonwebtoken");
  const { pick } = require("lodash");
  const ENV_SECRET_STRING = "Put_A_Secure_string_here_for_token_generation";`
    : "";

const LoadMainLibraries = (schemaName, entity) => {
  return `    const  ${schemaName} = require('../schemas/${entity.name.toLowerCase()}.schema');
      ${LoadAuthLibraries(entity)}
      ${GenrateHasingFuntionIfPassword(entity)}`;
};

const GetModuleExportContent = entity => {
  return `  module.exports  =  {
  ${entity.authPayLoads ? "Authenticate," : ""}
       GetAll,
       GetOneById,  
       UpdateById,
       Delete,
       Create
   };
  ;`;
};
module.exports = {
  LoadAuthLibraries,
  GetModuleExportContent,
  LoadMainLibraries
};
