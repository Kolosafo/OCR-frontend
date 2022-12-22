export const convertToBase64 = (selectedFile, setBase64) => {
  const reader = new FileReader();

  reader.readAsDataURL(selectedFile);
  reader.onload = () => {
    setBase64(reader.result);
  };

  //   return reader.result;
};
