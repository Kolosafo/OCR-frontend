export const extractionApi = (imgData, id = null) => {
  const api_key = "l39YP-QKZdo6otXIhnuVcZmlbK9-uT9MQw40sILqd1U";
  const url = `https://seashell-app-rkt4r.ondigitalocean.app/${api_key}`;
  const ubuntuUrl =`https://new-horizon-util-service.in/${api_key}`
  // const ubuntuUrl =`http://127.0.0.1:8000/${api_key}`

  let image = new FormData();

  let data;
  if (!id) {
    image.append("image", imgData);
    console.log("NO ID", imgData );
  } else {
    console.log("ID dey");
    image.append("image", imgData);
    image.append("id", id);
  }

  const requestOption = {
    method: "POST",
    body: image,
    Accept: "application/json",
    'Access-Control-Allow-Origin':'*'
    // referrerPolicy: "unsafe-url" 
  };

  return { ubuntuUrl, requestOption };
};
