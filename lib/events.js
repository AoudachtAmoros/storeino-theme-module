export default async function (ctx, inject) {
  if(!process.server){
    window.addEventListener('ADD_TO_CART', (e) => {
        const item = ctx.$tools.reformCartItem(e.data);
        let exists = null;
        if(item.variant) exists = ctx.store.state.cart.find(i => i._id === item._id && i.variant && i.variant._id === item.variant._id);
        else exists = ctx.store.state.cart.find(i => i._id === item._id);
        if(exists){
            item.parents = [...new Set([...exists.parents, ...item.parents])];
            exists.quantity = item.quantity;
        }else{
            ctx.store.state.cart.push(item);
        }
        ctx.$tools.setCart(ctx.store.state.cart);
    });
    window.addEventListener('REMOVE_FROM_CART', (e)=>{
        const item = ctx.$tools.reformCartItem(e.data);
        let index = -1;
        if(item.variant) index = ctx.store.state.cart.findIndex(i => i._id === item._id && i.variant && i.variant._id === item.variant._id);
        else index = ctx.store.state.cart.findIndex(i => i._id === item._id);
        if(index == -1) return;
        ctx.store.state.cart.splice(index, 1);
        const childs = ctx.store.state.cart.filter(i => i.parents && i.parents.includes(item._id));
        for (const child of childs) {
            const childIndex = ctx.store.state.cart.findIndex(i => i._id == child._id);
            child.parents.splice(child.parents.indexOf(item._id), 1);
            if(child.parents.length == 0) ctx.store.state.cart.splice(childIndex, 1);
        }
        ctx.$tools.setCart(ctx.store.state.cart);
    });
    window.addEventListener('ADD_TO_WISHLIST', (e) => {
        const item = ctx.$tools.reformWishlistItem(e.data);
        let exists = ctx.store.state.wishlist.find(i => i._id === item._id);
        if(!exists) ctx.store.state.wishlist.push(item);
        ctx.$tools.setWishlist(ctx.store.state.wishlist);
    });
    window.addEventListener('REMOVE_FROM_WISHLIST', (e)=>{
        const item = ctx.$tools.reformWishlistItem(e.data);
        let index = ctx.store.state.wishlist.findIndex(i => i._id === item._id);
        if(index == -1) return;
        ctx.store.state.wishlist.splice(index, 1);
        ctx.$tools.setWishlist(ctx.store.state.wishlist);
    });
}
}
