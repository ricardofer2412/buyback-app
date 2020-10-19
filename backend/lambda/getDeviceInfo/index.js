    const API_KEY = "2c5ae2c4-61c8-4f09-b632-8bbf9506538f";
    const USERNAME = "msource2";

exports.handler = async (event) => {
    // TODO implement
const { type, body } = event;


    try {
const formBody = `ApiKey=2c5ae2c4-61c8-4f09-b632-8bbf9506538f&userName=msource2&${body}`;
console.log('formBody: ', formBody);
      const getInfo = await axios.post(`https://clientapiv2.phonecheck.com/cloud/cloudDB/${type}/`, formBody);
      const { data } = getInfo
      console.log(data)
      return data;
    } catch (e) {
      console.log('ERROR getting info: ', e.response.data);
return false;
    }


};

