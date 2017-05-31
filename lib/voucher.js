'use strict';

/** @module voucher **/

/**
 * Retrieve a specific voucher.
 * @see http://techdocs.spid.no/endpoints/GET/voucher/%7BvoucherCode%7D/
 * @param  {Api} api
 * @param  {string} voucherCode - Unique code of the voucher to retrieve
 * @return {Promise}
 */
function getVoucher(api, voucherCode) {
    return api.get(`/voucher/${voucherCode}`);
}

/**
 * Create vouchers for a voucher group. The vouchers themselves are not
 * returned, only an indication of success or failure. Failures indicate
 * that the voucher group is not available or that you are requesting more
 * vouchers than the limit on the group allows for. Information about
 * failures can be found in the error property of the container.
 * If the voucher group is shared (i.e. its unique property is 0), this
 * endpoint will respond with a 404, as individual vouchers cannot be
 * generated from a shared voucher group.
 * @see http://techdocs.spid.no/endpoints/POST/vouchers/generate/%7BvoucherGroupId%7D/
 * @param  {Api} api
 * @param  {string} voucherGroupId - ID of the voucher group to generate vouchers for
 * @param  {string} [amount] - The number of unique vouchers to generate
 *         TODO this accepts a number! Maybe we should cast it to make dev life easier
 * @return {Promise}
 */
function createVouchers(api, voucherGroupId, amount) {
    return api.post(`/api/2/vouchers/generate/${voucherGroupId}`, { amount });
}

/**
 * Get generated voucher codes. The codes that are returned in this endpoint
 * gets their status changed to "handed out". They will not be returned
 * again by repeated calls to this endpoint. Handed out vouchers are in
 * limbo until used. The person or system that hands out vouchers must be
 * responsible for remembering them or making sure they are used. See the
 * separate endpoint for automatically giving a voucher to a user.
 * @see http://techdocs.spid.no/endpoints/POST/vouchers/handout/%7BvoucherGroupId%7D/
 * @param  {Api} api
 * @param  {string} voucherGroupId - ID of the voucher group to generate vouchers for
 * @param  {string} [amount] - The number of unique vouchers to generate
 *         TODO this accepts a number! Maybe we should cast it to make dev life easier
 * @return {Promise}
 */
function createHandOutVouchers(api, voucherGroupId, amount) {
    return api.post(`/api/2/vouchers/handout/${voucherGroupId}`, { amount });
}

/**
 * Hands out a voucher to user. Assumes that vouchers for the voucher group
 * has been generated upfront, and that there are available vouchers that
 * are neither redeemed, handed out, nor expired. The voucher that is given
 * to the user has its status changed to "handed out".
 * Failure means a voucher was not available. More info on failure may be
 * found in the error value of the container.
 * @see http://techdocs.spid.no/endpoints/POST/voucher_handout/
 * @param  {Api} api
 * @param  {string} userId - ID of the user to give the voucher to
 * @param  {string} voucherGroupId - The voucher group from which to hand out a voucher
 * @return {Promise}
 */
function handOutVoucher(api, userId, voucherGroupId) {
    return api.post('/api/2/voucher_handout', { userId, voucherGroupId });
}

/**
 * List/search for voucher groups
 * @see http://techdocs.spid.no/endpoints/GET/vouchers/groups/
 * @param  {Api} api
 * @param  {string} title - Find the voucher group with this title (exact match)
 * @param  {string} campaignId - Find voucher-groups applicable to this campaign
 * @param  {VoucherType} type - Find voucher-groups of this type
 * @param  {string} productId - Find voucher groups applicable to this product (i.e. giveaways for
 *         this product)
 *         TODO The pagination parameters limit and offset are also supported.
 * @return {Promise}
 */
function findVoucherGroups(api, title, campaignId, type, productId) {
    return api.get('/vouchers/groups', { title, campaignId, type, productId });
}

/**
 * Retrieve a specific voucher group.
 * @see http://techdocs.spid.no/endpoints/GET/vouchers/group/%7BvoucherGroupId%7D/
 * @param  {Api} api
 * @param  {string} voucherGroupId
 * @return {Promise}
 */
function getVoucherGroup(api, voucherGroupId) {
    return api.get(`/vouchers/groups/${voucherGroupId}`);
}

/**
 * Update a voucher group
 * TODO TODO it's better if it just gets an object for future compatibility
 * @see http://techdocs.spid.no/endpoints/POST/vouchers/group/%7BvoucherGroupId%7D/
 * @param  {Api} api
 * @param  {string} voucherGroupId - ID of the voucher group
 * @param  {string} [title] - New title
 * @param  {string} [description] - New description
 * @param  {string} [limit] - New limit
 * @return {Promise} - Returns the updated voucher group
 */
function updateVoucherGroup(api, voucherGroupId, title, description, limit) {
    return api.post(`/api/2/vouchers/groups/${voucherGroupId}`, { title, description, limit });
}

/**
 * Create a new voucher group. A voucher group is a template from which
 * vouchers can be generated, it describes what kind of access its vouchers
 * grant.
 * Once a voucher group is created, you must generate individual vouchers to
 * hand out.
 * In order to use this endpoint, your client must have a voucher_prefix.
 * This field is set by SPiD administrators, if it is not set, you will get
 * an error like "Set generator used, but no client voucher prefix set". If
 * this happens, contact support.
 * @see http://techdocs.spid.no/endpoints/POST/vouchers/group/
 * @param  {Api} api
 * @param  {object} voucherGroup - The properties of the voucher group to create
 *         TODO some parameters are numerical but must be converted to string
 *         TODO maybe we can define the VoucherGroup type?
 * @return {Promise} - the newly created voucher group object
 */
function createVoucherGroup(api, voucherGroup) {
    return api.post('/api/2/vouchers/group', voucherGroup);
}

module.exports = {
    getVoucher, createVouchers, createHandOutVouchers, handOutVoucher,
    findVoucherGroups, getVoucherGroup, updateVoucherGroup, createVoucherGroup
};
