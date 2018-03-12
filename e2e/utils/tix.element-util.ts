import { StringUtil } from './tix.string-util';
import { browser, by, element, $, $$, protractor, ExpectedConditions, ElementFinder } from 'protractor';

const DEFAULT_TIMEOUT = 15000;
const DEFAULT_FILTER_TIMEOUT = 2000;

export class ElementUtil {

    static clickAndWaitForPageLoad(button, targetElm) {
        return button.click().then(() => {
            var EC = protractor.ExpectedConditions;
            return browser.wait(EC.presenceOf(targetElm), 15000).then(() => {
                return targetElm.isPresent().then((result) => {
                    return result;
                }).catch(ex => {
                    console.log("Element is not present");
                    return false;
                });
            }).catch(ex => {
                console.log("Page takes too long time to load");
                return false;
            });
        });
    }

    /**
     * 
     * @param element The ElementFinder for which browser will wait for its presence 
     * @param timeout Maximum timeout to be wait for the presence of the @param element
     * @return A Promise of boolean type indicating if the @param element is found or not
     */
    static checkIfElementLoadedByFinder(element: ElementFinder, timeout = DEFAULT_TIMEOUT) {
        var until = protractor.ExpectedConditions;
        return browser.wait(until.presenceOf(element), timeout).then(() => {
            return true;
        }, () => {
            console.log("Element is either not found or taking too long to appear in the DOM");
            return false;
        });
    }

    /**
     * 
     * @param clickOnCssPath The CSS path of ElementFinder on which click action will be performed 
     * @param waitForCssPath The CSS path of ElementFinder for which browser will wait for its presence
     * @param timeout Maximum timeout to be wait for the presence of the ElementFinder at CSS path @param waitForCssPath
     * @return A Promise of boolean type indicating if the @param element is found or not
     */
    static clickAndWaitForElement(clickOnCssPath: string, waitForCssPath: string, timeout = DEFAULT_TIMEOUT) {
        return browser.actions().mouseMove($(clickOnCssPath)).click().perform().then(() => {
            return this.checkIfElementLoadedByFinder($(waitForCssPath), timeout);
        });
    }

    /**
     * 
     * @param clickOnElement The ElementFinder on which click action will be performed 
     * @param waitForElement The ElementFinder for which browser will wait for its presence
     * @param timeout Maximum timeout to be wait for the presence of the @param waitForElement
     * @return A Promise of boolean type indicating if the @param waitForElement is found or not
     */
    static clickAndWaitForElementByFinder(clickOnElement: ElementFinder, waitForElement: ElementFinder, timeout = DEFAULT_TIMEOUT) {
        return browser.actions().mouseMove(clickOnElement).click().perform().then(() => {
            return this.checkIfElementLoadedByFinder(waitForElement, timeout);
        });
    }

    static filterTableByTextInColumn(columnSelector: string, filterInputFieldSelector: string, timeout = DEFAULT_FILTER_TIMEOUT) {
        let searchNowSelector = '#mainForm button.mat-raised-button.mat-primary';
        return $$(columnSelector).last().getText().then((name) => {
            return $(filterInputFieldSelector).sendKeys(name).then(() => {
                browser.sleep(1000); // wait for visibility of action
                return $(searchNowSelector).click().then(() => {
                    return browser.sleep(timeout).then(() => {
                        return $$(columnSelector).map((elm) => {
                            return elm.getText();
                        }).then((list) => {
                            return StringUtil.isArrayContainsDistinctText(list as Array<string>, name);
                        });
                    });
                });
            });
        });
    }

};