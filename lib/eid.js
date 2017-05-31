'use strict';

/** @module eid **/

/**
 * Find out if a user has a verification level and the data he has through that.
 * @see http://techdocs.spid.no/endpoints/GET/user/%7Bid%7D/eid/
 * @param  {Api} api
 * @param  {string} userId
 * @return {Promise}
 */
function queryUserVerificationLevel(api, userId) {
    return api.get(`/api/2/user/${userId}/eid`);
}

/**
 * Start a verification process and get an eID initialization reference to complete the process.
 * @see http://techdocs.spid.no/endpoints/POST/eid/init/
 * @param  {Api} api
 * @param  {string} userId
 * @param  {string} ssn
 * @param  {string} hash
 * @return {Promise}
 */
function verifyUser(api, userId, ssn, hash) {
    return api.post('/api/2/eid/init', { ssn, userId, hash });
}

/**
 * Provide the remaining lockable fields and the verification data (legal address).
 * @see http://techdocs.spid.no/endpoints/POST/eid/complete/
 * @param  {Api} api
 * @param  {string} userId
 * @param  {string} ssn
 * @param  {string} verifiedFields
 * @param  {string} initRef
 * @return {Promise}
 */
function completeUserVerification(api, userId, ssn, verifiedFields, initRef) {
    return api.post('/api/2/eid/complete', { userId, ssn, verifiedFields, initRef });
}

module.exports = {
    queryUserVerificationLevel, verifyUser, completeUserVerification
};
