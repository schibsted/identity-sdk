'use strict';

/** @module campaign **/

/**
 * Retrieve a specific campaign object. @see http://techdocs.spid.no/types/campaign/
 * @see http://techdocs.spid.no/endpoints/GET/campaign/%7BcampaignId%7D/
 * @param  {Api} api
 * @param  {string} campaignId - The ID of the campaign to update
 * @return {Promise}
 */
function getCampaign(api, campaignId) {
    return api.get(`/api/2/campaign/${campaignId}`);
}

/**
 * Update a campaign
 * @see http://techdocs.spid.no/endpoints/POST/campaign/%7BcampaignId%7D/
 * @param  {Api} api
 * @param  {string} campaignId - The ID of the campaign to be updated
 * @param  {object} updatedFields - fields that should be updated
 * @return {Promise}
 */
function updateCampaign(api, campaignId, updatedFields) {
    return api.post(`/api/2/campaign/${campaignId}`, updatedFields);
}

/**
 * Create a new campaign.
 * The receipt that a customer receives upon completing a purchase with the campaign may contain
 * additional text provided by the client. This text may also include Inject Tokens that will be
 * replaced at the time of receipt generation.
 * @see http://techdocs.spid.no/endpoints/POST/campaign/
 * @param {Api} api
 * @param {object} campaignFields - an object that describes all properties of the new campaign
 * @return {Promise}
 */
function createCampaign(api, campaignFields) {
    return api.post('/api/2/campaign', campaignFields);
}

/**
 * Searchs and sorts through all campaigns for a client
 * @see http://techdocs.spid.no/endpoints/GET/campaigns/
 * @param {Api} api
 * @param {object} criteria - the search and sort criteria
 * @param {object} criteria.filters - the filters
 * @return {Promise}
 */
function searchCampaigns(api, criteria) {
    return api.get('/api/2/campaigns', criteria);
}

module.exports = { getCampaign, updateCampaign, createCampaign, searchCampaigns };
