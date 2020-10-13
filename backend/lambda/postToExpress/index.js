const axios = require('axios');

const url = "http://18.204.212.160:8080";

exports.handler = async (event) => {
    const { path, method, body } = event;
    console.log('event: ', event);


    try {
        const response = await axios[method](`${url}/${path}`, body);
        console.log('response: ', response);
        const { data } = response;
        return data;

    } catch (e) {
        console.log("Error", e);
        throw e;
    }


};

