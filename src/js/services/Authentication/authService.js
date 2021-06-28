const CreateAuthMechanism = entity => {
  if (!entity.authPayLoads) return ``;

  const { reqPayLoads, tokenPayloads } = entity.authPayLoads;

  // Lets geat all fields except password from reqestPayloads
  const QueryToFindRecord = reqPayLoads.filter(
    element => !element.toLowerCase().includes("password")
  );

  const propsToBeDeclared = QueryToFindRecord.map(
    a => `
      const ${a} = req.body['${a}'];`
  );

  const passwordFiled = reqPayLoads.filter(element =>
    element.toLowerCase().includes("password")
  )[0];
  const objecToForQuery = {};
  for (const iterator of QueryToFindRecord) {
    objecToForQuery[iterator] = `req.body['${iterator}']`;
  }
  console.log(reqPayLoads, tokenPayloads);

  const str = `
    
    const Authenticate = async (req, res) => {
    ${propsToBeDeclared}
  
    const ${entity.name.toLowerCase()} = await ${entity.name.toUpperCase()}.findOne({${QueryToFindRecord.join(
    ","
  )}});
  
    if (!${entity.name.toLowerCase()})
      return res.status(400).send({ message: "No ${entity.name.toLowerCase()} Found " });
  
    const ${passwordFiled.toLowerCase()} = req.body.${passwordFiled};
    const result = await VerifyHash(${passwordFiled.toLowerCase()}, ${entity.name.toLowerCase()}.${passwordFiled});
    if (!result) return res.status(400).send({ message: "Wrong ${passwordFiled}" });
  
   
    const payload = {
      ...pick( ${entity.name.toLowerCase()}, ${JSON.stringify(tokenPayloads)})
    };
    const token = sign(payload, ENV_SECRET_STRING);
    res.send({ ...payload, token });
  };
  `;

  console.log(str);
  return str;
};
module.exports = CreateAuthMechanism;
