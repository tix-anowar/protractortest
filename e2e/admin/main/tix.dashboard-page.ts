import { browser, by, element, ExpectedConditions, protractor, $, $$ } from 'protractor';
import { StringUtil } from '../../utils/tix.string-util';
import { ElementUtil } from '../../utils/tix.element-util';

var globalConfigs = require("../../tix.global-config.json");
var data = require("../resources/tix." + globalConfigs.envName + "-config.json");

export class DashboardPage {

    private action: string = (globalConfigs.loginUserType == 'producer') ? '' : 'admin';

    constructor() {
        this.navigateTo();
    }

    navigateTo() {
        return browser.get(this.getDashboardUrl());
    }

    getDashboardUrl() {
        return data.appUrl + '/' + this.action;
    }

    /***************  COMMON  ****************/

    clickMenuIcon() {
        return  $('app-menu aside nav ul li:nth-child(1)').click().then(() => {
            return browser.sleep(500);
        });
    }

    /***************    C122    ***************/
    
    hasTradeIxLogo() {
        return $('app-menu-bar .logo').isPresent().then((result) => {
            return result;
        });
    }
    
    hasMenuIcon() {
        return $('app-menu aside nav ul li:nth-child(1)').isPresent().then((result) => {
            return result;
        });
    }

    hasProfileIcon() {
        return $('app-menu aside nav ul li:nth-child(2)').isPresent().then((result) => {
            return result;
        });
    }

    getMenuItemList() {
        return $$("app-root md-sidenav-container md-sidenav.menu.mat-sidenav.mat-sidenav-over navigation-menu navigation-menu-item a span").map((menuItemNames) => {
            return menuItemNames.getText();
        }).then((texts) => {
            return texts;
        });
    }

    checkMenuItemist() {
        let menu_names = [
          'Seeders',
          'Admin Home',
          'Entity Types',
          'Contact Types',
          'Company Manager',
          'Composer',
          'Bid Offer Ledger',
          'Entity Ledger',
          'Invoice Ledger',
          'Create Offer'
          ];
          
        return this.clickMenuIcon().then(() => {
            return this.getMenuItemList().then((texts) => {
                let menu_items_names  = [];
                menu_items_names = texts;
                return StringUtil.checkIfTwoArraysContainSimilarElements(menu_names, menu_items_names);
            });
        });
    }

}