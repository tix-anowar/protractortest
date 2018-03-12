import { browser, by, element, protractor, $, $$ } from 'protractor';

export class LogOutPage {

    getProfileIconFromLeftBar() {
        return $$('app-root app-menu nav li md-icon:not([ng-reflect-message])').last();
    }

    getLogoffButtonFromOpenedProfileMenuNav() {
        return $('app-root md-sidenav-container md-sidenav.menu.mat-sidenav-opened profile-menu profile-menu-item a');
    }

    clickOnProfileIcon() {
        return browser.actions().mouseMove(this.getProfileIconFromLeftBar()).click().perform().then(() => {
            return true;
        });
    }

    logout() {
        return browser.actions().mouseMove(this.getLogoffButtonFromOpenedProfileMenuNav()).click().perform().then(() => {
            return $("form.login-form").isPresent().then(result => {
                return result;
            });
        });
    }
}