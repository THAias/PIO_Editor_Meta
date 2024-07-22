import { v4 as uuidv4, validate } from "uuid";

import {
    DatePIOInterface,
    DateTimePIOInterface,
    StaticImplements,
    StaticPrimitiveData,
} from "./@types/DataTypesInterfaces";
import { buildDateTimeString, dateTimeIntegerToString, parseStringToDateObject, validateDateTime } from "./Helper";

/**
 * Represents the primitive FHIR data type 'string'.
 * @class
 */
class StringPIO {
    /**
     * Stores the actual primitive data.
     * @type {string}
     * @private
     */
    _value: string;

    /**
     * Constructs an instance of StringPIO.
     * @param {string} value The initial value for the string primitive.
     */
    constructor(value: string) {
        this._value = value;
    }

    /**
     * Parses a string value into a StringPIO instance (used in readXML() method of RootObject).
     * @static
     * @param {string | undefined} value The input string to parse.
     * @returns {StringPIO | undefined} An instance of StringPIO or undefined if parsing fails.
     */
    public static parseFromString(value: string | undefined): StringPIO | undefined {
        return value ? new StringPIO(value) : undefined;
    }

    /**
     * Returns the attribute '_value' as a string (used in toXML() method of RootObject).
     * @returns {string} The value stored under attribute '_value' as a string.
     */
    public toString(): string {
        return this._value;
    }

    /**
     * Returns the value stored in the '_value' attribute.
     * @returns {string} The value stored in the '_value' attribute of the primitive data object.
     */
    public get(): string {
        return this._value;
    }

    /**
     * Sets a new value for the '_value' attribute.
     * @param {string} value The new value to set.
     */
    public set(value: string): void {
        this._value = value;
    }

    /**
     * Returns the name of the primitive data type.
     * @returns {string} The name of the primitive data type.
     */
    public getName(): string {
        return "StringPIO";
    }
}

/**
 * Represents the primitive FHIR data type 'code'.
 * @class
 */
class CodePIO implements StaticImplements<StaticPrimitiveData, typeof CodePIO> {
    /**
     * Stores the actual primitive data.
     * @type {string}
     * @private
     */
    _value: string;

    /**
     * Creates an instance of CodePIO.
     * @param {string} value The value for the code.
     */
    constructor(value: string) {
        this._value = value.trim();
    }

    /**
     * Parses a string value into a CodePIO instance (used in readXML() method of RootObject)
     * @param {string | undefined} value The plain string to be parsed into a primitive data object.
     * @returns {CodePIO | undefined} An instance of CodePIO, or undefined if the input is not valid.
     */
    public static parseFromString(value: string | undefined): CodePIO | undefined {
        return value ? new CodePIO(value) : undefined;
    }

    /**
     * Returns the attribute '_value' as a string (used in toXML() method of RootObject)
     * @returns {string} The data stored under attribute '_value' as a string.
     */
    toString(): string {
        return this._value;
    }

    /**
     * Gets the value of the CodePIO instance.
     * @returns {string} The value of the primitive data object.
     */
    get(): string {
        return this._value;
    }

    /**
     * Sets a new value for the CodePIO instance.
     * @param {string} value The new value to be set.
     */
    set(value: string): void {
        this._value = value.trim();
    }

    /**
     * Returns the name of the primitive data type.
     * @returns {string} The name of the primitive data type.
     */
    public getName(): string {
        return "CodePIO";
    }
}

/**
 * Represents the primitive FHIR data type 'uri', which could be also an url.
 * @class
 */
class UriPIO implements StaticImplements<StaticPrimitiveData, typeof UriPIO> {
    /**
     * The value of UriPIO
     * @type {string}
     * @private
     */
    _value: string;

    /**
     * Constructor for UriPIO
     * @param {string} value The initial value for UriPIO
     */
    constructor(value: string) {
        this._value = value;
    }

    /**
     * Parses a string value into an instance of UriPIO.
     * @static
     * @param {string | undefined} value The input string to parse
     * @returns {UriPIO | undefined} An instance of UriPIO, or undefined if parsing fails
     */
    public static parseFromString(value: string | undefined): UriPIO | undefined {
        return value ? new UriPIO(value) : undefined;
    }

    /**
     * Returns the attribute '_value' as string (used in toXML() method of RootObject)
     * @returns {string} Data stored under attribute '_value' as string
     */
    toString(): string {
        return this._value;
    }

    /**
     * Retrieves the current value of UriPIO.
     * @returns {string} The current value of UriPIO
     */
    get(): string {
        return this._value;
    }

    /**
     * Sets a new value for UriPIO.
     * @param {string} value The new value for UriPIO
     */
    set(value: string): void {
        this._value = value;
    }

    /**
     * Returns the name of the primitive data type.
     * @returns {string} The name of the primitive data type.
     */
    public getName(): string {
        return "UriPIO";
    }
}

/**
 * Represents the primitive FHIR data type 'uuid'. In FHIR, the uuid string is stored with the prefix 'urn:uuid'.
 * @class
 */
class UuidPIO implements StaticImplements<StaticPrimitiveData, typeof UuidPIO> {
    /**
     * Stores the actual uuid without the prefix 'urn:uuid:'
     * @type {string}
     * @private
     */
    _value: string;

    /**
     * Constructs a new UuidPIO instance.
     * @param {string} value The uuid value (with or without the 'urn:uuid:' prefix)
     */
    constructor(value: string) {
        // Cut "urn:uuid:" if included in string
        this._value = UuidPIO.checkValue(value.split(":").pop() as string);
    }

    /**
     * Generates a random uuid.
     * @static
     * @returns {string} The newly generated uuid
     */
    static generateUuid(): string {
        return uuidv4();
    }

    /**
     * Parses a string value to create a UuidPIO instance (used in readXML() method of RootObject).
     * @static
     * @param {string | undefined} value The plain string to be parsed to a primitive data object
     * @returns {UuidPIO | undefined} An instance of UuidPIO, or undefined if input value is not provided
     */
    public static parseFromString(value: string | undefined): UuidPIO | undefined {
        return value ? new UuidPIO(value) : undefined;
    }

    /**
     * Checks whether a value is a valid uuid.
     * @private
     * @static
     * @param {string} value The value for validation
     * @returns {string} The input value, if validation succeeded
     * @throws {TypeError} Throws an error if validation fails
     */
    private static checkValue(value: string): string {
        if (validate(value)) {
            return value;
        } else {
            throw new TypeError("String is not a valid uuid");
        }
    }

    /**
     * Returns the uuid value as a string (used in toXML() method of RootObject).
     * @returns {string} The data stored under attribute '_value' as string including the 'urn:uuid:' prefix
     */
    toString(): string {
        return "urn:uuid:" + this._value;
    }

    /**
     * Gets the current value of the UuidPIO instance.
     * @returns {string} The current value of the primitive data object
     */
    get(): string {
        return this._value;
    }

    /**
     * Sets a new value for the UuidPIO instance.
     * @param {string} value The new value to be set
     */
    set(value: string): void {
        // Cut "urn:uuid:" if included in string
        this._value = UuidPIO.checkValue(value.split(":").pop() as string);
    }

    /**
     * Returns the name of the primitive data type.
     * @returns {string} The name of the primitive data type.
     */
    public getName(): string {
        return "UuidPIO";
    }
}

/**
 * Represents the primitive FHIR data type 'binary'.
 * @class
 */
class BinaryPIO implements StaticImplements<StaticPrimitiveData, typeof BinaryPIO> {
    /**
     * Stores the actual primitive data as Base64.
     * @type {string}
     * @private
     */
    _value: string; // Base64

    /**
     * Creates an instance of BinaryPIO.
     * @param {string} value The binary data in Base64 format.
     */
    constructor(value: string) {
        this._value = BinaryPIO.checkValue(value);
    }

    /**
     * Parses a string value into an instance of BinaryPIO.
     * This method is used in the readXML() method of RootObject.
     * @param {string | undefined} value The plain string to be parsed to a primitive data object.
     * @returns {BinaryPIO | undefined} An instance of BinaryPIO, or undefined if input is empty.
     */
    public static parseFromString(value: string | undefined): BinaryPIO | undefined {
        return value ? new BinaryPIO(value) : undefined;
    }

    /**
     * Checks whether the value is in a Binary Base64 format.
     * @param {string} value The value to be validated.
     * @returns {string} The input value, if validation succeeded.
     * @throws {TypeError} Throws an error if validation fails.
     * @private
     */
    private static checkValue(value: string): string {
        try {
            if (btoa(atob(value)) === value) return value;
        } catch (ignored) {}
        throw new TypeError("String is not a valid base64 string");
    }

    /**
     * Returns the attribute '_value' as a string.
     * This method is used in the toXML() method of RootObject.
     * @returns {string} The data stored under the attribute '_value' as a string.
     */
    toString(): string {
        return this._value;
    }

    /**
     * Gets the '_value' attribute of the primitive data object.
     * @returns {string} The '_value' attribute of the primitive data object.
     */
    get(): string {
        return this._value;
    }

    /**
     * Sets the '_value' attribute of the primitive data object.
     * @param {string} value The new value to set as the '_value' attribute.
     */
    set(value: string): void {
        this._value = BinaryPIO.checkValue(value);
    }

    /**
     * Returns the name of the primitive data type.
     * @returns {string} The name of the primitive data type.
     */
    public getName(): string {
        return "BinaryPIO";
    }
}

/**
 * Represents the primitive FHIR data type 'dateTime'.
 * @class
 */
class DateTimePIO implements StaticImplements<StaticPrimitiveData, typeof DateTimePIO> {
    /**
     * Stores the actual primitive data.
     * @type {DateTimePIOInterface}
     * @private
     */
    _value: DateTimePIOInterface;

    /**
     * Creates an instance of DateTimePIO.
     * @param {number} year The year value.
     * @param {number} month The month value.
     * @param {number} day The day value.
     * @param {number} hour The hour value.
     * @param {number} min The minute value.
     * @param {number} [sec=0] The second value (default is 0).
     */
    constructor(year: number, month: number, day: number, hour: number, min: number, sec: number = 0) {
        /**
         * Stores the actual primitive data.
         * @type {DateTimePIOInterface}
         * @private
         */
        this._value = {
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: min,
            second: sec,
        };

        validateDateTime(year, month, day, hour, min, sec);
    }

    /**
     * Parses a string value into a DateTimePIO instance (used in readXML() method of RootObject).
     * @param {string | undefined} value Plain string of format YYYY-MM-DDThh:mm:ss which should be parsed to a primitive data object.
     * @returns {DateTimePIO | undefined} An instance of DateTimePIO or undefined if parsing fails.
     */
    public static parseFromString(value: string | undefined): DateTimePIO | undefined {
        if (value) {
            const dateTimeObject: DateTimePIOInterface = parseStringToDateObject(value) as DateTimePIOInterface;
            if (dateTimeObject.hour !== undefined) {
                return new DateTimePIO(
                    dateTimeObject.year,
                    dateTimeObject.month,
                    dateTimeObject.day,
                    dateTimeObject.hour,
                    dateTimeObject.minute,
                    dateTimeObject.second
                );
            } else {
                return new DateTimePIO(dateTimeObject.year, dateTimeObject.month, dateTimeObject.day, 0, 0, 0);
            }
        } else {
            return;
        }
    }

    /**
     * Returns the attribute '_value' as string (used in toXML() method of RootObject)
     * @returns {string} Data stored under attribute '_value' as string (YYYY-MM-DDThh:mm:ss).
     */
    toString(): string {
        return `${this._value.year}-${dateTimeIntegerToString(this._value.month)}-${dateTimeIntegerToString(
            this._value.day
        )}T${dateTimeIntegerToString(this._value.hour)}:${dateTimeIntegerToString(
            this._value.minute
        )}:${dateTimeIntegerToString(this._value.second)}Z`;
    }

    /**
     * Returns the '_value' attribute.
     * @returns {DateTimePIOInterface} The '_value' attribute of the primitive data object.
     */
    get(): DatePIOInterface {
        return this._value;
    }

    /**
     * Sets the '_value' attribute and validates the dateTime.
     * @param {DateTimePIOInterface} dateTimeObject This argument is set as new '_value' attribute.
     */
    set(dateTimeObject: DateTimePIOInterface): void {
        this._value = {
            year: dateTimeObject.year,
            month: dateTimeObject.month,
            day: dateTimeObject.day,
            hour: dateTimeObject.hour,
            minute: dateTimeObject.minute,
            second: dateTimeObject.second,
        };
        validateDateTime(
            dateTimeObject.year,
            dateTimeObject.month,
            dateTimeObject.day,
            dateTimeObject.hour,
            dateTimeObject.minute,
            dateTimeObject.second
        );
    }

    /**
     * Returns the name of the primitive data type.
     * @returns {string} The name of the primitive data type.
     */
    public getName(): string {
        return "DateTimePIO";
    }
}

/**
 * Represents the primitive FHIR data type 'date'.
 * @class
 */
class DatePIO implements StaticImplements<StaticPrimitiveData, typeof DatePIO> {
    /**
     * Stores the actual primitive data.
     * @type {DatePIOInterface}
     * @private
     */
    _value: DatePIOInterface;

    /**
     * Constructs an instance of DatePIO.
     * @param {number} year The year value.
     * @param {number} month The month value.
     * @param {number} day The day value.
     */
    constructor(year: number, month: number, day: number) {
        this._value = {
            year: year,
            month: month,
            day: day,
        };
        validateDateTime(year, month, day);
    }

    /**
     * Parses a string value to a primitive data object (used in readXML() method of RootObject).
     * @static
     * @param {string | undefined} value The plain string of format 'YYYY-MM-DD' to be parsed to a primitive data object.
     * @returns {DatePIO | undefined} An instance of DatePIO if successful, otherwise undefined.
     * @throws {TypeError} Throws an error if the string contains time information.
     */
    public static parseFromString(value: string | undefined): DatePIO | undefined {
        if (value) {
            const dateTimeObject = parseStringToDateObject(value) as DateTimePIOInterface;
            if (dateTimeObject.hour === undefined)
                return new DatePIO(dateTimeObject.year, dateTimeObject.month, dateTimeObject.day);
            else throw new TypeError("String contains time information and cannot be converted to DatePIO");
        } else {
            return undefined;
        }
    }

    /**
     * Returns the attribute '_value' as a string (used in toXML() method of RootObject).
     * @returns {string} The data stored under attribute '_value' as a string (in the format 'YYYY-MM-DD').
     */
    toString(): string {
        return buildDateTimeString("date", this._value.year, this._value.month, this._value.day);
    }

    /**
     * Returns its '_value' attribute.
     * @returns {DatePIOInterface} The '_value' attribute of the primitive data object.
     */
    get(): DatePIOInterface {
        return this._value;
    }

    /**
     * Sets its '_value' attribute and validates the date.
     * @param {DatePIOInterface} dateObject The argument to be set as the new '_value' attribute.
     */
    set(dateObject: DatePIOInterface): void {
        this._value = {
            year: dateObject.year,
            month: dateObject.month,
            day: dateObject.day,
        };

        validateDateTime(dateObject.year, dateObject.month, dateObject.day);
    }

    /**
     * Returns the name of the primitive data type.
     * @returns {string} The name of the primitive data type.
     */
    public getName(): string {
        return "DatePIO";
    }
}

/**
 * Represents the primitive FHIR data type 'boolean'.
 * @class
 */
class BooleanPIO implements StaticImplements<StaticPrimitiveData, typeof BooleanPIO> {
    /**
     * Stores the actual primitive data.
     * @type {boolean}
     * @private
     */
    _value: boolean;

    /**
     * Constructs a new BooleanPIO instance.
     * @param {boolean} value The boolean value to store in this instance.
     */
    constructor(value: boolean) {
        this._value = value;
    }

    /**
     * Parses a string into a BooleanPIO instance.
     * Used in the readXML() method of RootObject.
     * @static
     * @param {string | undefined} value The plain string to parse into a primitive data object.
     * @returns {BooleanPIO | undefined} An instance of BooleanPIO or undefined if parsing fails.
     * @throws {TypeError} Throws an error if the argument 'value' does not represent a boolean value.
     */
    public static parseFromString(value: string | undefined): BooleanPIO | undefined {
        if (value) {
            const temp_bool: string = value.toLowerCase();
            if (temp_bool === "true" || temp_bool === "false") {
                return new BooleanPIO(temp_bool === "true");
            } else {
                throw new TypeError("String cannot be converted to boolean");
            }
        } else {
            return undefined;
        }
    }

    /**
     * Returns the attribute '_value' as a capitalized string.
     * Used in the toXML() method of RootObject.
     * @returns {string} The data stored under the attribute '_value' as a capitalized string.
     */
    toString(): string {
        return this._value.toString();
    }

    /**
     * Returns the '_value' attribute.
     * @returns {boolean} The '_value' attribute of the primitive data object.
     */
    get(): boolean {
        return this._value;
    }

    /**
     * Sets the '_value' attribute.
     * @param {boolean} value The new value to set as the '_value' attribute.
     */
    set(value: boolean): void {
        this._value = value;
    }

    /**
     * Returns the name of the primitive data type.
     * @returns {string} The name of the primitive data type.
     */
    public getName(): string {
        return "BooleanPIO";
    }
}

/**
 * Represents the primitive FHIR data type 'integer'.
 * @class
 */
class IntegerPIO implements StaticImplements<StaticPrimitiveData, typeof IntegerPIO> {
    /**
     * Stores the actual primitive data.
     * @type {number}
     * @private
     */
    _value: number;

    /**
     * Constructs an instance of IntegerPIO.
     * Cuts off any decimal part from the provided value.
     * @param {number} value The initial value for the integer.
     */
    constructor(value: number) {
        this._value = Math.trunc(value);
    }

    /**
     * Parses a string value into an IntegerPIO object.
     * Used in the readXML() method of RootObject.
     * @static
     * @param {string | undefined} value The input string to parse.
     * @returns {IntegerPIO | undefined} An instance of IntegerPIO, or undefined if parsing fails.
     * @throws {TypeError} If the value appears to be a decimal number.
     */
    static parseFromString(value: string | undefined): IntegerPIO | undefined {
        if (value) {
            if (value.includes(".") || value.includes(",")) {
                throw new TypeError("String seems to be a decimal number, but integer was expected");
            } else {
                return new IntegerPIO(parseInt(value));
            }
        } else {
            return undefined;
        }
    }

    /**
     * Returns the integer value as a string.
     * Used in the toXML() method of RootObject.
     * @returns {string} The integer value as a string.
     */
    toString(): string {
        return this._value.toString();
    }

    /**
     * Returns the integer value.
     * @returns {number} The integer value.
     */
    get(): number {
        return this._value;
    }

    /**
     * Sets a new value for the IntegerPIO instance.
     * Cuts off any decimal part from the provided value.
     * @param {number} value The new value for the IntegerPIO.
     */
    set(value: number): void {
        this._value = Math.trunc(value);
    }

    /**
     * Returns the name of the primitive data type.
     * @returns {string} The name of the primitive data type.
     */
    public getName(): string {
        return "IntegerPIO";
    }
}

/**
 * Represents the primitive FHIR data type 'decimal'.
 * @class
 */
class DecimalPIO implements StaticImplements<StaticPrimitiveData, typeof DecimalPIO> {
    /**
     * Stores the actual primitive data.
     * @type {number}
     * @private
     */
    _value: number;

    /**
     * Creates an instance of DecimalPIO.
     * @param {number} value The initial value of the decimal.
     */
    constructor(value: number) {
        this._value = value;
    }

    /**
     * Parses a string value into a DecimalPIO object (used in readXML() method of RootObject).
     * @static
     * @param {string | undefined} value The input string to parse.
     * @returns {DecimalPIO | undefined} An instance of DecimalPIO, or undefined if parsing fails.
     */
    static parseFromString(value: string | undefined): DecimalPIO | undefined {
        return value ? new DecimalPIO(parseFloat(value)) : undefined;
    }

    /**
     * Returns the attribute '_value' as string (used in toXML() method of RootObject).
     * @returns {string} The data stored under attribute '_value' as a string.
     */
    toString(): string {
        return this._value.toString();
    }

    /**
     * Gets the current value of the decimal.
     * @returns {number} The current value.
     */
    get(): number {
        return this._value;
    }

    /**
     * Sets a new value for the decimal.
     * @param {number} value The new value to set.
     */
    set(value: number): void {
        this._value = value;
    }

    /**
     * Returns the name of the primitive data type.
     * @returns {string} The name of the primitive data type.
     */
    public getName(): string {
        return "DecimalPIO";
    }
}

/**
 * Represents the primitive FHIR data type 'unsignedInteger'.
 * @class
 */
class UnsignedIntegerPIO implements StaticImplements<StaticPrimitiveData, typeof UnsignedIntegerPIO> {
    /**
     * Stores the actual primitive data.
     * @type {number}
     * @private
     */
    _value: number;

    /**
     * Constructs an UnsignedIntegerPIO instance.
     * @param {number} value The initial value for the unsigned integer.
     */
    constructor(value: number) {
        this._value = UnsignedIntegerPIO.checkValue(Math.trunc(value));
    }

    /**
     * Checks whether a value is an unsigned integer.
     * @static
     * @param {number} value Value for validation.
     * @returns {number} The input value, if validation succeeded.
     * @throws {TypeError} Throws an error if validation fails.
     */
    static checkValue(value: number): number {
        if (value < 0) {
            throw new TypeError("UnsignedInteger value is negative");
        } else {
            return value;
        }
    }

    /**
     * Parses a string to a primitive data object (used in readXML() method of RootObject).
     * @static
     * @param {string | undefined} value Plain string to be parsed to a primitive data object.
     * @returns {UnsignedIntegerPIO | undefined} An instance of UnsignedIntegerPIO, or undefined if input is invalid.
     * @throws {TypeError} Throws an error if the argument 'value' seems to be a decimal number.
     */
    static parseFromString(value: string | undefined): UnsignedIntegerPIO | undefined {
        if (value) {
            if (value.includes(".") || value.includes(",")) {
                throw new TypeError("String seems to be a decimal number, but integer was expected");
            } else {
                return new UnsignedIntegerPIO(parseInt(value));
            }
        } else {
            return undefined;
        }
    }

    /**
     * Returns the attribute '_value' as string (used in toXML() method of RootObject).
     * @returns {string} Data stored under attribute '_value' as string.
     */
    toString(): string {
        return this._value.toString();
    }

    /**
     * Gets the '_value' attribute.
     * @returns {number} The '_value' attribute of the primitive data object.
     */
    get(): number {
        return this._value;
    }

    /**
     * Sets the '_value' attribute and removes digits after the decimal point.
     * @param {number} value The new value for the '_value' attribute.
     */
    set(value: number): void {
        this._value = UnsignedIntegerPIO.checkValue(Math.trunc(value));
    }

    /**
     * Returns the name of the primitive data type.
     * @returns {string} The name of the primitive data type.
     */
    public getName(): string {
        return "UnsignedIntegerPIO";
    }
}

/**
 * Represents the primitive FHIR data type 'markdown'.
 * Markdown is a string that may contain GitHub Flavored Markdown
 * syntax for optional processing by a markdown presentation engine.
 * @class
 */
class MarkdownPIO implements StaticImplements<StaticPrimitiveData, typeof MarkdownPIO> {
    /**
     * Stores the actual primitive data.
     * @type {string}
     * @private
     */
    _value: string;

    /**
     * Creates an instance of MarkdownPIO.
     * @param {string} value The value to be stored in the MarkdownPIO instance.
     */
    constructor(value: string) {
        this._value = value;
    }

    /**
     * Parses a string value into an instance of MarkdownPIO.
     * This method is used in the 'readXML' method of RootObject.
     * @param {string | undefined} value The plain string to be parsed into a MarkdownPIO object.
     * @returns {MarkdownPIO | undefined} An instance of MarkdownPIO or undefined if parsing fails.
     */
    public static parseFromString(value: string | undefined): MarkdownPIO | undefined {
        return value ? new MarkdownPIO(value) : undefined;
    }

    /**
     * Returns the attribute '_value' as a string.
     * This method is used in the 'toXML' method of RootObject.
     * @returns {string} The data stored under the attribute '_value' as a string.
     */
    public toString(): string {
        return this._value;
    }

    /**
     * Gets the value stored in the instance.
     * @returns {string} The value stored in the instance.
     */
    public get(): string {
        return this._value;
    }

    /**
     * Sets a new value for the instance.
     * @param {string} value The new value to be set.
     */
    public set(value: string): void {
        this._value = value;
    }

    /**
     * Returns the name of the primitive data type.
     * @returns {string} The name of the primitive data type.
     */
    public getName(): string {
        return "MarkdownPIO";
    }
}

// ---------------   EXPORTS   ---------------
export {
    StringPIO,
    CodePIO,
    UriPIO,
    UuidPIO,
    BinaryPIO,
    DateTimePIO,
    DatePIO,
    BooleanPIO,
    IntegerPIO,
    DecimalPIO,
    UnsignedIntegerPIO,
    MarkdownPIO,
};
