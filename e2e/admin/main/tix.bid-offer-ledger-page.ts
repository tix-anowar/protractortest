import { browser, by, element, $, $$ } from 'protractor';
import { StringUtil } from '../../utils/tix.string-util';
import { ElementUtil } from '../../utils/tix.element-util';
import { DashboardPage } from './tix.dashboard-page';

export class BidOfferLedgerPage {

    private dashboardPage: DashboardPage;

    /***************    C129 - C130    ***************/

    /***************  UI validation  ****************/

    constructor () {
        this.dashboardPage = new DashboardPage();
    }

    private bidOfferCountBeforeReset;

    clickBidOfferIconAndcheckForPageLoad() {
        var loadElement = 'app-bid-offer data-grid .ledger';
        var bidOfferLedgerIcon = 'md-sidenav-container navigation-menu navigation-menu-item a[href="/ledgers/bid-offers-ledger"]';
        var tableColumnnames = $$('app-bid-offer data-grid .ledger thead tr th div:nth-child(1)');
        var findColumnName = 'Asset Number';

        return this.dashboardPage.clickMenuIcon().then(() => {
            return ElementUtil.clickAndWaitForElement(bidOfferLedgerIcon, loadElement).then(() => {
                return browser.sleep(2000).then(() => {
                    this.bidOfferCountBeforeReset = $$('app-bid-offer data-grid .ledger tbody tr').then((bidOffer) => {
                        return bidOffer.length;
                    });

                    return StringUtil.checkIfElementExistsInList(tableColumnnames, findColumnName);
                });
            });
        });
    }

    getBidOfferLedgerPageHeaderText() {
        return $('app-bid-offer h1').getText().then((text) => {
            return text;
        });
    }

    getTableColumnNames() {
        return $$('app-bid-offer .padding-container data-grid .scroll-container table th div:nth-child(1)').map((colNames) => {
            return colNames.getText();
        }).then((texts) => {
            return texts;
        });
    }

    checkBidOfferPageTableColumnNames() {
        let table_column_names = [
            'ID',
            'Date',
            'Type',
            'Asset Number',
            'Owner',
            'Currency',
            'Value',
            'BlkId'
            ];

        return this.getTableColumnNames().then((colNames) => {
            let table_col_name_list = [];
            table_col_name_list = colNames;
            return StringUtil.checkIfTwoArraysContainSimilarElements(table_column_names, table_col_name_list);
        });
    }

    /*****************  Advance Filter Functionality validation  ****************/

    clickSearchIcon() {
        return $('app-bid-offer data-grid .search-icon.padding-top md-icon').click().then(() => {
            return browser.sleep(2000).then(() => {
                return $('.mat-sidenav.mat-sidenav-end.mat-sidenav-over.mat-sidenav-opened').isPresent().then((result) => {
                    return result;
                });
            });
        });
    }

    typeIDAndClickSearchNow() {
        return $$('app-bid-offer data-grid .scroll-container tbody tr td:nth-child(1)').then((ids) => {
            let id = ids[0].getText();
            return $("#mainForm input[placeholder='ID']").sendKeys(id).then(() => {
                var loadElement = 'app-bid-offer data-grid .scroll-container';
                var searchNowButton = '#mainForm .mat-raised-button.mat-primary';
                return ElementUtil.clickAndWaitForElement(searchNowButton, loadElement).then(() => {
                    return browser.sleep(1000);
                });
            });
        });
    }

    checkIfAdvanceFilterWorks() {
        return this.clickSearchIcon().then(() => {
            return this.typeIDAndClickSearchNow().then(() => {
                return $('app-bid-offer data-grid .scroll-container table').isPresent().then((result) => {
                    if(result == true){
                        console.log('Search element is found');
                        return result;
                    }else{
                        console.log('Search element is not found');
                        return result;
                    }
                });
            });
        });
    }

    resetPage() {
        return this.clickSearchIcon().then(() => {
            var resetButton = '#mainForm button:nth-child(2)';
            var loadElement = 'app-bid-offer data-grid .scroll-container .ledger';
            return ElementUtil.clickAndWaitForElement(resetButton, loadElement).then(() => {
                return browser.sleep(5000).then(() => {
                    return $$('app-bid-offer data-grid .scroll-container .ledger tbody tr').then((bidOffers) => {
                        return this.bidOfferCountBeforeReset.then((bidOfferListLen) => {
                            if(bidOfferListLen == bidOffers.length){
                                return true;
                            }else{
                                return false;
                            }
                        });
                    });
                });
            });
        });
    }

}