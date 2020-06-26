import { Base64 } from 'js-base64';
import { post } from 'axios';

export function fakeAuthorize (username, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await post('https://dev.dmsc.com.vn/CustPATC/TokenResource.svc/',{
        headers: { Authorization: "Basic " + Base64.encode(username + ":" + password )}
      });
      console.log("test"+result)
      resolve(Base64.encode(username + ":" + password ));
    } catch(error) {
      reject(error);
    }
  });
}