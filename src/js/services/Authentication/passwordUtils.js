const CheckForPasswordAndHashIt = entity => {
  let isPasswordPresent = false;
  const properties = entity.properties;

  isPasswordPresent = properties.some(({ name }) =>
    name.toLowerCase().includes("password")
  );
  if (!isPasswordPresent) return "";

  let passwrodFields = {};
  if (isPasswordPresent) {
    passwrodFields = properties.filter(({ name }) =>
      name.toLowerCase().includes("password")
    )[0];
  }

  return `
     //By Default we are hashing the password and storing
      //if you want your password to be stored as it is
      //jus delete the code  bellow of section hash password
  
      //hash password
  
      const hasPassword = await GenerateHash(Obj.${passwrodFields.name});
      //we will just manipulate the password in reqbody
      //so that if you comment this then also it will work
      Obj.${passwrodFields.name} = hasPassword;
  
      //hash password end`;
};

const GenrateHasingFuntionIfPassword = entity => {
  let isPasswordPresent = false;
  const properties = entity.properties;

  isPasswordPresent = properties.some(({ name }) =>
    name.toLowerCase().includes("password")
  );
  if (!isPasswordPresent) return "";
  return `
       const bcrypt = require("bcrypt");
  const salt = bcrypt.genSaltSync(Math.random());
   const GenerateHash = async password => {
    return await bcrypt.hash(password, salt);
  };
  const VerifyHash = async (password, encrypted) => {
    return await bcrypt.compare(password, encrypted);
  };`;
};
module.exports = {
  CheckForPasswordAndHashIt,
  GenrateHasingFuntionIfPassword
};
