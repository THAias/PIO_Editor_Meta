import {
    BinaryPIO,
    BooleanPIO,
    CodePIO,
    DatePIO,
    DateTimePIO,
    DecimalPIO,
    IntegerPIO,
    MarkdownPIO,
    StringPIO,
    UnsignedIntegerPIO,
    UriPIO,
    UuidPIO,
} from "../PrimitiveDataTypes";

/** All primitive data types bundled in one type */
export type PrimitiveDataTypes =
    | StringPIO
    | CodePIO
    | UriPIO
    | UuidPIO
    | BinaryPIO
    | DateTimePIO
    | DatePIO
    | BooleanPIO
    | IntegerPIO
    | DecimalPIO
    | UnsignedIntegerPIO
    | MarkdownPIO;

/** Type for storing PIO data in the RootObject */
export type EntryType = { [key: string]: EntryType | EntryType[] } | PrimitiveDataTypes;

/** Type for the root of RootObject */
export type RootObjectType = { [key: string]: EntryType | EntryType[] };

export interface ISubTreeWithTypes {
    absolutePath: string;
    lastPathElement: string;
    addedPaths: string[];
    data?: PrimitiveDataTypes | string;
    dataType?: string; //Different to SubTree class
    children: ISubTreeWithTypes[];
}
