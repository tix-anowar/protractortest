import { StringUtil } from './tix.string-util';

export class NumberUtil {

    /**
     * Returns true if the argument is a valid number in Javascript
     * 
     * @static
     * @param {any} n 
     * @returns {boolean} 
     * @memberof NumberUtil
     */
    static isNumber(n): boolean {
        return typeof n == 'number' && !isNaN(n) && isFinite(n);
    }

    /**
     * Converts a string to a number. Returns null for invalid string.
     * 
     * @static
     * @param {string} text 
     * @returns {number} 
     * @memberof NumberUtil
     */
    static stringToNumber(text: string): number {
        let numString: string = text.replace(/[^\d\.]*/g, '');
        if(StringUtil.isValidString(numString)) {
            if(numString.indexOf('.') >= 0) {
                return parseFloat(numString);
            } else {
                return parseInt(numString);
            }
        } else {
            return null;
        }
    }

    /**
     * Aggregates all numbers from an Array of string
     * 
     * @static
     * @param {any} strList 
     * @returns {number} 
     * @memberof NumberUtil
     */
    static addNumbersFromListOfString(strList): number {
        let sum: number = 0;
        strList.forEach(str => {
            let num = this.stringToNumber(str);
            sum += (num ? num : 0);
        });
        return sum;
    }

    /**
     * Aggregates all numbers from an Array of elements of type ElementFinder
     * 
     * @static
     * @param {any} elements 
     * @returns {number} 
     * @memberof NumberUtil
     */
    static getSumFromArrayOfElements(elements): number {
        return elements.map((elm) => {
            return elm.getText();
        }).then((texts) => {
            return this.addNumbersFromListOfString(texts);
        });
    }
};
