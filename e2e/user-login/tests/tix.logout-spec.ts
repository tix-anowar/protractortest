import { browser } from 'protractor';
import { LogOutPage } from '../main/tix.logout-page';

describe('C120 Logout validation', () => {

    let logOutPage: LogOutPage = new LogOutPage();

    afterAll(() => {
        browser.sleep(2000);
    });

    afterEach(() => {
        browser.sleep(2000);
    });

    it('1. should click on "Profile" icon', done => {
        expect(logOutPage.clickOnProfileIcon()).toBe(true);
        done();
    });

    it('2. should perform logout action by clicking "Logoff" link', done => {
        expect(logOutPage.logout()).toBe(true);
        done();
    });
});
