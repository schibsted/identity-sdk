'use strict';

/** @module token
 * @remark this module needs some improvements to documentations.
 * The endspoints and their parameters need to be conformed
 */

/**
 * programatically obtain a user token given your client id, client secret and a user's credentials
 * @remark You shouldn't be using this endpoint in production. @link {introspect}
 * @see http://techdocs.spid.no/authentication/#obtaining-a-user-token
 * @param  {Api} api
 * @param {string} username
 * @param {string} password
 * @param {string} redirectUri
 * @return {Promise}
 */
function getUserToken(api, username, password, redirectUri) {
    return api.post('/oauth/token', {
        grant_type: 'password',
        redirect_uri: redirectUri,
        username,
        password
    });
}

/**
 * Get a server token
 * @see http://techdocs.spid.no/authentication/#obtaining-a-server-token
 * @param {Api} api
 * @param {string} redirectUri
 * @return {Promise}
 */
function getServerToken(api, redirectUri) {
    return api.post('/oauth/token', {
        grant_type: 'client_credentials',
        redirect_uri: redirectUri
    });
}

/**
 * TODO this is probably not documented
 * TODO resourceServer can also be specified like introspect() see its techdocs
 * @param  {Api} api
 * @param {string} code
 * @param {string} redirectUri
 * @return {Promise}
 */
function getFromAuthCode(api, code, redirectUri) {
    return api.post('/oauth/token', {
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code
    });
}

/**
 * Introspects a token
 * TODO this is probably not documented
 * TODO Later support token_type_hint @see https://tools.ietf.org/html/rfc7662#section-2.1
 * @see http://techdocs.spid.no/token-introspection/
 * @param {Api} api
 * @param {string} token - access token
 * @param {string} [resourceServer] - the resource owner. To use a token
 *        with a resource server when doing server-to-server authentication
 *        it might be necessary to explicitly indicate the resource server
 *        as the intended audience of the token. This allows the resource
 *        server to properly introspect the token.
 * @return {object} see Techdocs and the spec for more details.
 *         @see https://tools.ietf.org/html/rfc7662#section-2.2. The most
 *         important property of the returned object is 'active' which
 *         specifies if this token is still valid.
 */
function introspect(api, token, resourceServer) {
    const data = { token };
    if (resourceServer) {
        // @see http://techdocs.spid.no/authentication/
        data.resource = resourceServer;
    }
    return api.post('/oauth/introspect', data);
}

/**
 * List out token names for client.
 * @see http://techdocs.spid.no/endpoints/GET/injectable/names/
 * @param  {Api} api
 * @return {Promise} - TODO no documentation
 */
function getTokens(api) {
    return api.get('/api/2/injectable/names');
}

/**
 * Import tokens.
 * @see http://techdocs.spid.no/endpoints/POST/injectable/import/
 * @param  {Api} api
 * @param  {string} tokenName
 * @param  {string} content
 * @return {Promise}
 */
function importTokens(api, tokenName, content) {
    return api.post('/api/2/injectable/import', { tokenName, content });
}

/**
 * Provides API services a means of validating and authenticating requests done to them by checking
 * the token.
 * @see http://techdocs.spid.no/endpoints/GET/token/%7Btoken%7D/authentication/
 * @param  {Api} api
 * @param  {string} token
 * @return {Promise}
 */
function checkToken(api, token) {
    return api.get(`/api/2/token/${token}/authentication`);
}

/**
 * Get a one-time authentication code for the current user. This code can be given to another client
 * who may use it to request an access token for the same user.
 * @see http://techdocs.spid.no/endpoints/POST/oauth/exchange/
 * @param  {Api} api
 * @param  {string} clientId
 * @param  {string} type
 * @param  {string} redirectUri
 * @return {Promise}
 */
function exchange(api, clientId, type, redirectUri) {
    return api.post('/api/2/oauth/exchange', {
        client_id: clientId,
        type,
        redirect_uri: redirectUri
    });
}

module.exports = {
    getUserToken, getServerToken, getFromAuthCode, introspect, getTokens, importTokens,
    checkToken, exchange
};
