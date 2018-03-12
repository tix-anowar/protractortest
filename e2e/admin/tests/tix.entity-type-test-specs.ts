import { browser } from 'protractor';
import { EntityTypePage } from '../main/tix.entity-type-page';

var globalConfig = require("../../tix.global-config.json");


describe('C137-C140 Admin panel Entity Type validation', () => {

    var defaultSpecDelayTime = globalConfig.defaultSpecDelayTime;

    afterEach(() => {
        browser.sleep(defaultSpecDelayTime);
    });

    let entityTypePage = new EntityTypePage();

    describe('C137 - UI validation', () => {

        it('should load Entity Type Page on clicking Entity Type Icon', (done) => {
            expect(entityTypePage.clickEntityTypeIconAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should display "Entity Types" as header text', (done) => {
            expect(entityTypePage.getEntityTypePageHeaderText()).toEqual('Entity Types');
            done();
        });

        it('should display "Entity Type" table column names', (done) => {
            expect(entityTypePage.checkEntityTypePageTableColumnNames()).toBe(true);
            done();
        });

        it('should display "Add" button on top-right corner', (done) => {
            expect(entityTypePage.checkIfAddButtonExists()).toBe(true);
            done();
        });

    });


    describe('C138 - Add functionality validation', () => {

        it('should check if cancel button works or not', (done) => {
            expect(entityTypePage.checkIfCanelButtonWorks()).toBe(true);
            done();
        });

        it('should show error message on trying to create empty Entity Type', (done) => {
            expect(entityTypePage.createEntityTypeWithoutData()).toBe(true);
            done();
        });

        it('should create Entity Type', (done) => {
            expect(entityTypePage.createEntityType()).toBe(true);
            done();
        });

        it('should add the newly created Entity Type in Entity Type list', (done) => {
            expect(entityTypePage.checkIfCreatedEntityTypeAddedInEntityTypeList()).toBe(true);
            done();
        });

    });

    describe('C139 - Edit functionality validation', () => {

        it('should edit first Entity Type of Entity Type list', (done) => {
            expect(entityTypePage.updateFirstENtityType()).toBe(true);
            done();
        });

        it('should check if first Entity Type has been added to Entity Type list', (done) => {
            expect(entityTypePage.checkIfEntityTypeUpdatedInEntityTypeList()).toBe(true);
            done();
        });

    });

});