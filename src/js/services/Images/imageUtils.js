const CheckForImage = entity => {
  let isImagePresent = false;
  const properties = entity.properties;

  isImagePresent = properties.some(({ isImage }) => isImage);
  if (!isImagePresent) return "";

  return `
       let allFiles = req.files;
      if (allFiles) {
        
        for (const key in allFiles) {
          const uploadedFilesUrls = allFiles[key].map((a,i) => {
            return 'images/${entity.name.toLowerCase()}/'+key+'/' +allFiles[key][i].filename;
          });
          Obj[key] = uploadedFilesUrls;
      
        }
      }`;
};
module.exports = CheckForImage;
