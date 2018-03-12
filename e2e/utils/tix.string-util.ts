
export class StringUtil {

    /**
     * Checks wheather a string is valid or not
     * 
     * @static
     * @param {string} text 
     * @returns {boolean} 
     * @memberof StringUtil
     */
    static isValidString(text: string): boolean {
        return text != null && text != undefined && (text.length > 0) && (typeof text == 'string');
    }

    /**
     * Removes extra inner spaces, trailing and leading spaces from a single line string {@param text} .
     * 
     * @static
     * @param {string} text 
     * @returns {string} 
     * @memberof StringUtil
     */
    static removeExtraSpaces(text: string): string {
        if (this.isValidString(text)) {
            return text.trim().replace(/ +/g, ' ');
        } else {
            return "";
        }
    }

    /**
     * Checks if each string element of one Array persists within another and returns true or false.
     * 
     * @static
     * @param {Array<string>} first 
     * @param {Array<string>} second 
     * @returns {boolean} 
     * @memberof StringUtil
     */
    static checkIfTwoArraysContainSimilarElements(first: Array<string>, second: Array<string>): boolean {
        if (first.length != second.length) {
            return false;
        }
        let isEqual: boolean = true;
        for (let i = 0; i < first.length; i++) {
            first[i] = this.removeExtraSpaces(first[i]);
            second[i] = this.removeExtraSpaces(second[i]);
        }
        for (let i = 0; i < second.length; i++) {
            let str = this.removeExtraSpaces(second[i]);
            if (first.indexOf(str) >= 0) {
                continue;
            } else {
                isEqual = false;
                break;
            }
        }
        return isEqual;
    }

    /**
     * Returns true if Every string in an Array equals to a specific string.
     * 
     * @static
     * @param {Array<string>} list 
     * @param {string} text 
     * @returns {boolean} 
     * @memberof StringUtil
     */
    static isArrayContainsDistinctText(list: Array<string>, text: string): boolean {        
        if (list.length == 0) {
            return false;
        }
        return list.every((item) => {
            return item == text;
        });
    }

    static checkIfElementExistsInList(list, search_element): boolean {
        if (list.length == 0 || search_element.length == 0) {
            return false;
        }

        return list.map((elm) => {
            return elm.getText();
        }).then((elm) => {
            if (elm.indexOf(search_element) >= 0) {
                return true;
            } else {
                console.log(search_element + " is not found in the list " + elm);
                return false;
            }
        })
    }

};