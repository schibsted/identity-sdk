'use strict';

/** @module asset **/

/**
 * Retrieve asset access for a particular user
 * @see http://techdocs.spid.no/endpoints/GET/user/%7Bid%7D/asset/%7BassetId%7D/
 * @param  {Api} api
 * @param  {string} userId
 * @param  {string} assetId
 * @return {Promise}
 */
function queryAccess(api, userId, assetId) {
    return api.get(`/api/2/user/${userId}/asset/${assetId}`, { id: userId, assetId });
}

/**
 * Get asset-access objects by user id and list of asset ids.
 * @see http://techdocs.spid.no/endpoints/GET/user/%7Bid%7D/assets/%7BassetIds%7D/
 * @param  {Api} api
 * @param  {string} userId
 * @param  {string} assetId
 * @return {Promise}
 */
function queryAccessObject(api, userId, assetId) {
    return api.get(`/api/2/user/${userId}/asset/${assetId}`, { id: userId, assetId });
}

/**
 * Create or update asset access for a user and asset.
 * @see http://techdocs.spid.no/endpoints/POST/user/%7Bid%7D/asset/%7BassetId%7D/
 * @param  {Api} api
 * @param  {string} userId - ID of the user to associate data with
 * @param  {string} assetId - The asset id. Max length is 255 bytes.
 * @param  {string} accessUntil - If set, access will be denied after this date time. ("Y-m-d H:i:s")
 * @return {Promise}
 */
function updateAccess(api, userId, assetId, accessUntil) {
    return api.post(`/api/2/user/${userId}/asset/${assetId}`, { accessUntil });
}

/**
 * Delete asset access by user id and asset id.
 * @see http://techdocs.spid.no/endpoints/DELETE/user/%7Bid%7D/asset/%7BassetId%7D/
 * @param  {Api} api
 * @param  {string} userId
 * @param  {string} assetId
 * @return {Promise}
 */
function revokeAccess(api, userId, assetId) {
    return api.delete(`/api/2/user/${userId}/asset/${assetId}`);
}

/**
 * List all the user's assets by user id.
 * @see http://techdocs.spid.no/endpoints/GET/user/%7Bid%7D/assets/
 * @param  {Api} api
 * @param  {string} userId
 * @return {Promise}
 */
function getUserAssets(api, userId) {
    return api.get(`/api/2/user/${userId}/assets`);
}

/**
 * Get count of users that have access to specific asset.
 * @see http://techdocs.spid.no/endpoints/GET/asset/%7Bid%7D/users/count/
 * @param  {Api} api
 * @param  {string} assetId
 * @return {Promise}
 */
function getUserCount(api, assetId) {
    return api.get(`/api/2/asset/${assetId}/users/count`);
}

module.exports = {
    queryAccess, queryAccessObject, updateAccess, revokeAccess, getUserAssets, getUserCount
};
