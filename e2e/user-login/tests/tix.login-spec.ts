import { browser } from 'protractor';
import { LoginPage } from '../main/tix.login-page';

describe('C108 Login validation', () => {

    let loginPage: LoginPage = new LoginPage();

    it('1. should fill email address and password field', done => {
      expect(loginPage.setEmailAddress()).toBe(true);
      expect(loginPage.setPassword()).toBe(true);
      done();
    });

    it('2. should perform login action', done => {
      expect(loginPage.performLoginAction()).toBe(true);
      done();
    });
});