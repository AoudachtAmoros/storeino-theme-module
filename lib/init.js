export default async function (ctx, inject) {
  if(process.server) {
      const req = ctx.req;
      ctx.store.state.domain = req.headers.host;
      const params = { lang: ctx.store.state.language.code, cur: ctx.store.state.currency.code }
      try {
          let response = null
          if(req.body && req.body.preview){
              const body = { data: JSON.parse(req.body.preview.data), schema: JSON.parse(req.body.preview.schema) };
              response = await ctx.$http.post('/settings/current', body ,{ params });
          }else{
             response = await ctx.$http.get('/settings/current', { params });
          }
          ctx.store.state.settings = response.data;
      } catch (error) {
          if(error.response) throw "ERROR :: " + error.response.data;
          throw "ERROR :: INVALID TOKEN" + error;
          //console.log({ error: error.response.data });
      }
      // init Cart
      let cookies = ctx.$tools.cookieToObject(req.headers.cookie);
      const STOREINO_CART = cookies['STOREINO-CART'] ? cookies['STOREINO-CART'] : '[]';
      ctx.store.state.cart = JSON.parse(STOREINO_CART);
      // init Wishlist
      const STOREINO_WISHLIST = cookies['STOREINO-WISHLIST'] ? cookies['STOREINO-WISHLIST'] : '[]';
      ctx.store.state.wishlist = JSON.parse(STOREINO_WISHLIST);
      // Sentry Log

      // Events
  }

  inject('settings', ctx.store.state.settings);
}
