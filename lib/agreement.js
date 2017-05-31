'use strict';

/** @module agreement **/

/**
 * Lists platform and client Terms & Conditions acceptance status for specified user.
 * @see http://techdocs.spid.no/endpoints/GET/user/%7BuserId%7D/agreements/
 * @param {Api} api
 * @param {string} userId - The user's uuid or userId (not to be mistaken with the deprecated id).
 * @return {Promise} - Returns agreements object, containing boolean values whether latest agreements are accepted
 */
function get(api, userId) {
    return api.get(`/api/2/user/${userId}/agreements`);
}

/**
 * accept platform and client Terms & Conditions for a specified user.
 * @see http://techdocs.spid.no/endpoints/POST/user/%7BuserId%7D/agreements/accept/
 * @param {Api} api
 * @param {string} userId - The user's uuid or userId (not to be mistaken with the deprecated id).
 * @return {Promise} - Returns status of default and client agreements acceptance process.
 */
function accept(api, userId) {
    return api.post(`/user/${userId}/agreements/accept`);
}

module.exports = { get, accept };
