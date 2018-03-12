import { browser, by, element, $, $$ } from 'protractor';
import { StringUtil } from '../../utils/tix.string-util';
import { ElementUtil } from '../../utils/tix.element-util';
import { DashboardPage } from './tix.dashboard-page';

var data = require('../resources/tix.uat-config.json');

export class EntityTypePage {

    private dashboardPage: DashboardPage;

    /***************    C137 - C140    ***************/

    /***************  UI validation  ****************/
    constructor() {
        this.dashboardPage = new DashboardPage();
    }

    private entityTypeCountBeforeReset;

    clickEntityTypeIconAndcheckForPageLoad() {
        var loadElement = 'app-entity-type-list data-grid .scroll-container table';
        var enitityTypeLedgerIcon = 'md-sidenav-container navigation-menu navigation-menu-item a[href="/company-manager/entity-list"]';
        var tableColumnnames = $$('app-entity-type-list data-grid .scroll-container table thead tr th div:nth-child(1)');
        var findColumnName = 'Name';

        return this.dashboardPage.clickMenuIcon().then(() => {
            return ElementUtil.clickAndWaitForElement(enitityTypeLedgerIcon, loadElement).then(() => {
                return browser.sleep(2000).then(() => {
                    this.entityTypeCountBeforeReset = $$('app-entity-type-list data-grid .scroll-container table tbody tr').then((entityType) => {
                        return entityType.length;
                    });

                    return StringUtil.checkIfElementExistsInList(tableColumnnames, findColumnName);
                });
            });
        });
    }

    getEntityTypePageHeaderText() {
        return $('app-entity-type-list h1').getText().then((text) => {
            return text;
        });
    }

    getTableColumnNames() {
        return $$('app-entity-type-list .padding-container data-grid .scroll-container table th div:nth-child(1)').map((colNames) => {
            return colNames.getText();
        }).then((texts) => {
            return texts;
        });
    }

    checkEntityTypePageTableColumnNames() {
        let tableColumnNames = [
            'Name',
            'Description',
            ''
        ];

        return this.getTableColumnNames().then((colNames) => {
            let tableColNameList = [];
            tableColNameList = colNames;
            return StringUtil.checkIfTwoArraysContainSimilarElements(tableColumnNames, tableColNameList);
        });
    }

    checkIfAddButtonExists() {
        return $('app-entity-type-list .padding-container .mat-raised-button.mat-primary').isPresent().then((result) => {
            return result;
        });
    }

    /*****************  Add functionality validation  ****************/

    clickAddButtonToCreateEntityType() {
        var loadElement = '.cdk-overlay-container .cdk-global-overlay-wrapper div[id^="cdk-overlay-"]';
        var addButton = 'app-entity-type-list .padding-container .mat-raised-button.mat-primary';

        return ElementUtil.clickAndWaitForElement(addButton, loadElement).then(() => {
            return browser.sleep(2000).then(() => {
                return $('div[id^="cdk-overlay-"] md-dialog-container entity-type-dialog h2')
                .getText().then((headerText) => {
                    if(headerText == 'Add Entity Type'){
                        return true;
                    }else{
                        return false;
                    }
                });
            });
        });
    }

    clickCancelButton () {
        return $$('.cdk-overlay-container div[id^="cdk-overlay-"] md-dialog-container entity-type-dialog md-dialog-actions button').get(1)
        .click().then(() => {
            return true;
        });
    }

    clickSaveButton() {
        return $$('.cdk-overlay-container div[id^="cdk-overlay-"] md-dialog-container entity-type-dialog md-dialog-actions button').get(0)
        .click().then(() => {
            return true;
        });
    }

    setEntityTypeFieldValue(entityTypeData) {
        $$('div[id^="cdk-overlay-"] md-dialog-container .mat-dialog-content form .mat-input-wrapper input').each((inputFields) => {
            inputFields.getAttribute('ng-reflect-name').then((fieldName) => {
                if (entityTypeData[fieldName] != "") {
                    let locator = 'div[id^="cdk-overlay-"] md-dialog-container .mat-dialog-content form .mat-input-wrapper input[ng-reflect-name="' + fieldName + '"]';
                    let field = $(locator);
                    field.sendKeys(entityTypeData[fieldName]).then(() => {
                        browser.sleep(100);
                    });
                }
            });
        });
    }

    checkIfCanelButtonWorks() {
        return this.clickAddButtonToCreateEntityType().then(() => {
            return this.clickCancelButton();
        });
    }

    createEntityTypeWithoutData() {
        return this.clickAddButtonToCreateEntityType().then( () => {
            return this.clickSaveButton().then(() => {
                return browser.sleep(1000).then(() => {
                    return $('div[id^="cdk-overlay-"] snack-bar-container simple-snack-bar').getText().then((errorMessage) => {
                        return $('div[id^="cdk-overlay-"] snack-bar-container simple-snack-bar button').click().then(() => {
                            var errmsg = "Error occured creating entity type. Please refresh this page";
                            if(errorMessage.indexOf(errmsg) != -1){
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

    createEntityType() {
        let allEntityTypeData = data.entityType.createData;
        this.setEntityTypeFieldValue(allEntityTypeData[0]);

        return this.clickSaveButton().then(() => {
            return browser.sleep(1700).then(() => {
                return true;
            });
        });
    }

    checkIfCreatedEntityTypeAddedInEntityTypeList() {
        let EntityType = data.entityType.createData[0];
        let allname = $$('app-entity-type-list data-grid table tbody tr td:nth-child(1)');

        return StringUtil.checkIfElementExistsInList(allname, EntityType["name"]);
    }

    /*****************  Edit Functionality validation  ****************/

    clickFirstEntityTypeEditButton() {
        var loadElement = $('.cdk-overlay-container .cdk-global-overlay-wrapper div[id^="cdk-overlay-"]');
        var editIcon = element.all(by.cssContainingText('app-entity-type-list data-grid table tbody tr td button span', 'EDIT')).get(0);

        return ElementUtil.clickAndWaitForElementByFinder(editIcon, loadElement).then((res) => {
            return browser.sleep(500).then(() => {
                return true;
            });
        });
    }

    updateEntityTypeFieldValue(updateFieldData) {
        $$('div[id^="cdk-overlay-"] md-dialog-container .mat-dialog-content form .mat-input-wrapper input').each((inputFields) => {
            inputFields.getAttribute('ng-reflect-name').then((fieldName) => {
                if (updateFieldData[fieldName] != "") {
                    var locator = 'div[id^="cdk-overlay-"] md-dialog-container .mat-dialog-content form .mat-input-wrapper input[ng-reflect-name="' + fieldName + '"]';
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

    updateFirstENtityType() {
        let entityTypeFieldUpdateData = data.entityType.updateData;

        return this.clickFirstEntityTypeEditButton().then(() => {
            this.updateEntityTypeFieldValue(entityTypeFieldUpdateData);
            return this.clickSaveButton().then(() => {
                return browser.sleep(2000).then(() => {
                    return true;
                });
            });
        });
    }

    checkIfEntityTypeUpdatedInEntityTypeList() {
        let updatedEntityTypeName = data.entityType.updateData.name;
        let allNames = $$('app-entity-type-list data-grid table tbody tr td:nth-child(1)');

        return StringUtil.checkIfElementExistsInList(allNames, updatedEntityTypeName);
    }
}