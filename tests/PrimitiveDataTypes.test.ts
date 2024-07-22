// ---------------   IMPORTS   ---------------
import { validate } from "uuid";

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
} from "../src";

// eslint-disable sonarjs/no-duplicate-string

// ---------------   TESTS   ---------------
// Tests for class 'StringPIO'
describe("Tests for class StringPIO", (): void => {
    const strPIO: StringPIO = new StringPIO("Hello");

    describe("Test toString() method", (): void => {
        it("should return 'Hello' as a string", (): void => {
            expect(strPIO.toString()).toEqual("Hello");
        });
    });

    describe("Test getName() method", (): void => {
        it("should return 'StringPIO' as a string", (): void => {
            expect(strPIO.getName()).toEqual("StringPIO");
        });
    });

    describe("Test parseFromString() method", (): void => {
        it("should return 'Hellooo' as a string", (): void => {
            const strPIO: StringPIO = StringPIO.parseFromString("Hellooo") as StringPIO;
            expect(strPIO.toString()).toEqual("Hellooo");
        });
    });

    describe("Test get() method", (): void => {
        it("should return 'Hello' as a string", (): void => {
            expect(strPIO.get()).toEqual("Hello");
        });
    });

    describe("Test set() method", (): void => {
        it("should return the value which has been set before", (): void => {
            strPIO.set("Bye");
            expect(strPIO.get()).toEqual("Bye");
        });
    });
});

// Tests for class 'CodePIO'
describe("Tests for class CodePIO", (): void => {
    const codePIO: CodePIO = new CodePIO("male");

    describe("Test toString() method", (): void => {
        it("should return 'male' as a string", (): void => {
            expect(codePIO.toString()).toEqual("male");
        });
    });

    describe("Test getName() method", (): void => {
        it("should return 'CodePIO' as a string", (): void => {
            expect(codePIO.getName()).toEqual("CodePIO");
        });
    });

    describe("Test parseFromString() method", (): void => {
        it("should return 'female' as a string", (): void => {
            const codePIO: CodePIO = CodePIO.parseFromString("female") as CodePIO;
            expect(codePIO.toString()).toEqual("female");
        });
    });

    describe("Test get() method", (): void => {
        it("should return 'male' as a string", (): void => {
            expect(codePIO.get()).toEqual("male");
        });
    });

    describe("Test set() method", (): void => {
        it("should return the value which has been set before", (): void => {
            codePIO.set("male");
            expect(codePIO.get()).toEqual("male");
        });
    });

    describe("Test trim-function (removes whitespaces from both ends of the code)", (): void => {
        it("should return the value which has been set before, but without whitespaces", (): void => {
            codePIO.set(" unknown  ");
            expect(codePIO.get()).toEqual("unknown");
        });
    });
});

// Tests for class 'UriPIO'
describe("Tests for class UrlPIO", (): void => {
    const urlPIO: UriPIO = new UriPIO("https://fhir.kbv.de");

    describe("Test toString() method", (): void => {
        it("should return url as a string", (): void => {
            expect(urlPIO.toString()).toEqual("https://fhir.kbv.de");
        });
    });

    describe("Test getName() method", (): void => {
        it("should return 'UriPIO' as a string", (): void => {
            expect(urlPIO.getName()).toEqual("UriPIO");
        });
    });

    describe("Test parseFromString() method", (): void => {
        it("should return 'https://mio.de' as a string", (): void => {
            const urlPIO: UriPIO = UriPIO.parseFromString("https://mio.de") as UriPIO;
            expect(urlPIO.toString()).toEqual("https://mio.de");
        });
    });

    describe("Test get() method", (): void => {
        it("should return the url as a string which has been set before", (): void => {
            expect(urlPIO.get()).toEqual("https://fhir.kbv.de");
        });
    });

    describe("Test set() method", (): void => {
        it("should return the value which has been set before", (): void => {
            urlPIO.set("https://careregio-tp3.atlassian.net/");
            expect(urlPIO.get()).toEqual("https://careregio-tp3.atlassian.net/");
        });
    });
});

// Tests for class 'UuidPIO'
describe("Tests for class UuidPIO", (): void => {
    const uuidPIO: UuidPIO = new UuidPIO("22166350-40ae-48b6-abfc-deeaf5372960");

    describe("Test toString() method", (): void => {
        it("should return uuid as a string", (): void => {
            expect(uuidPIO.toString()).toEqual("urn:uuid:22166350-40ae-48b6-abfc-deeaf5372960");
        });
    });

    describe("Test getName() method", (): void => {
        it("should return 'UuidPIO' as a string", (): void => {
            expect(uuidPIO.getName()).toEqual("UuidPIO");
        });
    });

    describe("Test parseFromString() method", (): void => {
        it("should return a valid uuid as a string", (): void => {
            const uuidPIO: UuidPIO = UuidPIO.parseFromString(
                "urn:uuid:aa3bb5c3-083a-48a8-9df9-aae5cb1931d3"
            ) as UuidPIO;
            expect(uuidPIO.toString()).toEqual("urn:uuid:aa3bb5c3-083a-48a8-9df9-aae5cb1931d3");
        });
        it("should throw an error because uuid is not valid", (): void => {
            expect(() => UuidPIO.parseFromString("aa3bb2c3-183a-48a8-8df9")).toThrow();
        });
    });

    describe("Test get() method", (): void => {
        it("should return the uuid as a string which was set in constructor", (): void => {
            expect(uuidPIO.get()).toEqual("22166350-40ae-48b6-abfc-deeaf5372960");
        });
    });

    describe("Test set() method", (): void => {
        it("should return the value which has been set before", (): void => {
            uuidPIO.set("9c55150f-4230-479d-a5d9-c66196babbcd");
            expect(uuidPIO.get()).toEqual("9c55150f-4230-479d-a5d9-c66196babbcd");
        });
    });

    describe("Test static method generateUuid()", (): void => {
        it("should return a valid uuid", (): void => {
            const new_uuid: string = UuidPIO.generateUuid();
            expect(validate(new_uuid)).toEqual(true);
        });
    });
});

// Tests for class 'BinaryPIO'
describe("Tests for class BinaryPIO", (): void => {
    const base64expression: string = "VGVzdCBCYXNlNjQgc3RyaW5n",
        base64expression_2: string = "VGVzdCBCYXNlNjQgc3RyaW5n",
        binaryPIO: BinaryPIO = new BinaryPIO(base64expression);
    describe("Test toString() method", (): void => {
        it("should return binary data as a string", (): void => {
            expect(binaryPIO.toString()).toEqual(base64expression);
        });
    });

    describe("Test getName() method", (): void => {
        it("should return 'BinaryPIO' as a string", (): void => {
            expect(binaryPIO.getName()).toEqual("BinaryPIO");
        });
    });

    describe("Test parseFromString() method", (): void => {
        it("should return a valid binaryBase64 as a string", (): void => {
            const binaryPIO: BinaryPIO = BinaryPIO.parseFromString(base64expression_2) as BinaryPIO;
            expect(binaryPIO.toString()).toEqual(base64expression_2);
        });
        it("should throw an error because binaryBase64 is not valid", (): void => {
            expect(() => BinaryPIO.parseFromString(base64expression + "=")).toThrow();
        });
    });

    describe("Test get() method", (): void => {
        it("should return the value (base64) as a string which was set in constructor", (): void => {
            expect(binaryPIO.get()).toEqual(base64expression);
        });
    });

    describe("Test set() method", (): void => {
        it("should return the value which has been set before", (): void => {
            binaryPIO.set(base64expression);
            expect(binaryPIO.get()).toEqual(base64expression);
        });
    });
});

// Tests for class 'DateTimePIO'
describe("Tests for class DateTimePIO", (): void => {
    const dateTimePIO: DateTimePIO = new DateTimePIO(2022, 6, 21, 7, 32, 42);

    describe("Test get() method", (): void => {
        it("should return an object", (): void => {
            expect(dateTimePIO.get() instanceof Object).toEqual(true);
        });
        it("should return the date as an object with values which were set in the constructor", (): void => {
            expect(dateTimePIO.get()["year"]).toEqual(2022);
            expect(dateTimePIO.get()["month"]).toEqual(6);
            expect(dateTimePIO.get()["day"]).toEqual(21);
            expect(dateTimePIO.get()["hour"]).toEqual(7);
            expect(dateTimePIO.get()["minute"]).toEqual(32);
            expect(dateTimePIO.get()["second"]).toEqual(42);
        });
    });

    describe("Test getName() method", (): void => {
        it("should return 'DateTimePIO' as a string", (): void => {
            expect(dateTimePIO.getName()).toEqual("DateTimePIO");
        });
    });

    describe("Test set() method and toString() method", (): void => {
        it("should return the value which has been set before", (): void => {
            dateTimePIO.set({ year: 1976, month: 12, day: 1, hour: 12, minute: 8, second: 39 });
            expect(dateTimePIO.toString()).toEqual("1976-12-01T12:08:39Z");
        });
        it("should throw an error due to wrong sec value", (): void => {
            expect(() =>
                dateTimePIO.set({
                    year: 1976,
                    month: 12,
                    day: 1,
                    hour: 12,
                    minute: 8,
                    second: -4,
                })
            ).toThrow("Validation of the time failed");
        });
    });

    describe("Test parseFromString() method", (): void => {
        it("should return a valid dateTime string", (): void => {
            const dateTimePIO: DateTimePIO = DateTimePIO.parseFromString("2022-03-12T12:56:01") as DateTimePIO;
            expect(dateTimePIO.toString()).toEqual("2022-03-12T12:56:01Z");
        });
        it("should throw an error because string is not a valid dateTime", (): void => {
            expect(() => DateTimePIO.parseFromString("2022-06-")).toThrow();
            expect(() => DateTimePIO.parseFromString("2022-06-54")).toThrow();
            expect(() => DateTimePIO.parseFromString("2022-06-28T13:56:")).toThrow();
        });
        it("should return undefined because try to parse undefined", (): void => {
            expect(DateTimePIO.parseFromString(undefined)).toEqual(undefined);
        });
    });
});

// Tests for class 'DatePIO'
describe("Tests for class DatePIO", (): void => {
    const datePIO: DatePIO = new DatePIO(2022, 6, 21);

    describe("Test get() method", (): void => {
        it("should return an object object", (): void => {
            expect(datePIO.get() instanceof Object).toEqual(true);
        });
        it("should return the date as an object with values which were set in the constructor", (): void => {
            expect(datePIO.get()["year"]).toEqual(2022);
            expect(datePIO.get()["month"]).toEqual(6);
            expect(datePIO.get()["day"]).toEqual(21);
        });
    });

    describe("Test getName() method", (): void => {
        it("should return 'DatePIO' as a string", (): void => {
            expect(datePIO.getName()).toEqual("DatePIO");
        });
    });

    describe("Test set() method and toString() method", (): void => {
        it("should return the value which has been set before", (): void => {
            datePIO.set({ year: 2007, month: 12, day: 1 });
            expect(datePIO.toString()).toEqual("2007-12-01");
        });
        it("should throw an error due to wrong month value", (): void => {
            expect(() =>
                datePIO.set({
                    year: 1965,
                    month: 11.2,
                    day: 14,
                })
            ).toThrow("Validation of the date failed");
        });
    });

    describe("Test parseFromString() method", (): void => {
        it("should return a valid dateTime string", (): void => {
            const datePIO: DatePIO = DatePIO.parseFromString("2022-03-12") as DatePIO;
            expect(datePIO.toString()).toEqual("2022-03-12");
        });
        it("should throw an error because string does contain time information", (): void => {
            expect(() => DatePIO.parseFromString("2022-06-07T12:45:13")).toThrow();
        });
        it("should throw an error because string is not a valid date", (): void => {
            expect(() => DatePIO.parseFromString("2022-06-")).toThrow();
        });
        it("should return undefined because try to parse undefined", (): void => {
            expect(DatePIO.parseFromString(undefined)).toEqual(undefined);
        });
    });
});

// Tests for class 'BooleanPIO'
describe("Tests for class BooleanPIO", (): void => {
    const booleanPIO: BooleanPIO = new BooleanPIO(true);

    describe("Test toString() method", (): void => {
        it("should return 'True' as a string", (): void => {
            expect(booleanPIO.toString()).toEqual("true");
        });
        it("should return 'False' as a string", (): void => {
            expect(new BooleanPIO(false).toString()).toEqual("false");
        });
    });

    describe("Test getName() method", (): void => {
        it("should return 'BooleanPIO' as a string", (): void => {
            expect(booleanPIO.getName()).toEqual("BooleanPIO");
        });
    });

    describe("Test parseFromString() method", (): void => {
        it("should return 'false' as a string", (): void => {
            // eslint-disable-next-line sonarjs/no-duplicate-string
            const booleanPIO: BooleanPIO = BooleanPIO.parseFromString("false") as BooleanPIO;
            expect(booleanPIO.toString()).toEqual("false");
        });
        it("should return undefined because try to parse undefined", (): void => {
            expect(BooleanPIO.parseFromString(undefined)).toEqual(undefined);
        });
        it("should throw an error because string is not 'true' or 'false'", (): void => {
            expect(() => BooleanPIO.parseFromString("truee")).toThrow();
        });
    });

    describe("Test set() method", (): void => {
        it("should return the value which has been set before", (): void => {
            booleanPIO.set(true);
            expect(booleanPIO.get()).toEqual(true);
        });
    });
});

// Tests for class 'IntegerPIO'
describe("Tests for class IntegerPIO", (): void => {
    const integerPIO_1: IntegerPIO = new IntegerPIO(7),
        integerPIO_2: IntegerPIO = new IntegerPIO(7.3),
        integerPIO_3: IntegerPIO = new IntegerPIO(6.5);
    describe("Test toString() method", (): void => {
        it("should return 7 as a string", (): void => {
            expect(integerPIO_1.toString()).toEqual("7");
        });
    });

    describe("Test getName() method", (): void => {
        it("should return 'IntegerPIO' as a string", (): void => {
            expect(integerPIO_1.getName()).toEqual("IntegerPIO");
        });
    });

    describe("Test get() method", (): void => {
        it("should return 7 which was set in the constructor", (): void => {
            expect(integerPIO_1.get()).toEqual(7);
        });
        it("should return 7 because 7.3 will be rounded to 7", (): void => {
            expect(integerPIO_2.get()).toEqual(7);
        });
        it("should return 7 because 6.5 will be rounded to 7", (): void => {
            expect(integerPIO_3.get()).toEqual(6);
        });
    });

    describe("Test set() method", (): void => {
        it("should return the value which has been set before but rounded", (): void => {
            integerPIO_1.set(-2);
            integerPIO_2.set(-2.3);
            integerPIO_3.set(-1.7);
            expect(integerPIO_1.get()).toEqual(-2);
            expect(integerPIO_2.get()).toEqual(-2);
            expect(integerPIO_3.get()).toEqual(-1);
        });
    });

    describe("Test parseFromString() method", (): void => {
        it("should return the parsed value", (): void => {
            const integerPIO_1: IntegerPIO = IntegerPIO.parseFromString("23") as IntegerPIO;
            expect(integerPIO_1.get()).toEqual(23);
            const integerPIO_2: IntegerPIO = IntegerPIO.parseFromString("-27844") as IntegerPIO;
            expect(integerPIO_2.get()).toEqual(-27844);
        });
        it("should throw an error because a decimal number is stated", (): void => {
            expect(() => IntegerPIO.parseFromString("12.4")).toThrow();
        });
        it("should return undefined because try to parse undefined", (): void => {
            expect(IntegerPIO.parseFromString(undefined)).toEqual(undefined);
        });
    });
});

// Tests for class 'DecimalPIO'
describe("Tests for class DecimalPIO", (): void => {
    const decimalPIO: DecimalPIO = new DecimalPIO(5.67);

    describe("Test toString() method", (): void => {
        it("should return 5.67 as a string", (): void => {
            expect(decimalPIO.toString()).toEqual("5.67");
        });
    });

    describe("Test getName() method", (): void => {
        it("should return 'DecimalPIO' as a string", (): void => {
            expect(decimalPIO.getName()).toEqual("DecimalPIO");
        });
    });

    describe("Test parseFromString() method", (): void => {
        it("should return the parsed value", (): void => {
            const decimalPIO: DecimalPIO = DecimalPIO.parseFromString("-24.846") as DecimalPIO;
            expect(decimalPIO.toString()).toEqual("-24.846");
        });
    });

    describe("Test set() method", (): void => {
        it("should return the value which has been set before", (): void => {
            decimalPIO.set(-3.903);
            expect(decimalPIO.get()).toEqual(-3.903);
        });
    });
});

// Tests for class 'UnsignedIntegerPIO'
describe("Tests for class UnsignedIntegerPIO", (): void => {
    const uIntPIO: UnsignedIntegerPIO = new UnsignedIntegerPIO(10.88);

    describe("Test toString() method", (): void => {
        it("should return 10 as a string", (): void => {
            expect(uIntPIO.toString()).toEqual("10");
        });
    });

    describe("Test getName() method", (): void => {
        it("should return 'UnsignedIntegerPIO' as a string", (): void => {
            expect(uIntPIO.getName()).toEqual("UnsignedIntegerPIO");
        });
    });

    describe("Test get() method", (): void => {
        it("should return the integer value 10 because 10.42 got rounded to 10", (): void => {
            expect(uIntPIO.get()).toEqual(10);
        });
    });

    describe("Test set() method", (): void => {
        it("should return the value which has been set before", (): void => {
            uIntPIO.set(3);
            expect(uIntPIO.get()).toEqual(3);
        });
    });

    describe("Test private checkValue() method by assigning a negative value", (): void => {
        it("should throw a TypeError because negative values are not valid", (): void => {
            expect(() => uIntPIO.set(-1)).toThrow("UnsignedInteger value is negative");
        });
    });

    describe("Test parseFromString() method", (): void => {
        it("should return the parsed value", (): void => {
            const uIntPIO: UnsignedIntegerPIO = UnsignedIntegerPIO.parseFromString("2334") as UnsignedIntegerPIO;
            expect(uIntPIO.get()).toEqual(2334);
        });
        it("should throw an error because a decimal number is stated", (): void => {
            expect(() => UnsignedIntegerPIO.parseFromString("12.4")).toThrow();
        });
        it("should return undefined because try to parse undefined", (): void => {
            expect(UnsignedIntegerPIO.parseFromString(undefined)).toEqual(undefined);
        });
    });
});

// Tests for class 'MarkdownPIO'
describe("Tests for class MarkdownPIO", (): void => {
    const markPIO: MarkdownPIO = new MarkdownPIO("Annotation text");

    describe("Test toString() method", (): void => {
        it("should return 'Annotation text' as a string", (): void => {
            expect(markPIO.toString()).toEqual("Annotation text");
        });
    });

    describe("Test getName() method", (): void => {
        it("should return 'MarkdownPIO' as a string", (): void => {
            expect(markPIO.getName()).toEqual("MarkdownPIO");
        });
    });

    describe("Test parseFromString() method", (): void => {
        it("should return 'Annotation text' as a string", (): void => {
            const markPIO_1: MarkdownPIO = MarkdownPIO.parseFromString("Annotation text") as MarkdownPIO;
            expect(markPIO_1.toString()).toEqual("Annotation text");
        });
    });

    describe("Test get() method", (): void => {
        it("should return 'Annotation text' as a string", (): void => {
            expect(markPIO.get()).toEqual("Annotation text");
        });
    });

    describe("Test set() method", (): void => {
        it("should return the value which has been set before", (): void => {
            markPIO.set("Another text");
            expect(markPIO.get()).toEqual("Another text");
        });
    });
});
