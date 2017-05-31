'use strict';

/** @module auth **/

/**
 * List the user's login attempts (both failed and successful logins).
 * @see http://techdocs.spid.no/endpoints/GET/user/%7BuserId%7D/logins/
 * @param {Api} api
 * @param {string} userId - The user's uuid or userId (not to be mistaken with the deprecated id)
 * @param {string} [id] - Filter by login attempts from this IP address
 * @param {boolean} [status] - Filter by successful (true) or failed (false) logins
 * @param {string} [filters] - (merchant) Show all results within the current merchant rather than the current client
 * TODO doc says: The pagination parameters limit, since, offset, and until are also supported. Maybe it's an object
 * @return {Promise}
 */
function userLoginAttempts(api, userId, id, status, filters) {
    return api.get(`/api/2/user/${userId}/logins`, { id, status, filters });
}

/**
 * Query the platform for login attempts.
 * Every login attempt against your SPiD client(s), successful or not, is
 * logged.
 * TODO doc says: The pagination parameters limit, since, offset, and until are also supported.
 * Maybe it's an object
 * @see http://techdocs.spid.no/endpoints/GET/logins/
 * @param {Api} api
 * @param {string} [id] - Filter by login attempts from this IP address
 * @param {boolean} [status] - Filter by successful (true) or failed (false) logins
 * @param {string} [filters] - (merchant) Show all results within the current merchant rather than
 *        the current client
 * @return {Promise}
 */
function clientLoginAttempts(api, id, status, filters) {
    return api.get('/logins', { id, status, filters });
}

/**
 * Invalidates the provided oauth token and refresh token it is tied to.
 * @see http://techdocs.spid.no/endpoints/GET/logout/
 * @param {Api} api
 * @return {Promise}
 */
function logout(api) {
    return api.get('/api/2/logout');
}

/**
 * Starts the passwordless signin flow, where users can both be created and logged in.
 * @remark The passwordless endpoint is in closed BETA, and should not be used unless given explicit
 * permission.
 * TODO document that only one of phoneNumber or email should be present (and one should at least be
 * present)
 * @see http://techdocs.spid.no/endpoints/POST/passwordless/start/
 * @param {Api} api
 * @param {string} connection - Either "sms" or "email" depending on what kind of passwordless auth
 *        is required
 * @param {string} [phoneNumber] - Phone number if doing SMS auth
 * @param {string} [email]- Email address if doing email auth
 * @param {string} [locale] - Locale with which to send the message
 * @return {Promise}
 */
function startPasswordless(api, connection, phoneNumber, email, locale) {
    return api.post('/api/2/passwordless/start', { connection, phoneNumber, email, locale });
}

/**
 * resends the sms or email to the user, given the corresponding passwordless token.
 * @remark The passwordless endpoint is in closed BETA, and should not be used unless given explicit
 * permission.
 * @param {Api} api
 * @see http://techdocs.spid.no/endpoints/POST/passwordless/resend/
 * @param {string} passwordlessToken - Original passwordless token obtained from startPasswordless
 * @return {Promise} - UUID to reference passwordless data
 */
function resendPasswordless(api, passwordlessToken) {
    return api.post('/api/2/passwordless/resend', { passwordlessToken });
}

module.exports = {
    userLoginAttempts, clientLoginAttempts, logout, startPasswordless, resendPasswordless
};
