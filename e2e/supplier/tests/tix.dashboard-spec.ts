import { browser } from 'protractor';
import { DashboardPage } from '../main/tix.dashboard-page';

const globalConfig = require('../../tix.global-config.json');

describe('Producer Dashboard', () => {

  let dashboardPage: DashboardPage = new DashboardPage();
  const defaultSpecDelayTime = globalConfig.defaultSpecDelayTime;

  beforeAll(() => {
    browser.sleep(defaultSpecDelayTime);
  });

  afterEach(() => {
    browser.sleep(defaultSpecDelayTime);
  });

  describe('C109 - Home Dashboard and Left Menu functionality UI validation', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('1. should display tradeix logo', done => {
      expect(dashboardPage.hasTradeixLogo()).toBe(true);
      done();
    });

    it('2. should contain three options in left menu', done => {
      expect(dashboardPage.isProducerDashboardMenuExists()).toBe(true);
      expect(dashboardPage.isFileUploadMenuExists()).toBe(true);
      expect(dashboardPage.isProfileMenuExits()).toBe(true);
      done();
    });

    it('3. should display minimum 1 and maximum 3 currency box at producer dashboard', done => {
      dashboardPage.getNumberOfCurrencyBoxes().then((count) => {
        expect(count >= 1 && count <= 3).toBe(true);
        done();
      });
    });
  });

  xdescribe('C110 - Create Offer and back to Dashboard process validation', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('1. should found at least one button as enabled of Fund USD/GBP/EUR', done => {
      expect(dashboardPage.checkIfEnabledFundButtonExists()).toBe(true);
      done();
    });

    it('2. should click on Fund USD button', done => {
      expect(dashboardPage.clickOnActiveFundButton()).toBe(true);
      done();
    });

    it('3. should choose any one Buyer from the list and then click on "Next" button', done => {
      expect(dashboardPage.chooseFirstAvailabaleBuyerAndClickNext()).toBe(true);
      done();
    });

    it('4. should choose any one Invoice from the list and then click on "Next" button', done => {
      expect(dashboardPage.chooseFirstAvailableInvoiceAndClickNext()).toBe(true);
      done();
    });

    it('5. should click on "Return to dashboard" button from pop-up', done => {
      expect(dashboardPage.clickReturnToDashboardButtonFromPopup()).toBe(true);
      done();
    });

  });

  xdescribe('C111 - Create Offer and Bid Accept process vaidation', () => {

    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('1. should found at least one button as enabled of Fund USD/GBP/EUR', done => {
      expect(dashboardPage.checkIfEnabledFundButtonExists()).toBe(true);
      done();
    });

    it('2. should click on first enabled Fund button of USD/GBP/EUR', done => {
      expect(dashboardPage.clickOnActiveFundButton()).toBe(true);
      done();
    });

    it('3. should choose any one Buyer from the list and then click on "Next" button', done => {
      expect(dashboardPage.chooseFirstAvailabaleBuyerAndClickNext()).toBe(true);
      done();
    });

    it('4. should choose any one Invoice from the list and then click on "Next" button', done => {
      expect(dashboardPage.chooseFirstAvailableInvoiceAndClickNext()).toBe(true);
      done();
    });

    it('5. should click on Review Pricing / bid(s) button', done => {
      expect(dashboardPage.clickReviewPricingOrBidsButtonFromPopup()).toBe(true);
      done();
    });

    it('6. should click  on "Accept" button', done => {
      expect(dashboardPage.clickAcceptButtonFromBidDetails()).toBe(true);
      done();
    });

    it('7. should click on "Ok" button from the "Bid Accepted" pop-up', done => {
      expect(dashboardPage.clickOkButtonFromBidAcceptedPopup()).toBe(true);
      done();
    });

  });

  xdescribe('C112 - View Offers, view Bid details and back to Dashboard process validation', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('1. should found at least one "View Offers" button as enabled for Fund USD/GBP/EUR', done => {
      expect(dashboardPage.checkIfEnabledViewOffersButtonExists()).toBe(true);
      done();
    });

    it('2. should click on first enabled "View Offers" button of USD/GBP/EUR', done => {
      expect(dashboardPage.clickOnActiveViewOffersButton()).toBe(true);
      done();
    });

    it('3. should click on any "View bid(s)/ Pricing Summary" button', done => {
      expect(dashboardPage.clickFirstViewBidsOrPricingSummaryButton()).toBe(true);
      done();
    });

    it('4. should click on "Cancel" button of view bid(s) or pricing summary', done => {
      expect(dashboardPage.clickCancelButtonOfViewBidsOrPricingSummary()).toBe(true);
      done();
    });

  });

  xdescribe('C113 - View Offers, view Bid details and Accept Bid process validation', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('1. should click on first enabled "View Offers" button of USD/GBP/EUR', done => {
      expect(dashboardPage.clickOnActiveViewOffersButton()).toBe(true);
      done();
    });

    it('2. should click on any "View bid(s)/ Pricing Summary" button', done => {
      expect(dashboardPage.clickFirstViewBidsOrPricingSummaryButton()).toBe(true);
      done();
    });

    it('3. should click on "Accept" button from Bid Details', done => {
      expect(dashboardPage.clickAcceptButtonFromBidDetails()).toBe(true);
      done();
    });

    it('4. should click on "Ok" button from the "Bid Accepted" pop-up', done => {
      expect(dashboardPage.clickOkButtonFromBidAcceptedPopup()).toBe(true);
      done();
    });

  });

  describe('C114 - Choose Buyers - UI validation and back to Dashboard', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('1. should click on first enabled Fund USD/GBP/EUR button', done => {
      expect(dashboardPage.clickOnActiveFundButton()).toBe(true);
      done();
    });

    xit('2. check if all buyers are selected by default', done => {
      dashboardPage.getTotalNumberOfAvailableBuyers().then((totalRow) => {
        dashboardPage.getTotalNumberOfSelectedBuyers().then((totalSelected) => {
          expect(totalRow).toEqual(totalSelected);
          done();
        });
      });
    });

    xit('3. check UI header text equals to "Available Buyers"', done => {
      expect(dashboardPage.getUiHeaderTextOfBuyersList()).toEqual('Available Buyers');
      done();
    });

    xit('4. check "Total Available (n)" count, where n should be equal to total number of Buyers in list', done => {
      expect(dashboardPage.getTotalNumberOfAvailableBuyers()).toEqual(dashboardPage.getCountShowedForTotalAvailableBuyers());
      done();
    });

    xit('5. check "Total Available (n)" value, where value should be equal to sum of the values of "Total Invoice Value" column', done => {
      expect(dashboardPage.getValueShowedForTotalAvailableBuyers()).toEqual(dashboardPage.getSumOfAllInvoiceValuesInBuyersList());
      done();
    });

    xit('6. check "Total Selected (n)" count, where n should be equal to total number of selected Buyers in list', done => {
      expect(dashboardPage.getTotalNumberOfSelectedBuyers()).toEqual(dashboardPage.getCountShowedForTotalSelectedBuyers());
      done();
    });

    xit('7. check "Total Selected (n)" value, where value should be equal to sum of the values of "Total Invoice Value" column of the selected Buyers', done => {
      expect(dashboardPage.getValueShowedForTotalSelectedBuyers()).toEqual(dashboardPage.getSumOfSelectedInvoiceValuesInBuyersList());
      done();
    });

    it('8. should have appropriate column names in Data Grid columns', done => {
      expect(dashboardPage.checkIfDataGridColumnsNamesOfBuyersListAsPerExpectation()).toBe(true);
      done();
    });

    it('9. should click on search icon to open "Advnced Filter" panel', done => {
      expect(dashboardPage.clickOnSearchIconToOpenAdvancedFilter()).toBe(true);
      done();
    });

    it('10. should filter the list by a valid "Buyer Name" value', done => {
      expect(dashboardPage.filterAvilableBuyerByBuyerName()).toBe(true);
      done();
    });

    it('11. should click on "Cancel" button and back to Producer Dashboard', done => {
      expect(dashboardPage.clickOnCancelButtonFromBuyersListView()).toBe(true);
      done();
    });
  });

  xdescribe('C115 - Choose Invoice - UI validation and back to Dashboard', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('1. should click on first enabled Fund USD/GBP/EUR button', done => {
      expect(dashboardPage.clickOnActiveFundButton()).toBe(true);
      done();
    });

    it('2. should click on top checkbox in buyer list', done => {
      dashboardPage.uncheckAllBuyersInList();
      expect(dashboardPage.getCountOfSelectedBuyersInList()).toBe(0);
      done();
    });

    it('3. should select top two buyers in buyer list', done => {
      dashboardPage.checkTopTwoBuyerInList();
      expect(dashboardPage.getCountOfSelectedBuyersInList()).toBeGreaterThanOrEqual(1);
      expect(dashboardPage.getCountOfSelectedBuyersInList()).toBeLessThanOrEqual(2);
      done();
    });

    it('4. should click "Next" button and load "Choose Invoices" UI', done => {
      expect(dashboardPage.clickNextButtonFromAvailabaleBuyersList()).toBe(true);
      done();
    });

    it('5. check if all invoices are selected', done => {
      expect(dashboardPage.getCountOfUnselectedInvoicesInList()).toBe(0);
      done();
    });

    it('6. check UI header text equals to "Available Invoices"', done => {
      expect(dashboardPage.getUiHeaderTextOfInvoiceList()).toEqual('Available Invoices');
      done();
    });

    it('7. check "Total Available (n)" value, where n should be equal to sum of all amounts in "Value" column', done => {
      expect(dashboardPage.getValueShowedForTotalAvailableInvoices()).toEqual(dashboardPage.getSumOfAllInvoiceValuesInInvoiceList());
      done();
    });

    it('8. check "Total Selected (n)" value, where n should be equal to sum of amounts in "Value" column only for selected invoices', done => {
      expect(dashboardPage.getValueShowedForTotalSelectedInvoices()).toEqual(dashboardPage.getSumOfSelectedInvoiceValuesInInvoiceList());
      done();
    });

    it('9. should have appropriate column names in Data Grid columns', done => {
      expect(dashboardPage.checkIfDataGridColumnsNamesOfInvoicesListAsPerExpectation()).toBe(true);
      done();
    });

    it('10. ****should click on search icon to open "Advnced Filter" panel', done => {

      done();
    });

    it('11. ****should filter the list by a valid "Buyer Name" value', done => {

      done();
    });

    it('12. should click on "Cancel" button and back to Producer Dashboard', done => {
      expect(dashboardPage.clickOnCancelButtonFromInvoicesListView()).toBe(true);
      done();
    });

  });

  xdescribe('C116 - View Offers - UI validation and back to Dashboard', () => {

    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('1. should click on "View Offers" Button', done => {
      expect(dashboardPage.clickOnActiveViewOffersButton()).toBe(true);
      done();
    });

    it('2. check UI header text equals to "Open Offers"', done => {
      expect(dashboardPage.getUiHeaderTextOfViewOffersList()).toEqual('Open Offers');
      done();
    });

    it('3. should have appropriate column names in Data Grid columns', done => {
      expect(dashboardPage.checkIfDataGridColumnsNamesOfOpenOffersListAsPerExpectation()).toBe(true);
      done();
    });

    it('4. should click on "Producer Dashboard" from left Menu', done => {
      expect(dashboardPage.clickOnProducerDashboardFromLeftMenu()).toBe(true);
      done();
    });

  });

  xdescribe('C117 - Bid deatails - UI validation and back to Dashboard', () => {

    beforeAll(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('1. should click on enabled Currency of "USD/GBP/EUR"', done => {
      expect(dashboardPage.clickOnEnabledCurrencyButton()).toBe(true);
      done();
    });

    it('2. should display "Bids" at the left', done => {
      expect(dashboardPage.checkIfBidsDisplayedOnLeft()).toBeGreaterThan(0);
      done();
    });

    it('3. check if "Bid Details" contains Invoice, Purchase and Discount values', done => {
      expect(dashboardPage.checkIfBidDetailsContainsThreeSections()).toBe(true);
      done();
    });

    it('4. should click on "Cancel" button and return to Producer Dashboard', done => {
      expect(dashboardPage.clickOnCancelButtonFromBidDetailsUI()).toBe(true);
      done();
    });

  });

});
