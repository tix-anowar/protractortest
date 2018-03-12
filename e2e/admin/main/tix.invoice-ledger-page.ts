import { browser, by, element, $, $$, ExpectedConditions, protractor } from 'protractor';
import { StringUtil } from '../../utils/tix.string-util';
import { ElementUtil } from '../../utils/tix.element-util';

export class InvoiceLedgerPage {

    

    /***************    C123 - C128    ***************/

    /***************     Common     **************/


    getTableColumnNames() {
        return $$('app-invoice-ledger data-grid .scroll-container table thead tr th div:nth-child(1)').map((columnNames) => {
            return columnNames.getText();
        }).then((texts) => {
            return texts;
        });
    }

    /***************** invoice tab *****************/
    
    clickInvoiceLedgerIconAndCheckForPageLoad() {
        var loadElement = 'app-invoice-ledger data-grid .ledger';
        var invoiceLedgerIcon = 'md-sidenav-container navigation-menu a[href="/ledgers/invoices-ledger"]';
        var tableColumnnames = $$('app-invoice-ledger data-grid .ledger thead tr th div:nth-child(1)');
        var findColumnName = 'Buyer Name';

        return ElementUtil.clickAndWaitForElement(invoiceLedgerIcon, loadElement).then(() => {
            return StringUtil.checkIfElementExistsInList(tableColumnnames, findColumnName);
        });
    }

    getInvoiceLedgerPageTabNames() {
        return $$('app-invoice-ledger md-tab-group md-tab-header .mat-tab-labels .mat-tab-label.mat-ripple').map((tabNames) => {
            return tabNames.getText();
        }).then((texts) => {
            return texts;
        });
    }

    getInvoiceLedgerPageHeaderText() {
        return $('app-invoice-ledger h1').getText()
        .then((text) => {
            return text;
        });
    }

    getDefaultTabName() {
        return $('app-invoice-ledger md-tab-group md-tab-header .mat-tab-labels .mat-tab-label.mat-ripple.mat-tab-label-active')
        .getText().then((text) => {
            return text;
        });
    }

    checkInvoiceLedgerPageTabNames() {
        let tab_names = [
            'Invoice', 
            'Audit', 
            'Version', 
            'Trade', 
            'Insurance'
            ];

        return this.getInvoiceLedgerPageTabNames().then((tabNames) => {
            let tab_name_list = [];
            tab_name_list = tabNames;
            return StringUtil.checkIfTwoArraysContainSimilarElements(tab_names, tab_name_list);
        });
    }

    checkInvoicePageTableColumnNames() {
        let table_column_names = [
            'Invoice Number',
            'Invoice Type',
            'Invoice Date',
            'Supplier Name',
            'Buyer Name',
            'Owner Name',
            'CCY',
            'Reference',
            'Payment Due Date',
            'Cancelled',
            'Close Date',
            'Site ID',
            'Invoice Payments',
            'Invoice Dilutions',
            'Total Outstanding',
            'Invoice Value'
            ];

        return this.getTableColumnNames().then((colNames) => {
            let table_col_name_list = [];
            table_col_name_list = colNames;
            return StringUtil.checkIfTwoArraysContainSimilarElements(table_column_names, table_col_name_list);
        });
    }


    /**************** Audit tab ******************/

    clickAuditTabAndcheckForPageLoad() {
        var loadElement = $('app-invoice-ledger data-grid .ledger');
        var auditTabButton = $$('.mat-tab-labels div[id^="md-tab-label-"]').get(1);
        var tableColumnnames = $$('app-invoice-ledger data-grid .ledger thead tr th div:nth-child(1)');
        var findColumnName = 'Blockchain';

        return ElementUtil.clickAndWaitForElementByFinder(auditTabButton, loadElement).then(() => {
            return StringUtil.checkIfElementExistsInList(tableColumnnames, findColumnName);
        });
    }

    checkAuditPageTableColumnNames() {
        let table_column_names = [
            'Invoice Number',
            'Document Created',
            'Document Submitted',
            'Document Confirmed',
            'Document Key',
            'User ID',
            'Block ID',
            'Blockchain',
            'Supersede ID',
            'originationNetwork',
            'Hash'
        ]

        return this.getTableColumnNames().then((colNames) => {
            let table_col_name_list = [];
            table_col_name_list = colNames;
            return StringUtil.checkIfTwoArraysContainSimilarElements(table_column_names, table_col_name_list);
        });
    }

    /***************   Version tab   *****************/

    clickVersionTabAndcheckForPageLoad() {
        var loadElement = $('app-invoice-ledger data-grid .ledger');
        var versionTabButton = $$('.mat-tab-labels div[id^="md-tab-label-"]').get(2);
        var tableColumnnames = $$('app-invoice-ledger data-grid .ledger thead tr th div:nth-child(1)');
        var findColumnName = 'Invoice Version';

        return ElementUtil.clickAndWaitForElementByFinder(versionTabButton, loadElement).then(() => {
            return StringUtil.checkIfElementExistsInList(tableColumnnames, findColumnName);
        });
    }

    checkVersionPageTableColumnNames() {
        let table_column_names = [
            'Invoice Number',
            'Network Invoice UID',
            'Invoice Version',
            'Invoice Version Date'
        ]

        return this.getTableColumnNames().then((colNames) => {
            let table_column_name_list = [];
            table_column_name_list = colNames;
            return StringUtil.checkIfTwoArraysContainSimilarElements(table_column_names, table_column_name_list);
        });
    }

    /****************  Trade Tab  *****************/

    clickTradeTabAndcheckForPageLoad() {
        var loadElement = $('app-invoice-ledger data-grid .ledger');
        var tradeTabButton = $$('.mat-tab-labels div[id^="md-tab-label-"]').get(3);
        var tableColumnnames = $$('app-invoice-ledger data-grid .ledger thead tr th div:nth-child(1)');
        var findColumnName = 'Trade Date';

        return ElementUtil.clickAndWaitForElementByFinder(tradeTabButton, loadElement).then(() => {
            return StringUtil.checkIfElementExistsInList(tableColumnnames, findColumnName);
        });
    }

    checkTradePageTableColumnNames() {
        let table_column_names = [
            'Invoice Number',
            'Retention',
            'Mandatory Reconciliation Date',
            'Settlement Date',
            'Trade Date',
            'Trade Payment Date',
            'Tenor Due Days Remaining',
            'Margin',
            'Transaction Fee',
            'Base Rate',
            'Total Discount Costs',
            'Invoice Purchase Value',
            'Eligible Value'
        ]

        return this.getTableColumnNames().then((colNames) => {
            let table_col_name_list = [];
            table_col_name_list = colNames;
            return StringUtil.checkIfTwoArraysContainSimilarElements(table_column_names, table_col_name_list);
        });
    }

    /*************** Insurance Tab *****************/

    private insuranceCountBeforeReset;

    clickInsuranceTabAndcheckForPageLoad() {
        var loadElement = $('app-invoice-ledger data-grid .ledger');
        var insuranceTabButton = $$('.mat-tab-labels div[id^="md-tab-label-"]').get(4);
        var tableColumnnames = $$('app-invoice-ledger data-grid .ledger thead tr th div:nth-child(1)');
        var findColumnName = 'Insurance Amount';

        return ElementUtil.clickAndWaitForElementByFinder(insuranceTabButton, loadElement).then(() => {
            return browser.sleep(2000).then(() => {
                this.insuranceCountBeforeReset = $$('app-invoice-ledger data-grid .scroll-container tbody strong').then((insurances) => {
                    return insurances.length;
                });

                return StringUtil.checkIfElementExistsInList(tableColumnnames, findColumnName);
            });
        });
    }

    checkInsurancePageTableColumnNames() {
        let table_column_names = [
            'Invoice Number',
            'Endorsement ID',
            'Endorsement Date',
            'Insurance Amount',
            'Insurance Currency',
            'Insurance Expiry Date',
            'Slip ID',
            'Insurance Reference',
            'Policy Number'
        ]

        return this.getTableColumnNames().then((colNames) => {
            let table_col_name_list = [];
            table_col_name_list = colNames;
            return StringUtil.checkIfTwoArraysContainSimilarElements(table_column_names, table_col_name_list);
        });
    }

    /*****************  Advance Filter Functionality validation  ****************/
    
    clickSearchIcon() {
        return $('app-invoice-ledger data-grid .search-icon.padding-top md-icon').click().then(() => {
            return browser.sleep(2000).then(() => {
                return $('.mat-sidenav.mat-sidenav-end.mat-sidenav-over.mat-sidenav-opened').isPresent().then((result) => {
                    return result;
                });
            });
        });
    }

    typeInoviceNumberAndClickSearchNow() {
        return $$('app-invoice-ledger data-grid .scroll-container tbody strong').then((invoiceNumbers) => {
            let invoiceNumber = invoiceNumbers[0].getText();
            return $("#mainForm input[placeholder='Invoice Number']").sendKeys(invoiceNumber).then(() => {
                var loadElement = 'app-invoice-ledger data-grid .scroll-container';
                var searchNowButton = '#mainForm .mat-raised-button.mat-primary';
                return ElementUtil.clickAndWaitForElement(searchNowButton, loadElement).then(() => {
                    return browser.sleep(1000);
                });
            });
        });
    }

    checkIfAdvanceFilterWorks() {
        return this.clickSearchIcon().then(() => {
            return this.typeInoviceNumberAndClickSearchNow().then(() => {
                return $('app-invoice-ledger data-grid .scroll-container table').isPresent().then((result) => {
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
            var loadElement = 'app-invoice-ledger data-grid .scroll-container .ledger';
            return ElementUtil.clickAndWaitForElement(resetButton, loadElement).then(() => {
                return browser.sleep(5000).then(() => {
                    return $$('app-invoice-ledger data-grid .scroll-container .ledger tbody tr').then((insurances) => {
                        return this.insuranceCountBeforeReset.then((insuranceListLen) => {
                            if(insuranceListLen == insurances.length){
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