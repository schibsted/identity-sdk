'use strict';

/** @module dataobject **/

/**
 * Store data objects associated with this user. The data objects API is a general-purpose key-value
 * store for storing user meta data. Data objects can be any kind of data. SPiD does not know assume
 * any knowledge about the type or purpose of the values, and any type information, de-serializing
 * etc must be done on the client.
 * @see http://techdocs.spid.no/endpoints/POST/user/%7Bid%7D/dataobject/%7Bkey%7D/
 * @param {Api} api
 * @param {string} userId
 * @param {string} key
 * @param {*} value
 * @return {Promise}
 */
function setForUser(api, userId, key, value) {
    return api.post(`/api/2/user/${userId}/dataobject/${key}`, { value });
}

/**
 * Retrieve data objects associated with this user
 * @see http://techdocs.spid.no/endpoints/GET/user/%7Bid%7D/dataobject/%7Bkey%7D/
 * @param  {Api} api
 * @param  {string} userId
 * @param  {string} key
 * @return {Promise}
 */
function getForUser(api, userId, key) {
    return api.get(`/api/2/user/${userId}/dataobject/${key}`);
}

/**
 * List data objects stored for a user.
 * @see http://techdocs.spid.no/endpoints/GET/user/%7Bid%7D/dataobjects/
 * @param  {Api} api
 * @param  {string} userId
 * @param  {string} key
 * @param  {string} sort
 * @param  {object} filters
 * @return {Promise}
 */
function getForAllUsers(api, userId, key, sort, filters) {
    return api.get(`/api/2/user/${userId}/dataobjects`, { key, sort, filters });
}

/**
 * List all data objects.
 * @see http://techdocs.spid.no/endpoints/GET/dataobjects/
 * @param  {Api} api
 * @param  {string} key
 * @param  {string} sort
 * @param  {object} filters
 * @return {Promise}
 */
function getAll(api, key, sort, filters) {
    return api.get('/api/2/dataobjects', { key, sort, filters });
}

/**
 * Delete data objects associated with this user.
 * @see http://techdocs.spid.no/endpoints/DELETE/user/%7Bid%7D/dataobject/%7Bkey%7D/
 * @param  {Api} api
 * @param  {string} userId
 * @param  {string} key
 * @return {Promise}
 */
function deleteForUser(api, userId, key) {
    return api.delete(`/api/2/user/${userId}/dataobject/${key}`);
}

module.exports = {
    setForUser, getForUser, getForAllUsers, getAll, deleteForUser
};
