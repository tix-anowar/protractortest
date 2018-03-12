import { browser } from 'protractor';
import { CompanyManagerPage } from '../main/tix.company-manager-page';

var globalConfig = require("../../tix.global-config.json");


describe('C133-C136 Admin panel Company Manager validation', () => {

    var defaultSpecDelayTime = globalConfig.defaultSpecDelayTime;

    afterEach(() => {
        browser.sleep(defaultSpecDelayTime);
    });

    let companyManagerPage = new CompanyManagerPage();

    describe('C133 - UI validation', () => {

        it('should load Company Manager ledger page on clicking Company Manager Icon', (done) => {
            expect(companyManagerPage.clickCompanyManagerIconAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should display "Companies" as header text', (done) => {
            expect(companyManagerPage.getCompanyManagerPageHeaderText()).toEqual('Companies');
            done();
        });

        it('should display "Company manager" table column names', (done) => {
            expect(companyManagerPage.checkCompanyManagerPageTableColumnNames()).toBe(true);
            done();
        });

        it('should display "Add" button on top-right corner', (done) => {
            expect(companyManagerPage.checkIfAddButtonExists()).toBe(true);
            done();
        });

    });


    describe('C134 - Add functionality validation', () => {

        it('should redirect user to "Create Company" page', (done) => {
            expect(companyManagerPage.clickAddButtonToCreateCompany()).toBe(true);
            done();
        });

        it('should display all "Create Company" page tabs', (done) => {
            expect(companyManagerPage.checkCreateCompanyPageTabNames()).toBe(true);
            done();
        });

        it('should load Relationships page on clicking Relationships tab', (done) => {
            expect(companyManagerPage.clickRelationshipsTabAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should load Bank Accounts page on clicking Bank Accounts tab', (done) => {
            expect(companyManagerPage.clickBankAccountsTabAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should load Addresses page on clicking Addresses tab', (done) => {
            expect(companyManagerPage.clickAddressesTabAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should load Contacts page on clicking Contacts tab', (done) => {
            expect(companyManagerPage.clickContactsTabAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should load API Access page on clicking API Access tab', (done) => {
            expect(companyManagerPage.clickAPIAccessTabAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should load Details page on clicking Details tab', (done) => {
            expect(companyManagerPage.clickDetailsTabAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should create a company', (done) => {
            expect(companyManagerPage.createCompany()).toBe(true);
            done();
        });

        it('should add the newly created company in company list', (done) => {
            expect(companyManagerPage.checkIfCreatedCompanyAddedInCompanyList()).toBe(true);
            done();
        });

    });

    describe('C135 - Edit functionality validation', () => {

        it('should edit first company of company list', (done) => {
            expect(companyManagerPage.updateFirstCompany()).toBe(true);
            done();
        });

        it('should update first company in company list', (done) => {
            expect(companyManagerPage.checkIfCompanyUpdatedInCompanyList()).toBe(true);
            done();
        });

    });

    describe('C136 - Advance Filter functionality validation', () => {

        it('should display search data in search result', (done) => {
            expect(companyManagerPage.checkIfAdvanceFilterWorks()).toBe(true);
            done();
        });

        it('should reset the page after search', (done) => {
            expect(companyManagerPage.resetPage()).toBe(true);
            done();
        });

    });

});