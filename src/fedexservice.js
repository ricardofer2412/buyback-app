const axios = require('axios');


const trackUrl = 'https://www.fedex.com/trackingCal/track';


export async function track(trackingNumber) {
  const payload = `data={"TrackPackagesRequest":{"appType":"WTRK","appDeviceType":"","supportHTML":true,"supportCurrentLocation":true,"uniqueKey":"","processingParameters":{},"trackingInfoList":[{"trackNumberInfo":{"trackingNumber":"${trackingNumber}","trackingQualifier":"","trackingCarrier":""}}]}}&action=trackpackages&locale=en_US&version=1&format=json`

  const encodedPayload = encodeURI(payload);


  try {
    const response = await axios.post(trackUrl, encodedPayload);
    const { data } = response;
    if (data) {
      const { TrackPackagesResponse } = data;
      let status = false;
      let carrierDesc = false;
      TrackPackagesResponse.packageList.forEach(item => {
        const { statusWithDetails, trackingCarrierDesc } = item;
        console.log('statusWithDetails: ', statusWithDetails);
        status = statusWithDetails;
        carrierDesc = trackingCarrierDesc;
      })
      return { status, carrierDesc };
    } else {
      console.log("Something went wrong: ", data);
    }
  } catch (e) {
    console.log('Error tracking package: ', e);
  }
}






