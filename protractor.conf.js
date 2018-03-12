// Protractor configuration file, see link for more information https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var globalConfigs = require('./e2e/tix.global-config.json');

const showSpecReport = globalConfigs.showSpecReport;
const showHtmlReport = globalConfigs.showHtmlReport;

var htmlScreenshotReporter = new HtmlScreenshotReporter({
  reportTitle: "Tradeix e2e Last Automation Log",
  dest: 'src/app/test-report/screenshots',
  filename: 'test.component.html',
  captureOnlyFailedSpecs: true,
  reportOnlyFailedSpecs: false
});

var specReporter = new SpecReporter({
  spec: {
    displayStacktrace: true
  }
});

let allSpecs = [globalConfigs.specs.login].concat(globalConfigs.specs[globalConfigs.loginUserType], [globalConfigs.specs.logout]);

exports.config = {
  allScriptsTimeout: 60000,
  specs: allSpecs,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    browserName: 'chrome',
    os: 'Windows',
   },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
    print: function () {}
  },
  onPrepare() {
    browser.driver.manage().window().maximize();
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    if(showSpecReport) {
      jasmine.getEnv().addReporter(specReporter);
    }
    if(showHtmlReport) {
      jasmine.getEnv().addReporter(htmlScreenshotReporter);
    }
  },
  beforeLaunch: () => {
    return new Promise((resolve) => {
      if (showHtmlReport) {
        htmlScreenshotReporter.beforeLaunch(resolve);
      }
    });
  },
  afterLaunch: (exitCode) => {
    return new Promise((resolve) => {
      if (showHtmlReport) {
        htmlScreenshotReporter.afterLaunch(resolve.bind(this, exitCode));
      }
    });
  }
};
