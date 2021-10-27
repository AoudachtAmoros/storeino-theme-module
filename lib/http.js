import Axios from 'axios'
import https from 'https';
let baseURL = 'https://api-stores.storeino.world/api';
if (process.env.environment == 'production') baseURL = "https://api-stores.storeino.world/api";
export default async function (ctx, inject) {
    if(process.server) {
      if (ctx.req && ctx.req.headers && ctx.req.headers['x-auth-token']) {
        ctx.store.state.token = ctx.req.headers['x-auth-token'];
      }
    }
    const http = Axios.create({
      baseURL: baseURL,
      headers: { 'x-auth-token': ctx.store.state.token },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
    inject('http', http);
}
