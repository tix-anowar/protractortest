import { browser } from 'protractor';
import { InvoiceLedgerPage } from '../main/tix.invoice-ledger-page';

var globalConfig = require("../../tix.global-config.json");

describe('C123-C128 - Admin panel Invoice Ledger validation', () => {

    var defaultSpecDelayTime = globalConfig.defaultSpecDelayTime;

    afterEach(() => {
        browser.sleep(defaultSpecDelayTime);
    });

    let invoiceLedgerPage: InvoiceLedgerPage = new InvoiceLedgerPage();

    describe('C123 - Invoice tab UI validation', () => {

        it('should load Invoice page on clicking invoice ledger icon', (done) => {
            expect(invoiceLedgerPage.clickInvoiceLedgerIconAndCheckForPageLoad()).toBe(true);
            done();
        });

        it('should display all invoice ledger tabs', (done) => {
            expect(invoiceLedgerPage.checkInvoiceLedgerPageTabNames()).toBe(true);
            done();
        });

        it('should varify Invoice as only default tab', (done) => {
            invoiceLedgerPage.getDefaultTabName().then((elm) => {
                expect(elm).toEqual('Invoice');
                expect(elm).not.toEqual('Audit');
                expect(elm).not.toEqual('Version');
                expect(elm).not.toEqual('Trade');
                expect(elm).not.toEqual('Insurance');
            });
            done();
        });

        it('should display "Invoice Ledger" as header text', (done) => {
            expect(invoiceLedgerPage.getInvoiceLedgerPageHeaderText()).toEqual('Invoice Ledger');
            done();
        });

        it('should display Invoice data table column names', (done) => {
            expect(invoiceLedgerPage.checkInvoicePageTableColumnNames()).toEqual(true);
            done();
        });

    });


    describe('C124 - Audit tab UI validation', () => {

        it('should load Audit page on clicking Audit tab', (done) => {
            expect(invoiceLedgerPage.clickAuditTabAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should display Audit data table column names', (done) => {
            expect(invoiceLedgerPage.checkAuditPageTableColumnNames()).toBe(true);
            done();
        });

    });


    describe('C125 - Version tab UI validation', () => {

        it('should load Version page on clicking Version tab', (done) => {
                expect(invoiceLedgerPage.clickVersionTabAndcheckForPageLoad()).toBe(true);
                done();
        });

        it('should display Version data table column names', (done) => {
            expect(invoiceLedgerPage.checkVersionPageTableColumnNames()).toBe(true);
            done();
        });

    });


    describe('C126 - Trade tab UI validation', () => {

        it('should load Trade page on clicking Trade tab', (done) => {
                expect(invoiceLedgerPage.clickTradeTabAndcheckForPageLoad()).toBe(true);
                done();
        });

        it('should display Trade data table column names', (done) => {
            expect(invoiceLedgerPage.checkTradePageTableColumnNames()).toBe(true);
            done();
        });

    });


    describe('C127 - Insurance tab UI validation', () => {

        it('should load Insurace page on clicking Inusrance tab', (done) => {
            expect(invoiceLedgerPage.clickInsuranceTabAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should display Insurance data table column names', (done) => {
            expect(invoiceLedgerPage.checkInsurancePageTableColumnNames()).toBe(true);
            done();
        });

    });

    describe('C128 - Advance Filter functionality validation', () => {

        it('should display search data in search result', (done) => {
            expect(invoiceLedgerPage.checkIfAdvanceFilterWorks()).toBe(true);
            done();
        });

        it('should reset the page after search', (done) => {
            expect(invoiceLedgerPage.resetPage()).toBe(true);
            done();
        });

    });

});