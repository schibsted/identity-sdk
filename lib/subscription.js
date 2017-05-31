'use strict';

/** @module subscription **/

/**
 * Create user subscription.
 * @see http://techdocs.spid.no/endpoints/POST/user/%7BuserId%7D/subscription/
 * @param  {Api} api
 * @param  {string} userId - Create subscription for the user with this uuid or userId (not to
 *         be mistaken with the deprecated id).
 * @param  {string} productId - The product to subscribe the user to
 * @param  {dateString} startDate - The date from when the subscription is valid
 * @param  {string} orderId - OrderId of the order used to create the subscription.
 * @param  {dateString} expires - The date/time (YYYY-MM-DD HH:MM:SS), or the number of seconds
 *         from now when the subscription expires
 * @return {Promise}
 */
function subscribeUser(api, userId, productId, startDate, orderId, expires) {
    return api.post('/api/2/user/{userId}/subscription',
        { userId, productId, startDate, orderId, expires });
}

/**
 * Set the subscription to stop renewal after the lock period is over.
 * @see http://techdocs.spid.no/endpoints/POST/user/%7BuserId%7D/subscription/%7BsubscriptionId%7D/stop/
 * @param  {Api} api
 * @param  {string} userId - The user's uuid or userId (not to be mistaken with the deprecated
 *         id).
 * @param  {string} subscriptionId - The id of the subscription to terminate
 * @param  {string} stopAfterLock - "1", to set the subscription to stop renewal after the lock
 *         period is over, "0" means do not stop renewal after lock period
 * @return {Promise}
 */
function terminate(api, userId, subscriptionId, stopAfterLock) {
    return api.post(`/api/2/user/${userId}/subscription`, { subscriptionId, stopAfterLock });
}

/**
 * Fetch a user's subscription by the user and subscription ids.
 * @see http://techdocs.spid.no/endpoints/GET/user/%7BuserId%7D/subscription/%7BsubscriptionId%7D/
 * @param  {Api} api
 * @param  {string} userId - The user's uuid or userId (not to be mistaken with the deprecated id).
 * @param  {string} subscriptionId - The id of the subscription to retrieve
 * @return {Promise}
 */
function getForUser(api, userId, subscriptionId) {
    return api.get(`/api/2/user/${userId}/subscription/${subscriptionId}`);
}

/**
 * List all the user's subscriptions within this client.
 * @see http://techdocs.spid.no/endpoints/GET/user/%7BuserId%7D/subscriptions/
 * @param  {Api} api
 * @param {string} userId - The user's uuid or userId (not to be mistaken with the deprecated id).
 * @return {Promise}
 */
function getAllForUser(api, userId) {
    return api.get(`/api/2/user/${userId}/subscriptions`);
}

/**
 * Change a subscription's auto-renewal status. Other attributes can currently not be updated.
 * @see http://techdocs.spid.no/endpoints/POST/user/%7BuserId%7D/subscription/%7BsubscriptionId%7D/
 * @param  {Api} api
 * @param {string} userId - The user's uuid or userId (not to be mistaken with the deprecated id).
 * @param  {string} subscriptionId - The id of the subscription to be updated
 * @param {string} autoRenew - "1", to enable auto-renewal, "0" to disable
 * @return {Promise} - Returns the updated subscription
 */
function setAutoRenewal(api, userId, subscriptionId, autoRenew) {
    // TODO the code example has access token!
    return api.post(`/api/2/user/${userId}/subscription/${subscriptionId}`, { autoRenew });
}

/**
 * Expires a subscription.
 * @see http://techdocs.spid.no/endpoints/DELETE/user/%7BuserId%7D/subscription/%7BsubscriptionId%7D/
 * @param  {Api} api
 * @param  {string} userId - The user's uuid or userId (not to be mistaken with the deprecated id).
 * @param  {string} subscriptionId - The id of the subscription to be deleted
 * @return {Promise} - Returns the expired subscription
 */
function expire(api, userId, subscriptionId) {
    return api.delete(`/api/2/user/${userId}/subscription/${subscriptionId}`);
}

/**
 * Filters and sorts the list of all subscriptions for a user.
 * @see http://techdocs.spid.no/endpoints/GET/subscriptions/
 * @param  {Api} api
 * @param {object} criteria - the search and sort criteria
 * @return {Promise} - A list of Subscription objects.
 */
function search(api, criteria) {
    return api.get('/api/2/subscriptions', criteria);
}

module.exports = {
    subscribeUser, terminate, getForUser, getAllForUser, setAutoRenewal, expire, search
};
