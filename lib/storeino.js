export default async function (ctx, inject) {
  const storeino = {};
  // Gets
  const gets = ['products', 'collections' ,'pages'];
  for (const module of gets) {
      if(!storeino[module]) storeino[module] = {};
      storeino[module].get = async function (params) {
          return ctx.$http.get(`/${module}/get`, { params });
      };
  }
  // Searches
  const searches = ['products', 'collections', 'categories', 'upsells' ,'pages', 'brands', 'reviews'];
  for (const module of searches) {
      if(!storeino[module]) storeino[module] = {};
      storeino[module].search = async function (params) {
          return ctx.$http.get(`/${module}/search`, { params });
      };
  }
  // Others
  storeino.products.filters = async function (params) {
      return ctx.$http.get('/products/filters', { params });
  }
  inject('storeino', storeino);
}
