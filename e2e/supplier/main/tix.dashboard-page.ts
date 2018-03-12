import { ElementUtil } from './../../utils/tix.element-util';
import { browser, by, element, $, $$ } from 'protractor';
import { NumberUtil } from '../../utils/tix.number-util';
import { StringUtil } from '../../utils/tix.string-util';

const globalConfigs = require('../../tix.global-config.json');
const data = require('../resources/tix.' + globalConfigs.envName + '-config.json');

export class DashboardPage {

    private action: string = (globalConfigs.loginUserType === 'admin') ? '' : 'producer';

    constructor() {
        this.navigateTo();
    }

    navigateTo() {
        return browser.get(this.getDashboardUrl());
    }

    getDashboardUrl() {
        return data.appUrl + '/' + this.action;
    }

    /***************    C109    ***************/

    isProducerDashboardMenuExists() {
        return $('app-root app-menu aside a[href="/producer"]').isPresent().then((result) => {
            return result;
        });
    }

    isFileUploadMenuExists() {
        return $('app-root app-menu aside a[href="/producer/file-upload"]').isPresent().then((result) => {
            return result;
        });
    }

    isProfileMenuExits() {
        return $('app-root app-menu aside nav ul li:nth-child(3) md-icon').isPresent().then((result) => {
            return result;
        });
    }

    getNumberOfCurrencyBoxes() {
        return $$('app-root app-producer-dashboard app-currency-summary').count();
    }

    hasTradeixLogo() {
        return $('app-root app-menu-bar img[src*="logo-light.svg"]').isPresent().then((result) => {
            return result;
        });
    }

    hasThreeOptionsInLeftMenu() {
        return this.isProducerDashboardMenuExists() && this.isFileUploadMenuExists() && this.isProfileMenuExits();
    }

    /***************    C110    ***************/

    getFundButtonByType(type) {
        return $('app-producer-dashboard app-currency-summary md-card a[href="/producer/create-offer/choose-buyers/' + type + '"]');
    }

    checkIfFundButtonIsEnabledByType(type) {
        return this.getFundButtonByType(type).getAttribute('disabled').then((result) => {
            return result !== 'true';
        });
    }

    checkIfEnabledFundButtonExists() {
        return $('app-producer-dashboard app-currency-summary md-card a[href^="/producer/create-offer/choose-buyers/"]:not([disabled="true"])').isPresent();
    }

    clickOnActiveFundButton() {
        let clickOnElement = $$('app-producer-dashboard app-currency-summary md-card a[href^="/producer/create-offer/choose-buyers/"]:not([disabled="true"])').get(0);
        return ElementUtil.clickAndWaitForElementByFinder(clickOnElement, $('app-root app-producer-create-offer-choose-buyers'));
    }

    getListOfAvailableItemsInList() {
        return $$('*[for^="input-md-checkbox-"]');
    }

    uncheckAllBuyersInList() {
        return browser.actions().mouseMove(this.getListOfAvailableItemsInList().first()).click().perform();
    }

    checkFirstBuyerInList() {
        return browser.actions().mouseMove(this.getListOfAvailableItemsInList().get(1)).click().perform();
    }

    clickNextButtonFromAvailabaleBuyersList() {
        let clickOn = 'app-root md-sidenav-container app-producer-create-offer-choose-buyers app-breadcrumb button.mat-raised-button';
        let waitFor = 'app-root md-sidenav-container app-choose-invoices';
        return ElementUtil.clickAndWaitForElement(clickOn, waitFor);
    }

    clickNextButtonFromAvailabaleInvoicesList() {
        let clickOn = 'app-root md-sidenav-container app-choose-invoices app-breadcrumb button.mat-raised-button';
        let waitFor = '[id^="cdk-overlay-"] invoice-funders-dialog';
        return ElementUtil.clickAndWaitForElement(clickOn, waitFor);
    }

    clickReturnToDashboardButtonFromPopup() {
        let clickOn = '[id^="cdk-overlay-"] md-dialog-container invoice-funders-dialog md-dialog-actions button.mat-button';
        let waitFor = 'app-root app-producer-dashboard';
        return ElementUtil.clickAndWaitForElement(clickOn, waitFor);
    }

    keepBrowserWaiting() {
        return browser.sleep(1500);
    }

    chooseFirstAvailabaleBuyerAndClickNext() {
        try {
            return this.uncheckAllBuyersInList().then(() => {
                return this.keepBrowserWaiting().then(() => {
                    return this.checkFirstBuyerInList().then(() => {
                        return this.keepBrowserWaiting().then(() => {
                            return this.clickNextButtonFromAvailabaleBuyersList();
                        });
                    });
                });
            });
        } catch (ex) {
            console.log(ex.status);
            return false;
        }
    }

    chooseFirstAvailableInvoiceAndClickNext() {
        try {
            return this.uncheckAllBuyersInList().then(() => {
                return this.keepBrowserWaiting().then(() => {
                    return this.checkFirstBuyerInList().then(() => {
                        return this.keepBrowserWaiting().then(() => {
                            return this.clickNextButtonFromAvailabaleInvoicesList();
                        });
                    });
                });
            });
        } catch (ex) {
            console.log(ex.status);
            return false;
        }
    }

    /***************************    C111    ****************************/

    clickReviewPricingOrBidsButtonFromPopup() {
        let elm = $('*[id^="cdk-overlay-"] md-dialog-container invoice-funders-dialog md-dialog-actions button.mat-raised-button.mat-primary');
        return browser.actions().mouseMove(elm).click().perform().then(() => {
            return true;
        });
    }

    clickAcceptButtonFromBidDetails() {
        let elm = $('app-root md-sidenav-container app-bid-summary section md-card button.mat-raised-button.mat-accent');
        return ElementUtil.clickAndWaitForElementByFinder(elm, $('*[id^="cdk-overlay-"] app-accept-dialog'));
    }

    clickOkButtonFromBidAcceptedPopup() {
        let elm = $('*[id^="cdk-overlay-"] app-accept-dialog md-dialog-actions button.mat-button.mat-primary');
        return ElementUtil.clickAndWaitForElementByFinder(elm, $('app-root app-producer-dashboard'));
    }


    /***************************    C112    ****************************/

    getViewOffersButtonByType(type) {
        return $('app-root md-sidenav-container app-producer-dashboard app-currency-summary md-card a[href="/producer/offer-list/' + type + '"]');
    }

    checkIfViewOffersButtonIsEnabledByType(type) {
        return this.getViewOffersButtonByType(type).getAttribute('disabled').then((result) => {
            return result !== 'true';
        });
    }

    checkIfEnabledViewOffersButtonExists() {
        return $('app-producer-dashboard app-currency-summary md-card a[href^="/producer/offer-list/"]:not([disabled="true"])').isPresent();
    }

    getActiveViewOfferButton() {
        return $('app-producer-dashboard app-currency-summary md-card a[href^="/producer/offer-list/"]:not([disabled="true"])');
    }

    clickOnActiveViewOffersButton() {
        return ElementUtil.clickAndWaitForElementByFinder(this.getActiveViewOfferButton(), $('app-root tix-offer-list'));
    }

    clickFirstViewBidsOrPricingSummaryButton() {
        let elm = $$('app-root md-sidenav-container tix-offer-list data-grid table tbody a[href^="/producer/create-offer/bid-summary/"]').get(0);
        return ElementUtil.clickAndWaitForElementByFinder(elm, $('app-root app-bid-summary'));
    }

    clickCancelButtonOfViewBidsOrPricingSummary() {
        let elm = $('app-root md-sidenav-container app-bid-summary app-breadcrumb button.mat-raised-button.mat-primary');
        return ElementUtil.clickAndWaitForElementByFinder(elm, $('app-root app-producer-dashboard'));
    }

    /***************************    C114    ****************************/

    getUiHeaderTextOfBuyersList() {
        return $('app-root md-sidenav-container app-producer-create-offer-choose-buyers .padding-container .padding-top h1').getText().then((innerText) => {
            return innerText;
        });
    }

    getTotalNumberOfAvailableBuyers() {
        return $$('app-root md-sidenav-container app-producer-create-offer-choose-buyers data-grid table tbody tr').count();
    }

    getTotalNumberOfSelectedBuyers() {
        return $$('app-root md-sidenav-container app-producer-create-offer-choose-buyers data-grid table tbody tr md-checkbox.mat-checkbox-checked').count();
    }

    getCountShowedForTotalAvailableBuyers() {
        return $('app-root md-sidenav-container app-producer-create-offer-choose-buyers app-subtotal md-card .available summary').getText().then((innerText) => {
            return NumberUtil.stringToNumber(innerText);
        });
    }

    getCountShowedForTotalSelectedBuyers() {
        return $('app-root md-sidenav-container app-producer-create-offer-choose-buyers app-subtotal md-card .selected summary').getText().then((innerText) => {
            return NumberUtil.stringToNumber(innerText);
        });
    }

    getValueShowedForTotalAvailableBuyers() {
        return $('app-root md-sidenav-container app-producer-create-offer-choose-buyers app-subtotal md-card .available span').getText().then((innerText) => {
            return NumberUtil.stringToNumber(innerText);
        });
    }

    getValueShowedForTotalSelectedBuyers() {
        return $('app-root md-sidenav-container app-producer-create-offer-choose-buyers app-subtotal md-card .selected span').getText().then((innerText) => {
            return NumberUtil.stringToNumber(innerText);
        });
    }

    getSumOfAllInvoiceValuesInBuyersList() {
        return NumberUtil.getSumFromArrayOfElements($$('app-root md-sidenav-container app-producer-create-offer-choose-buyers data-grid table tbody [ng-reflect-ng-switch="currency"]'));
    }

    getSumOfSelectedInvoiceValuesInBuyersList() {
        return NumberUtil.getSumFromArrayOfElements($$('app-root md-sidenav-container app-producer-create-offer-choose-buyers data-grid table tbody tr.selected [ng-reflect-ng-switch="currency"]'));
    }

    checkIfDataGridColumnsNamesOfBuyersListAsPerExpectation() {
        let columns = [
            'Buyer Name',
            'Entity Id',
            'Num. Invoices',
            'Total Invoice Value'
        ];
        return $$('app-root md-sidenav-container app-producer-create-offer-choose-buyers data-grid table thead th > div:nth-child(1)').map((elm) => {
            return elm.getText();
        }).then((texts) => {
            return StringUtil.checkIfTwoArraysContainSimilarElements(columns, texts as Array<string>);
        });
    }

    clickOnSearchIconToOpenAdvancedFilter() {
        let searchIconSelector = 'app-root data-grid .search-icon';
        let filterSelector = 'app-root .mat-sidenav.mat-sidenav-end.mat-sidenav-opened tix-data-grid-filter'
        return ElementUtil.clickAndWaitForElement(searchIconSelector, filterSelector);
    }

    filterAvilableBuyerByBuyerName() {
        let columnSelector = 'app-root md-sidenav-container data-grid table > tbody td:nth-child(2)';
        let filterInputFieldSelector = '#mainForm .form-group md-input-container input[ng-reflect-placeholder="Buyer Name"]';
        return ElementUtil.filterTableByTextInColumn(columnSelector, filterInputFieldSelector);
    }

    clickOnCancelButtonFromBuyersListView() {
        let elm = $('app-root md-sidenav-container app-producer-create-offer-choose-buyers app-breadcrumb button.mat-button');
        return ElementUtil.clickAndWaitForElementByFinder(elm, $('app-root app-producer-dashboard'));
    }


    /***************************    C115    ****************************/

    getCountOfSelectedBuyersInList() {
        return $$('app-root md-sidenav-container app-producer-create-offer-choose-buyers table tbody md-checkbox[ng-reflect-checked="true"]').count();
    }

    checkTopTwoBuyerInList() {
        return browser.actions().mouseMove(this.getListOfAvailableItemsInList().get(1)).click().perform().then(() => {
            let elm = this.getListOfAvailableItemsInList().get(2);
            if (elm) {
                return browser.actions().mouseMove(elm).click().perform();
            } else {
                Promise.resolve();
            }
        });
    }

    getCountOfUnselectedInvoicesInList() {
        return $$('app-root md-sidenav-container app-choose-invoices table tbody md-checkbox[ng-reflect-checked="false"]').count();
    }

    getUiHeaderTextOfInvoiceList() {
        return $('app-root md-sidenav-container app-choose-invoices .padding-container .padding-top h1').getText().then((innerText) => {
            return innerText;
        });
    }

    getValueShowedForTotalAvailableInvoices() {
        return $('app-root md-sidenav-container app-choose-invoices app-subtotal md-card .available span').getText().then((innerText) => {
            return NumberUtil.stringToNumber(innerText);
        });
    }

    getSumOfAllInvoiceValuesInInvoiceList() {
        return NumberUtil.getSumFromArrayOfElements($$('app-root md-sidenav-container app-choose-invoices data-grid table tbody [ng-reflect-ng-switch="currency"]'));
    }

    getValueShowedForTotalSelectedInvoices() {
        return $('app-root md-sidenav-container app-choose-invoices app-subtotal md-card .selected span').getText().then((innerText) => {
            return NumberUtil.stringToNumber(innerText);
        });
    }

    getSumOfSelectedInvoiceValuesInInvoiceList() {
        return NumberUtil.getSumFromArrayOfElements($$('app-root md-sidenav-container app-choose-invoices data-grid table tbody tr.selected [ng-reflect-ng-switch="currency"]'));
    }

    checkIfDataGridColumnsNamesOfInvoicesListAsPerExpectation() {
        let columns = [
            'Buyer',
            'Invoice Number',
            'Type',
            'Maturity Date',
            'Tenor',
            'Value'
        ];
        return $$('app-root md-sidenav-container app-choose-invoices data-grid table thead th > div:nth-child(1)').map((elm) => {
            return elm.getText();
        }).then((texts) => {
            return StringUtil.checkIfTwoArraysContainSimilarElements(columns, texts as Array<string>);
        });
    }

    clickOnCancelButtonFromInvoicesListView() {
        let cancelButton = $$('app-root md-sidenav-container app-choose-invoices app-breadcrumb button.mat-button').filter((elm) => {
            return elm.getText().then(text => {
                return text == 'Cancel';
            });
        }).get(0);
        return browser.actions().mouseMove(cancelButton).click().perform().then(() => {
            return true;
        });
    }


    /***************************    C116    ****************************/

    getUiHeaderTextOfViewOffersList() {
        return $('app-root md-sidenav-container tix-offer-list .padding-container .padding-top h1').getText().then((innerText) => {
            return innerText;
        });
    }

    checkIfDataGridColumnsNamesOfOpenOffersListAsPerExpectation() {
        let columns = [
            'Offer Number',
            'Created Date',
            'Value',
            'Bids Returned',
            'Funders',
            'Pricing Summary'
        ];
        return $$('app-root md-sidenav-container tix-offer-list data-grid table thead th > div:nth-child(1)').map((elm) => {
            return elm.getText();
        }).then((texts) => {
            return StringUtil.checkIfTwoArraysContainSimilarElements(columns, texts as Array<string>);
        });
    }

    clickOnProducerDashboardFromLeftMenu() {
        let elm = $('app-root app-menu nav a[href="/producer"]');
        return browser.actions().mouseMove(elm).click().perform().then(() => {
            return true;
        });
    }


    /***************************    C117    ****************************/


    clickOnEnabledCurrencyButton() {
        return this.getActiveViewOfferButton().getAttribute("href").then((href) => {
            let currencyName = href.split("/").pop();
            return $('app-root app-producer-dashboard app-currency-summary[ng-reflect-currency-code="' + currencyName + '"] md-card header [ng-reflect-class-base="currency-code-wrapper"]').click().then(() => {
                return $('app-bid-summary').isPresent().then((result) => {
                    return result;
                });
            });
        });
    }

    checkIfBidsDisplayedOnLeft() {
        return $$('app-root md-sidenav-container app-bid-summary aside li').count().then((count) => {
            return count;
        });
    }

    checkIfBidDetailsContainsThreeSections() {
        let sectionNamesAsLowerCase = [
            "total invoice value",
            "total purchase value",
            "discount and fees"
        ];
        return $$('app-root md-sidenav-container app-bid-summary section .statistics span.muted-text').map((elm) => {
            return elm.getText().then((text) => {
                return text.toLowerCase();
            });
        }).then((sectionTitles) => {
            return StringUtil.checkIfTwoArraysContainSimilarElements(sectionTitles as Array<string>, sectionNamesAsLowerCase);
        });
    }

    clickOnCancelButtonFromBidDetailsUI() {
        return $('app-root md-sidenav-container app-bid-summary nav button.mat-raised-button.mat-primary').click().then(() => {
            return $('app-producer-dashboard').isPresent().then((result) => {
                return result;
            });
        });
    }

}