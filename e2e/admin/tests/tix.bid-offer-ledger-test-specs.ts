import { browser } from 'protractor';
import { BidOfferLedgerPage } from '../main/tix.bid-offer-ledger-page';

var globalConfig = require("../../tix.global-config.json");


describe('C129-C130 Admin panel Bid/Offer ledger validation', () => {

    var defaultSpecDelayTime = globalConfig.defaultSpecDelayTime;

    afterEach(() => {
        browser.sleep(defaultSpecDelayTime);
    });

    let bidOfferLedgerPage = new BidOfferLedgerPage();

    describe('C129 - UI validation', () => {

        it('should load bid/offer ledger page on clicking Bid Offer Ledger Icon', (done) => {
            expect(bidOfferLedgerPage.clickBidOfferIconAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should display "Bid/Offer Ledger" as header text', (done) => {
            expect(bidOfferLedgerPage.getBidOfferLedgerPageHeaderText()).toEqual('Bid/Offer Ledger');
            done();
        });

        it('should display "Bid/Offer Ledger" table column names', (done) => {
            expect(bidOfferLedgerPage.checkBidOfferPageTableColumnNames()).toBe(true);
            done();
        });

    });


    describe('C130 - Advance Filter functionality validation', () => {

        it('should display search data in search result', (done) => {
            expect(bidOfferLedgerPage.checkIfAdvanceFilterWorks()).toBe(true);
            done();
        });

        it('should reset the page after search', (done) => {
            expect(bidOfferLedgerPage.resetPage()).toBe(true);
            done();
        });

    });

});