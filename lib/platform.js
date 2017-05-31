'use strict';

/** @module platform **/

/**
 * Get a list with descriptions of all endpoints.
 * You can also fetch information about a single endpoint, but this is merely a network efficiency
 * feature. The exact same information is provided (i.e., there are no further details than what's
 * available from the full listing), but the payload is much smaller than fetching the whole listing.
 * TODO maybe just get an object as input?
 * @see http://techdocs.spid.no/endpoints/GET/endpoints/
 * @param  {Api} api
 * @param  {string} [name]
 * @param  {string} [url]
 * @return {Promise}
 */
function getEndpoints(api, name, url) {
    return api.get('/api/2/endpoints', { name, url });
}

/**
 * Describe an objects's enumerable properties, optionally translated to one of the available
 * locales. This endpoint provides meaningful human-readable explanations of numbers used e.g. for
 * user status and other fields.
 * @see http://techdocs.spid.no/endpoints/GET/describe/%7Bobject%7D/
 * @param  {Api} api
 * @param  {string} objectType
 * @param  {string} property
 * @param  {string} locale
 * @return {Promise}
 */
function describeObject(api, objectType, property, locale) {
    return api.get(`/api/2/describe/${objectType}`, { property, locale });
}

/**
 * Get information about the platform and its status. Useful to check if the SPiD API is up and
 * running.
 * @see http://techdocs.spid.no/endpoints/GET/status/
 * @param  {Api} api
 * @return {Promise}
 */
function getStatus(api) {
    return api.get('/api/2/status');
}

/**
 * This endpoint serves two purposes:
 * * Retrieve the terms for SPiD or the client
 * * Check whether a user has accepted the SPiD or client terms
 * To check whether a user has accepted the terms, provide an oauth token. If the user has accepted
 * all the terms, the returned text will be empty, but accepted will be true.
 * @see http://techdocs.spid.no/endpoints/GET/terms/
 * TODO this is at least 2-3 functions (maybe build on top of this?)
 * @param  {Api} api
 * @param  {object} criteria - the search criteria
 * @return {Promise}
 */
function searchTerms(api, criteria) {
    return api.get('/api/2/terms', criteria);
}

/**
 * List all clients in SPiD.
 * @see http://techdocs.spid.no/endpoints/GET/clients/
 * @param  {Api} api
 * @return {Promise}
 */
function listAllClients(api) {
    return api.get('/api/2/clients');
}

/**
 * Retrieve a single client by its client id.
 * @see http://techdocs.spid.no/endpoints/GET/client/%7Bclient_id%7D/
 * @param  {Api} api
 * @param  {string} clientId
 * @return {Promise}
 */
function getClient(api, clientId) {
    return api.get(`/api/2/client/${clientId}`);
}

module.exports = {
    getEndpoints, describeObject, getStatus, getStatus, searchTerms, listAllClients, getClient
};
