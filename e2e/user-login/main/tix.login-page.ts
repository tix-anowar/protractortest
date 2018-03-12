import { browser, by, element, protractor, $, $$ } from 'protractor';

const globalConfigs = require('../../tix.global-config.json');
const data = require('../../' + globalConfigs.loginUserType + '/resources/tix.' + globalConfigs.envName + '-config.json');

const credentials = require('../../tix.credentials.json');

export class LoginPage {
  private loginCredentials: any = credentials.loginCredentials; // N.B.: {credentials.loginCredentials} should be replaced after adding to private git repo by {data.loginCredentials};
  private defaultSpecDelayTime: number = globalConfigs.defaultSpecDelayTime;

  constructor() {
    this.navigateTo();
  }

  navigateTo() {
    browser.ignoreSynchronization = true;
    return browser.driver.get(data.appUrl).then(() => {
      return browser.sleep(this.defaultSpecDelayTime);
    });
  }

  delayAfterActionForVisibility() {
    return browser.sleep(this.defaultSpecDelayTime);
  }

  getEmailAddressField() {
    return $('#emailAddress');
  }

  getPasswordField() {
    return $('#password');
  }

  setEmailAddress() {
    return this.getEmailAddressField().sendKeys(this.loginCredentials.username).then(() => {
      return this.delayAfterActionForVisibility().then(() => {
          return true;
      });
    });;
  }

  setPassword() {
    return this.getPasswordField().sendKeys(this.loginCredentials.password).then(() => {
      return this.delayAfterActionForVisibility().then(() => {
        return true;
      });
    });
  }

  clickLoginButton() {
    return $('#login-button').click();
  }

  submitLoginForm() {
    return $('form.login-form').submit();
  }

  pressEnterButton() {
    return browser.actions().sendKeys(protractor.Key.ENTER).perform();
  }

  performLoginAction() {
    return this.clickLoginButton().then(() => {
      return $('app-root main').isPresent().then((result) => {
        return result;
      });
    });
  }

}
