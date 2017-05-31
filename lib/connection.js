'use strict';

/** @module connection **/

/**
 * Get verification and availability status for a phone number. Note that
 * the phone number should be base64 encoded, following
 * standard +46736151515.
 * @see http://techdocs.spid.no/endpoints/GET/phone/%7Bphone%7D/status/
 * @param {Api} api
 * @param {string} phone - The phone number to query status for
 * @return {Promise}
 */
function phoneStatus(api, phone) {
    return api.get(`/phone/${phone}/status`);
}

/**
 * Get verification and availability status for an email address. Note that
 * the email should be base64 encoded.
 * @see http://techdocs.spid.no/endpoints/GET/email/%7Bemail%7D/status/
 * @param {Api} api
 * @param {string} email - The email to query status for. Encode it in base64
 * @return {Promise}
 */
function emailStatus(api, email) {
    return api.get(`/email/${email}/status`);
}

module.exports = { phoneStatus, emailStatus };
