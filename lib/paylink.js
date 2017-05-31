'use strict';

/** @module paylink **/

/**
 * Create a new paylink @see http://techdocs.spid.no/paylink-api/
 * @see http://techdocs.spid.no/endpoints/POST/paylink/
 * @param  {Api} api
 * @param  {string} title - The PayLink title. Displayed to the user on the payment page, and
 *         shown on the New Credit Card page at Payex.
 * @param  {object[]} items - The items to be sold. A list of PayLink Item objects.
 * @param  {object} optionalParams - Additional optional parameters
 * @return {Promise} - Returns the newly created paylink object
 */
function createPaylink(api, title, items, optionalParams) {
    // TODO check if this is a good idea
    return api.post('/api/2/paylink', Object.assign({ title, items }, optionalParams));
}

/**
 * Retrieve paylink by ID.
 * @see http://techdocs.spid.no/endpoints/GET/paylink/%7BpaylinkId%7D/
 * @param  {Api} api
 * @param  {string} paylinkId - ID of the paylink to retrieve.
 * @return {Promise} - The paylink object
 */
function getPaylink(api, paylinkId) {
    return api.get(`/api/2/paylink/${paylinkId}`);
}

/**
 * Mark paylink as deleted. This will effectively disable the paylink, but it will not be
 * physically deleted from SPiD.
 * @see http://techdocs.spid.no/endpoints/DELETE/paylink/%7BpaylinkId%7D/
 * @param  {Api} api
 * @param  {string} paylinkId - ID of the paylink to delete
 * @return {Promise} - A paylink object, with its status changed to -1 (deleted)
 */
function deletePaylink(api, paylinkId) {
    return api.delete(`/api/2/paylink/${paylinkId}`);
}

/**
 * Create a PayLink object.
 * @see http://techdocs.spid.no/endpoints/POST/p2plink/
 * @param  {Api} api
 * @param {string} title - The PayLink title. Displayed to the user on the payment page, and
 *        shown on the New Credit Card page at Payex.
 * @param {string} items - The items to be sold. A list of PayLink Item objects.
 * @param {string} hash - a hash string
 * @param {object} attributes - an object that contains optional attributes
 * @return {Promise} - Returns the newly created paylink object
 */
function createP2pLink(api, title, items, hash, attributes) {
    return api.post('/api/2/p2plink', Object.assign({ title, items, hash }, attributes));
}

module.exports = { createPaylink, getPaylink, deletePaylink, createP2pLink };
