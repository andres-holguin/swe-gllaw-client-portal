
//import * as mailRouter from "../routes/MailRouter";
//import  axios from "axios";
const axios = require('axios').default;
beforeAll(() => {
    axios.defaults.baseURL = 'http://localhost:3001';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
});
jest.mock('axios');
test('should return false for this', async () => {
    axios.post('/api/mail').then(res => {
         expect(res.status).toBe(200);

    })

});

//export default "";