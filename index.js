'use strict';

const agreement = require('./lib/api/agreement');
const asset = require('./lib/api/asset');
const auth = require('./lib/api/auth');
const campaign = require('./lib/api/campaign');
const connection = require('./lib/api/connection');
const dataobject = require('./lib/api/dataobject');
const eid = require('./lib/api/eid');
const kpi = require('./lib/api/kpi');
const paylink = require('./lib/api/paylink');
const platform = require('./lib/api/platform');
const product = require('./lib/api/product');
const subscription = require('./lib/api/subscription');
const token = require('./lib/api/token');
const user = require('./lib/api/user');
const voucher = require('./lib/api/voucher');

module.exports = {
    agreement, asset, auth, campaign, connection, dataobject, eid, kpi, paylink, platform, product,
    subscription, token, user, voucher
};
