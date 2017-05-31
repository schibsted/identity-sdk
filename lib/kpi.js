'use strict';

/** @module kpi **/

/**
 * Get KPIs in this client.
 * @see http://techdocs.spid.no/endpoints/GET/kpis/
 * @param  {Api} api
 * @param  {string} name
 * @param  {string} sort
 * @return {Promise}
 */
function getKpis(api, name, sort) {
    return api.get('/api/2/kpis', { name, sort });
}

module.exports = { getKpis };
