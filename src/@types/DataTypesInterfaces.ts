import { PrimitiveDataTypes } from "./Types";

export type StaticImplements<I extends new (...args: never[]) => PrimitiveData, C extends I> = InstanceType<C>;

/**
 * Holds all non-static methods of PrimitiveDataInterface
 * @interface
 */
export interface PrimitiveData {
    /**
     * Gets the current value of the PrimitiveData.
     * @returns {string | number | boolean | DatePIOInterface | DateTimePIOInterface} The current value.
     */
    get(): string | number | boolean | DatePIOInterface | DateTimePIOInterface;

    /**
     * Sets the value of the PrimitiveData.
     * @param {string | number | boolean | DatePIOInterface | DateTimePIOInterface} value The value to set.
     */
    set(value: string | number | boolean | DatePIOInterface | DateTimePIOInterface): void;

    /**
     * Converts the PrimitiveData to its string representation.
     * @returns {string} The string representation of the PrimitiveData.
     */
    toString(): string;
}

/**
 * Holds all static methods of PrimitiveDataInterface
 * @interface
 */
export interface StaticPrimitiveData {
    /**
     * Constructor for PrimitiveData
     * @param {...never} args Arguments for the constructor
     * @returns {PrimitiveData} An instance of PrimitiveData
     */
    new (...args: never[]): PrimitiveData;

    /**
     * Parses a string value into a PrimitiveDataTypes
     * @param {string | undefined} value The input string to parse
     * @returns {PrimitiveDataTypes | undefined} The parsed PrimitiveDataTypes or undefined if parsing fails
     */
    parseFromString(value: string | undefined): PrimitiveDataTypes | undefined;
}

/**
 * Interface for primitive data type DatePIO
 * @interface
 * @property {number} year The year value
 * @property {number} month The month value
 * @property {number} day The day value
 */
export interface DatePIOInterface {
    year: number;
    month: number;
    day: number;
}

/**
 * Interface for primitive data type DateTimePIO
 * @interface
 * @property {number} year The year value
 * @property {number} month The month value
 * @property {number} day The day value
 * @property {number} hour The hour value
 * @property {number} minute The minute value
 * @property {number} second The second value
 */
export interface DateTimePIOInterface {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
}
