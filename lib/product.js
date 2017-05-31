'use strict';

/** @module product **/

/**
 * Searches and filters the list of all products for a particular client.
 * @see http://techdocs.spid.no/endpoints/GET/products/
 * @param  {Api} api
 * @param  {object} criteria
 * @return {Promise}
 */
function getProducts(api, { criteria }) {
    return api.get('/api/2/products', criteria);
}

/**
 * Create a new product, a subscription or a bundle. All of these are technically products,
 * so which one you end up depends on the data you pass when creating it.
 * @see http://techdocs.spid.no/endpoints/POST/product/
 * @param  {Api} api
 * @param {object} productDescriptor
 * @return {Promise}
 */
function createProduct(api, productDescriptor) {
    return api.post('/api/2/product', productDescriptor);
}

/**
 * Retrieve a product object.
 * @see http://techdocs.spid.no/endpoints/GET/product/%7Bid%7D/
 * @param  {Api} api
 * @param  {string} productId
 * @return {Promise}
 */
function getProduct(api, productId) {
    return api.get(`/api/2/product/${productId}`);
}

/**
 * Update the product by POST-ing the fields to edit. Refer to GET /product/{id} for details on the
 * supported query parameters. Updating a product transparently creates a new revision.
 * Previous revisions can be accessed through the product revisions endpoint.
 * @see http://techdocs.spid.no/endpoints/POST/product/%7Bid%7D/
 * @param  {Api} api
 * @param  {string} productId
 * @param  {object} fieldsToUpdate
 * @return {Promise}
 */
function updateProduct(api, productId, fieldsToUpdate) {
    return api.post(`/api/2/product/${productId}`, fieldsToUpdate);
}

/**
 * Check if a specific user has access to a product.
 * Users gain access to products either through purchase or by receiving them as gifts.
 * @see http://techdocs.spid.no/endpoints/GET/user/%7BuserId%7D/product/%7BproductId%7D/
 * @param  {Api} api
 * @param  {string} userId - The user's uuid or userId (not to be mistaken with the deprecated id).
 * @param  {string} productId - ID of a product or subscription. Since version 2.9, this may also
 *         be a product alias, in which case you should also use the merchant filter.
 * @param  {object} filters - filter is only required when productId is an alias
 * @param  {string} merchant - Show all results within the current merchant rather than the current client
 * @return {Promise}
 */
function hasProduct(api, userId, productId, filters) {
    // TODO don't include filters if it's not passed
    return api.get(`/api/2/user/${userId}/product/${productId}`, { userId, productId, filters });
}

/**
 * Grant a user access to a product.
 * @remark While using GET with this endpoint will also provide information about access to
 * subscriptions, POST can only be used to grant access to products, not subscriptions.
 * @see http://techdocs.spid.no/endpoints/POST/user/%7BuserId%7D/product/%7BproductId%7D/
 * @param  {Api} api
* @param   {string} userId - The user's uuid or userId (not to be mistaken with the deprecated
 *         id).
 * @param  {string} productId - ID of a product or subscription.
 * @return {Promise} - Grant a user access to a product
 */
function grantAccess(api, userId, productId) {
    return api.post(`/api/2/user/${userId}/product/${productId}`);
}

/**
 * Revoke a user's access to a product.
 * @remark While using GET with this endpoint will also provide information about access to
 * subscriptions, DELETE can only be used to revoke access to products, not subscriptions.
 * @see http://techdocs.spid.no/endpoints/DELETE/user/%7BuserId%7D/product/%7BproductId%7D/
 * @param  {Api} api
 * @param  {string} userId
 * @param  {string} productId
 * @return {Promise}
 */
function revokeAccess(api, userId, productId) {
    return api.delete(`/api/2/user/${userId}/product/${productId}`);
}

/**
 * List products the user has access to.
 * @see http://techdocs.spid.no/endpoints/GET/user/%7BuserId%7D/products/
 * @param  {Api} api
 * @param  {string} userId
 * @param  {object} filters
 * @return {Promise}
 */
function accessible(api, userId, filters) {
    return api.get(`/api/2/user/${userId}/products`, filters);
}

/**
 * Digital content is represented by static products that are not restricted in time, or renewed by
 * SPiD. Clients may grant and revoke digital content access for user's through the API. Digital
 * contents can also be connected to a payment agreement, allowing clients to use their own
 * recurring logic.
 * @see http://techdocs.spid.no/endpoints/GET/digitalcontents/
 * @param  {Api} api
 * @param  {object} criteria
 * @param  {object} filters
 * @return {Promise}
 */
function searchDigitalContents(api, criteria, filters) {
    // TODO is it a good idea?
    return api.get('/api/2/digitalcontents', Object.assign({}, criteria, filters));
}

/**
 * Fetch all products that have children.
 * @see http://techdocs.spid.no/endpoints/GET/products/parents/
 * @param  {Api} api
 * @param  {object} filters
 * @return {Promise}
 */
function getParents(api, filters) {
    return api.get('/api/2/products/parents', filters);
}

/**
 * Add a product to a bundle. Adding a product to a bundle creates a bundle item. Price, VAT and
 * sorting order are properties of this object (i.e., not the product itself - the product is not
 * affected in any way by this operation). If the product has already been added to the bundle,
 * another POST will update it.
 * @see http://techdocs.spid.no/endpoints/POST/bundle/%7BbundleId%7D/product/%7BproductId%7D/
 * @param {Api} api
 * @param {string} bundleId
 * @param {string} productId
 * @param {string} sort
 * @param {string} price
 * @param {string} vat
 * @return {Promise}
 */
function addToBundle(api, bundleId, productId, sort, price, vat) {
    return api.post('/api/2/bundle/{bundleId}/product/{productId}', { sort, price, vat });
}

/**
 * Remove a product ("bundle item") from a bundle.
 * @see http://techdocs.spid.no/endpoints/DELETE/bundle/%7BbundleId%7D/product/%7BproductId%7D/
 * @param  {Api} api
 * @param  {string} bundleId
 * @param  {string} productId
 * @return {Promise}
 */
function removeFromBundle(api, bundleId, productId) {
    return api.delete(`/api/2/bundle/${bundleId}/product/${productId}`);
}

module.exports = {
    getProducts, createProduct, getProduct, updateProduct, hasProduct, grantAccess, revokeAccess,
    accessible, searchDigitalContents, getParents, addToBundle, removeFromBundle
};
