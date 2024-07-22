import {
    CodePIO,
    EntryType,
    RootObjectType,
    SubTree,
    UuidPIO,
    addInformationAboutPrimitiveDataTypes,
    transformToSubTree,
} from "../src";
import { DatePIOInterface, DateTimePIOInterface } from "../src/@types/DataTypesInterfaces";
import {
    buildDateTimeString,
    capitalize,
    dateTimeIntegerToString,
    isPrimitiveDataType,
    parseStringToDateObject,
    validateDateTime,
} from "../src/Helper";
import { StringPIO, UriPIO } from "../src/PrimitiveDataTypes";

//Function capitalize()
describe("Tests for function capitalize()", () => {
    it("should capitalize the first letter in string", () => {
        expect(capitalize("true")).toEqual("True");
    });
});

//Function isPrimitiveDataType()
describe("Tests for function isPrimitiveDataType()", () => {
    const entryType: RootObjectType = {
        text: {
            __value: new StringPIO("Peter Schneider"),
        },
        family: {
            __value: new StringPIO("Schneider"),
            extension: [
                {
                    __value: new UriPIO("http://hl7.org/fhir/StructureDefinition/humanname-own-name"),
                    valueString: {
                        __value: new StringPIO("Schneider"),
                    },
                },
            ],
        },
        given: {
            __value: new StringPIO("Peter"),
        },
    } as unknown as RootObjectType;

    it("should return false because passed data is not a primitive data type", () => {
        expect(isPrimitiveDataType(entryType)).toEqual(false);
        expect(isPrimitiveDataType(entryType["family"])).toEqual(false);
        expect(isPrimitiveDataType(entryType["given"])).toEqual(false);
    });

    it("should return true because primitive data is passed.", () => {
        expect(isPrimitiveDataType(entryType["text"]["__value"])).toEqual(true);
        expect(isPrimitiveDataType(entryType["given"]["__value"])).toEqual(true);
        expect(isPrimitiveDataType(entryType["family"]["extension"][0]["__value"])).toEqual(true);
    });

    it("should return false because array is passed", () => {
        expect(isPrimitiveDataType(entryType["family"]["extension"])).toEqual(false);
    });
});

// function dateTimeIntegerToString
describe("Tests for function 'dateTimeIntegerToString'", () => {
    it("should return '00' as string", () => {
        expect(dateTimeIntegerToString(0)).toEqual("00");
    });
    it("should return '09' as string", () => {
        expect(dateTimeIntegerToString(9)).toEqual("09");
    });
    it("should return '10' as string", () => {
        expect(dateTimeIntegerToString(10)).toEqual("10");
    });
    it("should return '31' as string", () => {
        expect(dateTimeIntegerToString(31)).toEqual("31");
    });
});

// function buildDateTimeString
describe("Tests for function 'buildDateTimeString'", () => {
    describe("Tests for 'date' mode", () => {
        it("should return '2020-04-21' as string", () => {
            const result = buildDateTimeString("date", 2020, 4, 21);
            expect(result).toEqual("2020-04-21");
        });
        it("should return '1901-10-07' as string", () => {
            const result = buildDateTimeString("date", 1901, 10, 7);
            expect(result).toEqual("1901-10-07");
        });
        it("should return '2103-01-01' as string", () => {
            const result = buildDateTimeString("date", 2103, 1, 1, 3, 45, 21);
            expect(result).toEqual("2103-01-01");
        });
    });

    describe("Tests for 'date_time' mode", () => {
        it("should return '2020-04-21T00:00:00' as string", () => {
            const result = buildDateTimeString("date_time", 2020, 4, 21);
            expect(result).toEqual("2020-04-21T00:00:00");
        });
        it("should return '2020-04-21T07:00:00' as string", () => {
            const result = buildDateTimeString("date_time", 2020, 4, 21, 7);
            expect(result).toEqual("2020-04-21T07:00:00");
        });
        it("should return '2019-10-02T15:31:55' as string", () => {
            const result = buildDateTimeString("date_time", 2019, 10, 2, 15, 31, 55);
            expect(result).toEqual("2019-10-02T15:31:55");
        });
    });

    describe("Test for wrong mode", () => {
        it("should throw an error", () => {
            expect(() => buildDateTimeString("wrong_mode", 2020, 4, 21)).toThrow("Wrong mode stated");
        });
    });
});

// function validateDateTime
describe("Tests for function 'validateDateTime'", () => {
    describe("Tests for year", () => {
        it("shouldn't throw an error", () => {
            expect(() => validateDateTime(2020, 1, 1)).not.toThrow();
            expect(() => validateDateTime(1000, 1, 1)).not.toThrow();
        });
        it("should throw an error", () => {
            expect(() => validateDateTime(20, 1, 1)).toThrow("Validation of the date failed");
        });
    });
    describe("Tests for month and day", () => {
        it("shouldn't throw an error", () => {
            expect(() => validateDateTime(2020, 7, 31)).not.toThrow();
        });
        it("2000 is a leap year", () => {
            expect(() => validateDateTime(2000, 2, 29)).not.toThrow();
        });
        it("2001 is not a leap year", () => {
            expect(() => validateDateTime(2001, 2, 29)).toThrow("Validation of the date failed");
        });
        it("February has only 28/29 days", () => {
            expect(() => validateDateTime(2020, 2, 28)).not.toThrow();
            expect(() => validateDateTime(2020, 2, 31)).toThrow("Validation of the date failed");
        });
        it("June has only 30 days", () => {
            expect(() => validateDateTime(2020, 6, 30)).not.toThrow();
            expect(() => validateDateTime(2020, 6, 31)).toThrow("Validation of the date failed");
        });
        it("More the 12 months are not allowed", () => {
            expect(() => validateDateTime(2020, 12, 31)).not.toThrow();
            expect(() => validateDateTime(2020, 15, 31)).toThrow("Validation of the date failed");
        });
        it("0 is not a Month", () => {
            expect(() => validateDateTime(2020, 0, 31)).toThrow("Validation of the date failed");
        });
    });
    describe("Tests for time", () => {
        it("23:59:59 is a correct time", () => {
            expect(() => validateDateTime(2020, 12, 31, 23, 59, 59)).not.toThrow();
        });
        it("23:59:60 is not a correct time", () => {
            expect(() => validateDateTime(2020, 12, 31, 23, 59, 60)).toThrow("Validation of the time failed");
        });
        it("24:59:59 is not a correct time", () => {
            expect(() => validateDateTime(2020, 12, 31, 24, 59, 59)).toThrow("Validation of the time failed");
        });
        it("0:59:59 is a correct time", () => {
            expect(() => validateDateTime(2020, 12, 31, 0, 59, 59)).not.toThrow();
        });
    });
});

// function parseStringToDateObject
describe("Tests for function 'parseStringToDateObject'", () => {
    describe("Tests for a valid date string", () => {
        const dateTimeObject = parseStringToDateObject("2022-08-04") as DatePIOInterface;
        it("should return '2022' as number", () => {
            expect(dateTimeObject.year).toEqual(2022);
        });
        it("should return '8' as number", () => {
            expect(dateTimeObject.month).toEqual(8);
        });
        it("should return '4' as number", () => {
            expect(dateTimeObject.day).toEqual(4);
        });
    });

    describe("Tests for a valid dateTime string", () => {
        const dateTimeObject = parseStringToDateObject("1987-12-01T14:10:01") as DateTimePIOInterface;
        it("should return '1987' as number", () => {
            expect(dateTimeObject.year).toEqual(1987);
        });
        it("should return '12' as number", () => {
            expect(dateTimeObject.month).toEqual(12);
        });
        it("should return '1' as number", () => {
            expect(dateTimeObject.day).toEqual(1);
        });
        it("should return '14' as number", () => {
            expect(dateTimeObject.hour).toEqual(14);
        });
        it("should return '10' as number", () => {
            expect(dateTimeObject.minute).toEqual(10);
        });
        it("should return 1 as number", () => {
            expect(dateTimeObject.second).toEqual(1);
        });
    });

    describe("Tests for an invalid date and dateTime", () => {
        const errorMessage1 = "The string is not a valid date or dateTime string";
        const errorMessage2 = "Validation of the time failed";
        const errorMessage3 = "Validation of the date failed";
        it("wrong month value", () => {
            expect(() => parseStringToDateObject("2022.100.27")).toThrow(errorMessage1);
        });
        it("wrong separator 'X'", () => {
            expect(() => parseStringToDateObject("2022-10-27X10:12:34")).toThrow(errorMessage1);
        });
        it("wrong minute value", () => {
            expect(() => parseStringToDateObject("2022-10-27T10:90:34")).toThrow(errorMessage2);
        });
        it("wrong day value", () => {
            expect(() => parseStringToDateObject("2022-10-32T10:50:34")).toThrow(errorMessage3);
        });
        it("Check if time format with Z works", () => {
            expect(() => parseStringToDateObject("2022-10-30T10:50:34Z")).not.toThrow();
        });
        it("Check if time format with +01:00 works", () => {
            expect(() => parseStringToDateObject("2022-10-30")).not.toThrow();
        });
    });
});

describe("Test for function 'TransformToSubtree'", (): void => {
    const objectToTransform: object = {
        absolutePath: "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis",
        lastPathElement: "KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis",
        addedPaths: [],
        children: [
            {
                absolutePath:
                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.code",
                lastPathElement: "code",
                addedPaths: [],
                children: [
                    {
                        absolutePath:
                            "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.code.coding",
                        lastPathElement: "coding",
                        addedPaths: [],
                        children: [
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.code.coding.system",
                                lastPathElement: "system",
                                addedPaths: [],
                                data: "http://snomed.info/sct",
                                children: [],
                                dataType: "UriPIO",
                            },
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.code.coding.version",
                                lastPathElement: "version",
                                addedPaths: [],
                                data: "http://snomed.info/sct/900000000000207008/version/20220331",
                                children: [],
                                dataType: "StringPIO",
                            },
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.code.coding.code",
                                lastPathElement: "code",
                                addedPaths: [],
                                data: "1001000119102",
                                children: [],
                                dataType: "CodePIO",
                            },
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.code.coding.display",
                                lastPathElement: "display",
                                addedPaths: [],
                                data: "Pulmonary embolism with pulmonary infarction (disorder)",
                                children: [],
                                dataType: "StringPIO",
                            },
                        ],
                    },
                ],
            },
            {
                absolutePath:
                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.clinicalStatus",
                lastPathElement: "clinicalStatus",
                addedPaths: [],
                children: [
                    {
                        absolutePath:
                            "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.clinicalStatus.coding",
                        lastPathElement: "coding",
                        addedPaths: [],
                        children: [
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.clinicalStatus.coding.system",
                                lastPathElement: "system",
                                addedPaths: [],
                                data: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                                children: [],
                                dataType: "UriPIO",
                            },
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.clinicalStatus.coding.version",
                                lastPathElement: "version",
                                addedPaths: [],
                                data: "4.0.1",
                                children: [],
                                dataType: "StringPIO",
                            },
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.clinicalStatus.coding.code",
                                lastPathElement: "code",
                                addedPaths: [],
                                data: "relapse",
                                children: [],
                                dataType: "CodePIO",
                            },
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.clinicalStatus.coding.display",
                                lastPathElement: "display",
                                addedPaths: [],
                                data: "Relapse",
                                children: [],
                                dataType: "StringPIO",
                            },
                        ],
                    },
                ],
            },
            {
                absolutePath:
                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.verificationStatus",
                lastPathElement: "verificationStatus",
                addedPaths: [],
                children: [
                    {
                        absolutePath:
                            "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.verificationStatus.coding",
                        lastPathElement: "coding",
                        addedPaths: [],
                        children: [
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.verificationStatus.coding.system",
                                lastPathElement: "system",
                                addedPaths: [],
                                data: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                                children: [],
                                dataType: "UriPIO",
                            },
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.verificationStatus.coding.version",
                                lastPathElement: "version",
                                addedPaths: [],
                                data: "4.0.1",
                                children: [],
                                dataType: "StringPIO",
                            },
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.verificationStatus.coding.code",
                                lastPathElement: "code",
                                addedPaths: [],
                                data: "differential",
                                children: [],
                                dataType: "CodePIO",
                            },
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.verificationStatus.coding.display",
                                lastPathElement: "display",
                                addedPaths: [],
                                data: "Differential",
                                children: [],
                                dataType: "StringPIO",
                            },
                        ],
                    },
                ],
            },
            {
                absolutePath:
                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.subject",
                lastPathElement: "subject",
                addedPaths: [],
                children: [
                    {
                        absolutePath:
                            "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.subject.reference",
                        lastPathElement: "reference",
                        addedPaths: [],
                        data: "urn:uuid:5ab64eaa-fc7a-4032-9b41-8ee37c095235",
                        children: [],
                        dataType: "UuidPIO",
                    },
                ],
            },
        ],
    };

    const wrongObjectToTransform: object = {
        absolutePath: "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis",
        lastPathElement: "KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis",
        addedPaths: [],
        children: [
            {
                absolutePath:
                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.code",
                lastPathElement: "code",
                addedPaths: [],
                children: [
                    {
                        absolutePath:
                            "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.code.coding",
                        lastPathElement: "coding",
                        addedPaths: [],
                        children: [
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.code.coding.system",
                                lastPathElement: "system",
                                addedPaths: [],
                                data: "http://snomed.info/sct",
                                children: [],
                                dataType: "WrongPIO",
                            },
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.code.coding.version",
                                lastPathElement: "version",
                                addedPaths: [],
                                data: "http://snomed.info/sct/900000000000207008/version/20220331",
                                children: [],
                                dataType: "WrongPIO",
                            },
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.code.coding.code",
                                lastPathElement: "code",
                                addedPaths: [],
                                data: "1001000119102",
                                children: [],
                                dataType: "WrongPIO",
                            },
                            {
                                absolutePath:
                                    "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.code.coding.display",
                                lastPathElement: "display",
                                addedPaths: [],
                                data: "Pulmonary embolism with pulmonary infarction (disorder)",
                                children: [],
                                dataType: "WrongPIO",
                            },
                        ],
                    },
                ],
            },
        ],
    };

    it("should transform an object to a subtree so that the 'absolutPath' call works", (): void => {
        expect(transformToSubTree(objectToTransform).absolutePath).toEqual(
            "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis"
        );
    });

    it("should transform an object to a subtree so that the 'addedPaths' works", (): void => {
        expect(transformToSubTree(objectToTransform).addedPaths).toEqual([]);
    });

    it("should transform an object to a subtree so that the 'children' works", (): void => {
        expect(transformToSubTree(objectToTransform).getAllChildren()).toEqual([
            "code",
            "clinicalStatus",
            "verificationStatus",
            "subject",
        ]);
    });

    it("should throw an error because of wrong data type", (): void => {
        expect(() => transformToSubTree(wrongObjectToTransform)).toThrow(
            "Error transforming data: TypeError: Cannot read properties of undefined (reading 'parseFromString')"
        );
    });
});

describe("Test for function 'addInformationAboutPrimitiveDataTypes'", (): void => {
    const exampleEntryType: EntryType = {
        "6f3a87d6-20fd-432e-a069-035845b8db43": {
            KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis: {
                code: {
                    coding: {
                        system: { __value: new UriPIO("http://snomed.info/sct") },
                        version: {
                            __value: new StringPIO("http://snomed.info/sct/900000000000207008/version/20220331"),
                        },
                        code: { __value: new CodePIO("1001000119102") },
                        display: { __value: new StringPIO("Pulmonary embolism with pulmonary infarction (disorder)") },
                    },
                },
                subject: { reference: { __value: new UuidPIO("5ab64eaa-fc7a-4032-9b41-8ee37c095235") } },
            },
        },
    };

    const subTreeToAddInformation: SubTree = new SubTree(
        "6f3a87d6-20fd-432e-a069-035845b8db43.KBV_PR_MIO_ULB_Condition_Medical_Problem_Diagnosis.code",
        exampleEntryType
    );

    it("should be true", (): void => {
        expect(
            addInformationAboutPrimitiveDataTypes([subTreeToAddInformation])[0].children[0].children[0].dataType
        ).toEqual("UriPIO");
    });
});
