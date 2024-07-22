import _ from "lodash";

import { DatePIOInterface, DateTimePIOInterface } from "./@types/DataTypesInterfaces";
import { EntryType, ISubTreeWithTypes, PrimitiveDataTypes, RootObjectType } from "./@types/Types";
import * as PrimitiveDataClasses from "./PrimitiveDataTypes";
import { SubTree } from "./SubTree";

/**
 * Capitalizes the first letter of a string.
 * @param {string} s - The input string to be capitalized.
 * @returns {string} The input string with the first character capitalized.
 */
export const capitalize = <T extends string>(s: T): string =>
    (s[0].toUpperCase() + s.slice(1).toLowerCase()) as Capitalize<typeof s>;

/**
 * Retrieves an object containing all primitive data classes stored in the "PrimitiveDataTypes.ts" file.
 * @returns {object} An object where keys are class names and values are the corresponding class definitions.
 * @description Keys of the returned object are the class names, and values are the appropriate class definitions.
 */
export const getPrimitiveDataClasses = (): object => PrimitiveDataClasses;

/**
 * Checks whether the input parameter is an instance of a primitive data type.
 * All primitive data types are stored in the "PrimitiveDataTypes.ts" file.
 * @param {EntryType | EntryType[] | PrimitiveDataTypes | RootObjectType} data - Data of the RootObject.
 * @returns {boolean} True if the input parameter 'data' is an instance of a primitive data type.
 */

export const isPrimitiveDataType = (data: EntryType | EntryType[] | PrimitiveDataTypes | RootObjectType): boolean => {
    //Array of instances of all existing primitive data types
    const classArray = Object.values(getPrimitiveDataClasses());

    //Primitive data never show up in an array
    if (data instanceof Array) {
        return false;
    }

    //If parameter 'data' matches to a primitive data type -> return true
    for (const element of classArray) {
        if (data instanceof element) {
            return true;
        }
    }

    //Otherwise return false
    return false;
};

/**
 * Validates DateTime information. Time arguments (hour, min, sec) are optional.
 * @param {number} year - The year as a number between 1000 and 3000.
 * @param {number} month - The month as a number between 1 and 12.
 * @param {number} day - The day as a number between 1 and 31 (adjusts for month lengths and leap years).
 * @param {number} [hour=0] - The hours as a number between 0 and 23.
 * @param {number} [min=0] - The minutes as a number between 0 and 59.
 * @param {number} [sec=0] - The seconds as a number between 0 and 59.
 * @throws {Error} Throws an error if validation was unsuccessful.
 */
export const validateDateTime = (
    year: number,
    month: number,
    day: number,
    hour: number = 0,
    min: number = 0,
    sec: number = 0
): void => {
    const validateDate = (y: number, m: number, d: number): boolean => {
        // Check the ranges of month and year
        if (y < 1000 || y > 3000 || m <= 0 || m > 12) return false;

        const monthLength: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (y % 400 == 0 || (y % 100 != 0 && y % 4 == 0)) monthLength[1] = 29;

        // Check the range of the day
        return d > 0 && d <= monthLength[m - 1];
    };
    const validateTime = (h: number, m: number, s: number): boolean => {
        // Check the ranges of hour, minute and second
        return h >= 0 && h < 24 && m >= 0 && m < 60 && s >= 0 && s < 60;
    };

    if (!validateDate(year, month, day)) throw new Error("Validation of the date failed");
    else if (!validateTime(hour, min, sec)) throw new Error("Validation of the time failed");
};

/**
 * Converts an integer to a 2-digit string. Appends a leading zero if the integer has only one digit.
 * @param {number} integer - The input integer.
 * @returns {string} A string representing a 2-digit integer number.
 * @description This function is used in the buildDateTimeString() function in the same file.
 */
export const dateTimeIntegerToString = (integer: number): string => {
    if (0 <= integer && integer < 10) {
        return "0" + integer.toString();
    } else {
        return integer.toString();
    }
};

/**
 * Returns a string representing a date or a dateTime according to the FHIR specification.
 * The time parameters (hour, min, sec) are optional. This function will not validate the parameters.
 * @param {string} mode - The mode can be "date" or "date_time". This controls whether the function returns a date or a dateTime.
 * @param {number} year - The year as a number.
 * @param {number} month - The month as a number (1-12).
 * @param {number} day - The day as a number (1-31).
 * @param {number} [hour=0] - The hours as a number (0-23). Default is 0.
 * @param {number} [min=0] - The minutes as a number (0-59). Default is 0.
 * @param {number} [sec=0] - The seconds as a number (0-59). Default is 0.
 * @returns {string} A string formatted like 'YYYY-MM-DD' or 'YYYY-MM-DDThh:mm:ss' depending on the mode parameter.
 * @throws {Error} Throws an error if the mode argument is not "date" or "date_time".
 * @example
 * const date = buildDateTimeString('date', 2023, 9, 21); // Returns '2023-09-21'
 * const dateTime = buildDateTimeString('date_time', 2023, 9, 21, 12, 30, 15); // Returns '2023-09-21T12:30:15'
 */
export const buildDateTimeString = (
    mode: string,
    year: number,
    month: number,
    day: number,
    hour: number = 0,
    min: number = 0,
    sec: number = 0
): string => {
    // Build date string
    let date_string: string = year.toString();
    date_string += "-" + dateTimeIntegerToString(month);
    date_string += "-" + dateTimeIntegerToString(day);

    switch (mode) {
        case "date":
            // Return date string
            return date_string;
        case "date_time":
            // Build a date_time string and return it
            return (
                date_string +
                "T" +
                dateTimeIntegerToString(hour) +
                ":" +
                dateTimeIntegerToString(min) +
                ":" +
                dateTimeIntegerToString(sec)
            );
        default:
            throw new Error("Wrong mode stated");
    }
};

/**
 * Converts a string to a DateTimePIOInterface or a DatePIOInterface depending on its format.
 * @param {string} str - Input string. Must match the format 'YYYY-MM-DD' or 'YYYY-MM-DDThh:mm:ss'.
 * @returns {DateTimePIOInterface | DatePIOInterface} An object representing date and time information.
 * @throws {Error} If the date and time information is invalid or the string does not match the specified format.
 * @description
 * This function validates date and time information using the 'validateDateTime()' method, which may throw an Error.
 * Additionally, an Error is thrown if the parameter does not match the specified format defined by the regex expression.
 * @example
 * const result = parseStringToDateObject('2023-09-21');
 * // Returns: { year: 2023, month: 9, day: 21 } (DatePIOInterface)
 * @example
 * const result = parseStringToDateObject('2023-09-21T12:34:56');
 * // Returns: { year: 2023, month: 9, day: 21, hour: 12, minute: 34, second: 56 } (DateTimePIOInterface)
 */
export const parseStringToDateObject = (str: string): DateTimePIOInterface | DatePIOInterface => {
    const parts: string[] = str.split("T");
    const dateParts: string[] = parts[0].split("-");

    if (dateParts.length === 3 && dateParts[0].length === 4 && dateParts[1].length === 2 && dateParts[2].length === 2) {
        const year: number = Number(dateParts[0]);
        const month: number = Number(dateParts[1]);
        const day: number = Number(dateParts[2]);

        if (parts.length === 2) {
            const timeString: string = (parts[1].match(/(\d{2}):(\d{2}):(\d{2})/) as RegExpMatchArray)[0];
            if (timeString) {
                const timeParts: string[] = timeString.split(":");
                const hour: number = Number(timeParts[0]);
                const minute: number = Number(timeParts[1]);
                const second: number = Number(timeParts[2]);

                validateDateTime(year, month, day, hour, minute, second);

                return { year, month, day, hour, minute, second };
            }
        } else {
            validateDateTime(year, month, day);

            return { year, month, day };
        }
    }

    throw new Error(`The string is not a valid date or dateTime string`);
};

/**
 * Transforms one JSON object (received by axios) into one SubTree instance.
 * All nested SubTrees are transformed as well. Furthermore, all primitive data is transformed into appropriate class instances.
 * @param {object} obj - The object received by axios
 * @returns {SubTree} The transformed SubTree object
 * @throws {Error} Throws an error if the transformation encounters an issue.
 * @description This function uses a recursive approach to perform the transformation.
 */
export const transformToSubTree = (obj: object): SubTree => {
    /**
     * Recursively transforms the subTreeObject and populates the newSubTree.
     * @param {object} subTreeObject - The subTreeObject to be transformed
     * @param {SubTree} newSubTree - The new SubTree to populate
     * @throws {Error} Throws an error if there's an issue with the transformation.
     */
    const transformRecursive = (subTreeObject: object, newSubTree: SubTree): void => {
        newSubTree.addedPaths = subTreeObject["addedPaths"];

        if (subTreeObject["data"]) {
            try {
                newSubTree.data = getPrimitiveDataClasses()[subTreeObject["dataType"]].parseFromString(
                    subTreeObject["data"]
                );
            } catch (error) {
                throw new Error(`Error transforming data: ${error}`);
            }
        }

        if (subTreeObject["children"].length > 0) {
            subTreeObject["children"].forEach((item: object): void => {
                const childPath: string =
                    subTreeObject["lastPathElement"] === item["lastPathElement"].split("[")[0]
                        ? `${subTreeObject["absolutePath"].split(".").slice(0, -1).join(".")}.${
                              item["lastPathElement"]
                          }`
                        : `${subTreeObject["absolutePath"]}.${item["lastPathElement"]}`;
                const childSubTree: SubTree = new SubTree(childPath, undefined);
                newSubTree.children.push(childSubTree);
                transformRecursive(item, childSubTree);
            });
        }
    };

    // Start recursive call
    const objClone: object = _.cloneDeep(obj);
    const initialPath = objClone["absolutePath"];
    const initialSubTree: SubTree = new SubTree(initialPath, undefined);
    transformRecursive(objClone, initialSubTree);

    return initialSubTree;
};

/**
 * This function adds additional information about the primitive data type to all SubTrees and their children. This is
 * necessary before each http request, which sends SubTrees to the backend, because all information about custom class
 * instances will get lost. Http requests just transmit json objects.
 * @param {SubTree[]} subTrees Array of SubTrees which should be sent to the backend
 * @returns {object[]} ISubTreeWithTypes interfaces converted to normal objects
 */
export const addInformationAboutPrimitiveDataTypes = (subTrees: SubTree[]): ISubTreeWithTypes[] => {
    /**
     * Recursively adds information about the data type to the SubTree and its children.
     * @param {ISubTreeWithTypes} subTreeWithTypes - The SubTree with types to process.
     */
    const addInformationRecursive = (subTreeWithTypes: ISubTreeWithTypes): void => {
        if (subTreeWithTypes.data) {
            subTreeWithTypes.dataType = (subTreeWithTypes.data as PrimitiveDataTypes).getName();
            subTreeWithTypes.data = (subTreeWithTypes.data as PrimitiveDataTypes).toString();
        }
        if (subTreeWithTypes.children && subTreeWithTypes.children?.length > 0) {
            subTreeWithTypes.children.forEach((item: ISubTreeWithTypes): void => {
                addInformationRecursive(item);
            });
        }
    };

    //Add data type information recursively
    const returnValue: ISubTreeWithTypes[] = [];

    subTrees.forEach((subTree: SubTree): void => {
        const subTreeWithTypes: ISubTreeWithTypes = _.cloneDeep(subTree) as ISubTreeWithTypes;
        addInformationRecursive(subTreeWithTypes);
        returnValue.push(subTreeWithTypes);
    });

    return returnValue;
};
