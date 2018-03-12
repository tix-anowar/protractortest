import { browser, by, element, $, $$ } from 'protractor';
import { StringUtil } from '../../utils/tix.string-util';
import { ElementUtil } from '../../utils/tix.element-util';
import { DashboardPage } from './tix.dashboard-page';

var data = require('../resources/tix.uat-config.json');

export class CompanyManagerPage {

    private dashboardPage: DashboardPage;

    /***************    C129 - C130    ***************/

    /***************  UI validation  ****************/
    constructor() {
        this.dashboardPage = new DashboardPage();
    }

    private companyCountBeforeReset;

    clickCompanyManagerIconAndcheckForPageLoad() {
        var loadElement = 'app-company-list data-grid .scroll-container table';
        var companyManagerLedgerIcon = 'md-sidenav-container navigation-menu navigation-menu-item a[href="/company-manager"]';
        var tableColumnnames = $$('app-company-list data-grid .scroll-container table thead tr th div:nth-child(1)');
        var findColumnName = 'Duns Number';

        return this.dashboardPage.clickMenuIcon().then(() => {
            return ElementUtil.clickAndWaitForElement(companyManagerLedgerIcon, loadElement).then(() => {
                return browser.sleep(2000).then(() => {
                    this.companyCountBeforeReset = $$('app-company-list data-grid .scroll-container table tbody tr').then((bidOffer) => {
                        return bidOffer.length;
                    });

                    return StringUtil.checkIfElementExistsInList(tableColumnnames, findColumnName);
                });
            });
        });
    }

    getCompanyManagerPageHeaderText() {
        return $('app-company-list h1').getText().then((text) => {
            return text;
        });
    }

    getTableColumnNames() {
        return $$('app-company-list .padding-container data-grid .scroll-container table th div:nth-child(1)').map((colNames) => {
            return colNames.getText();
        }).then((texts) => {
            return texts;
        });
    }

    checkCompanyManagerPageTableColumnNames() {
        let tableColumnNames = [
            'UniqueId',
            'Name',
            'Duns Number',
            'Reference',
            'Status',
            'Type(s)',
            ''
        ];

        return this.getTableColumnNames().then((colNames) => {
            let tableColNameList = [];
            tableColNameList = colNames;
            return StringUtil.checkIfTwoArraysContainSimilarElements(tableColumnNames, tableColNameList);
        });
    }

    checkIfAddButtonExists() {
        return $('app-company-list .padding-container .mat-raised-button.mat-primary').isPresent().then((result) => {
            return result;
        });
    }

    /*****************  Add functionality validation  ****************/

    clickAddButtonToCreateCompany() {
        var loadElement = 'app-company-detail form .mat-tab-label-container .mat-tab-list .mat-tab-labels div[id^="md-tab-label-"]';
        var addButton = 'app-company-list .padding-container .mat-raised-button.mat-primary';

        return ElementUtil.clickAndWaitForElement(addButton, loadElement).then(() => {
            return browser.sleep(2000).then(() => {
                return $('app-company-detail h1').getText().then((headerText) => {
                    if(headerText == 'Create Company'){
                        return true;
                    }else{
                        return false;
                    }
                });
            });
        });
    }

    checkCreateCompanyPageTabNames() {
        let tabNames = [
            'Details',
            'Relationships',
            'Bank Accounts',
            'Addresses',
            'Contacts',
            'API Access'
        ]

        var names = $$('app-company-detail form .mat-tab-group .mat-tab-header div[id^="md-tab-label-"]').map((columnNames) => {
            return columnNames.getText();
        }).then((texts) => {
            return texts;
        });

        return names.then((txts) => {
            let tabNameList = [];
            tabNameList = txts;
            return StringUtil.checkIfTwoArraysContainSimilarElements(tabNameList, tabNames);
        });
    }

    checkTabPageLoad(tabButton, pageText) {
        var elementToLoad = $('app-company-detail form .mat-tab-body-wrapper .mat-tab-body-active .mat-tab-body-content h3');

        return ElementUtil.clickAndWaitForElementByFinder(tabButton, elementToLoad).then(() => {
            return elementToLoad.getText().then((text) => {
                if(text == pageText){
                    return true;
                }else{
                    return false;
                }
            });
        });
    }

    clickRelationshipsTabAndcheckForPageLoad() {
        var TabButton = $$('app-company-detail form .mat-tab-group .mat-tab-header div[id^="md-tab-label-"]').get(1);
        var text = "Please create company details before accessing Company Relationships";

        return this.checkTabPageLoad(TabButton, text);
    }

    clickBankAccountsTabAndcheckForPageLoad() {
        var TabButton = $$('app-company-detail form .mat-tab-group .mat-tab-header div[id^="md-tab-label-"]').get(2);
        var text = "Please create company details before accessing Bank Accounts";

        return this.checkTabPageLoad(TabButton, text);
    }

    clickAddressesTabAndcheckForPageLoad() {
        var TabButton = $$('app-company-detail form .mat-tab-group .mat-tab-header div[id^="md-tab-label-"]').get(3);
        var text = "Please create company details before accessing Addresses";

        return this.checkTabPageLoad(TabButton, text);
    }

    clickContactsTabAndcheckForPageLoad() {
        var TabButton = $$('app-company-detail form .mat-tab-group .mat-tab-header div[id^="md-tab-label-"]').get(4);
        var text = "Please create company details before accessing Contacts";

        return this.checkTabPageLoad(TabButton, text);
    }

    clickAPIAccessTabAndcheckForPageLoad() {
        var TabButton = $$('app-company-detail form .mat-tab-group .mat-tab-header div[id^="md-tab-label-"]').get(5);
        var text = "Please create company details before accessing this tab";

        return this.checkTabPageLoad(TabButton, text);
    }

    clickDetailsTabAndcheckForPageLoad() {
        var TabButton = $$('app-company-detail form .mat-tab-group .mat-tab-header div[id^="md-tab-label-"]').get(0);
        var loadElement = $("app-company-detail form .mat-tab-body-wrapper");

        return ElementUtil.clickAndWaitForElementByFinder(TabButton, loadElement);
    }

    clickSaveCompanyButton(companyValue) {
        var companyName = companyValue['name'];

        return $('app-company-detail form .mat-tab-body-wrapper button').click().then(() => {
            return browser.sleep(4000).then(() => {
                return $('app-company-detail > div:nth-child(1) h1').getText().then((text) => {
                    if (text == companyName) {
                        return true;
                    } else {
                        return false;
                    }
                });
            });
        });
    }

    clickBackButtonOfCreateCompanyPage() {
        var loadElement = 'app-company-list data-grid .scroll-container table';
        var backButton = 'app-company-detail .padding-container > button';
        return ElementUtil.clickAndWaitForElement(backButton, loadElement).then((result) => {
            return browser.sleep(1500).then(() => {
                return result;
            });
        });
    }

    setCompanyFieldValue(compData) {
        $$('app-company-detail form input[id^="md-input-"]:not([type="date"])').each((inputFields) => {
            inputFields.getAttribute('ng-reflect-name').then((fieldName) => {
                if (compData[fieldName] != "") {
                    let locator = 'app-company-detail form .mat-input-container input[ng-reflect-name="' + fieldName + '"]';
                    let field = $(locator);
                    field.sendKeys(compData[fieldName]).then(() => {
                        browser.sleep(50);
                    });
                }
            });
        });
    }

    clickCompanyCheckBoxes(compCheckboxData) {
        let checkboxDoms = $$('[for^="input-md-checkbox-"]');
        checkboxDoms.each((checkBox) => {
            checkBox.getText().then(text => {
                let value = compCheckboxData[text];
                if (value) {
                    checkBox.click().then(() => {
                        browser.sleep(100);
                    });
                }
            });
        });
    }

    createCompany() {
        let allCompanyFieldData = data.company.create.fieldData;
        let allCompanyCheckboxData = data.company.create.checkBoxData;

        this.setCompanyFieldValue(allCompanyFieldData[0]);
        this.clickCompanyCheckBoxes(allCompanyCheckboxData[0]);

        return this.clickSaveCompanyButton(allCompanyFieldData[0]).then(() => {
            return true;
        });
    }

    checkIfCreatedCompanyAddedInCompanyList() {
        let createdCompanyUniqueId = data.company.create.fieldData[0];
        let allUniqueId = $$('app-company-list data-grid table tbody tr td:nth-child(1)');

        return this.clickBackButtonOfCreateCompanyPage().then(() => {
            return StringUtil.checkIfElementExistsInList(allUniqueId, createdCompanyUniqueId["uniqueId"]);
        });
    }

    /*****************  Edit Functionality validation  ****************/

    clickFirstCompanyEditButton() {
        var loadElement = $('app-company-detail form');
        var editIcon = $$('app-company-list .padding-container data-grid .scroll-container table tbody .align-right button').get(0);

        return ElementUtil.clickAndWaitForElementByFinder(editIcon, loadElement).then((res) => {
            return browser.sleep(5000).then(() => {
                return true;
            });
        });
    }

    updateCompanyFieldValue(updateFieldData) {
        $$('app-company-detail form input[id^="md-input-"]:not([type="date"])').each((inputFields) => {
            inputFields.getAttribute('ng-reflect-name').then((fieldName) => {
                if (updateFieldData[fieldName] != "") {
                    var locator = 'app-company-detail form .mat-input-container input[ng-reflect-name="' + fieldName + '"]';
                    var field = $(locator);
                    field.clear().then(() => {
                        browser.sleep(100).then(() => {
                            field.sendKeys(updateFieldData[fieldName]);
                        });
                    });
                }
            });
        });
    }

    updateCompanyCheckbox(updateCheckboxData) {
        let checkboxDoms = $$('.mat-checkbox.mat-checkbox-checked [for^="input-md-checkbox-"]');

        checkboxDoms.each((checkBox) => {
            checkBox.click().then(() => {
                browser.sleep(100);
            });
        }).then(() => {
            this.clickCompanyCheckBoxes(updateCheckboxData);
        });
    }

    updateFirstCompany() {
        let companyFieldUpdateData = data.company.update.fieldData;
        let companyCheckboxUpdateData = data.company.update.checkBoxData;

        return this.clickFirstCompanyEditButton().then(() => {
            this.updateCompanyFieldValue(companyFieldUpdateData);
            this.updateCompanyCheckbox(companyCheckboxUpdateData);

            return this.clickSaveCompanyButton(companyFieldUpdateData);
        });
    }

    checkIfCompanyUpdatedInCompanyList() {
        let updatedCompanyName = data.company.update.fieldData.name;
        let allNames = $$('app-company-list data-grid table tbody tr td:nth-child(2)');

        return this.clickBackButtonOfCreateCompanyPage().then(() => {
            return StringUtil.checkIfElementExistsInList(allNames, updatedCompanyName);
        });
    }


    /*****************  Advance Filter Functionality validation  ****************/

    clickSearchIcon() {
        return $('app-company-list data-grid .search-icon.padding-top md-icon').click().then(() => {
            return browser.sleep(2000).then(() => {
                return $('.mat-sidenav.mat-sidenav-end.mat-sidenav-over.mat-sidenav-opened').isPresent().then((result) => {
                    return result;
                });
            });
        });
    }

    typeIDAndClickSearchNow() {
        return $$('app-company-list data-grid .scroll-container tbody tr td:nth-child(1)').then((elm) => {
            let txt = elm[0].getText();
            return $$('#mainForm input[id^="md-input"]').get(0).sendKeys(txt).then(() => {
                var loadElement = 'app-company-list data-grid .scroll-container';
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
                return $('app-company-list data-grid .scroll-container table').isPresent().then((result) => {
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
            var loadElement = 'app-company-list data-grid .scroll-container table';
            return ElementUtil.clickAndWaitForElement(resetButton, loadElement).then(() => {
                return browser.sleep(5000).then(() => {
                    return $$('app-company-list data-grid .scroll-container table tbody tr').then((companies) => {
                        return this.companyCountBeforeReset.then((companyListLen) => {
                            if(companyListLen == companies.length){
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

