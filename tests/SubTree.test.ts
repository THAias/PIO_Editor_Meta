import { EntryType } from "../src/@types/Types";
import { CodePIO, DatePIO, StringPIO, UriPIO } from "../src/PrimitiveDataTypes";
import { SubTree } from "../src/SubTree";

//Generate test EntryType
const exampleEntryType: EntryType = {
    "e029b2b8-5dc6-4feb-990a-7471fb9b54e3": {
        KBV_PR_MIO_ULB_Patient: {
            "@profile@": new StringPIO("https://fhir.kbv.de/StructureDefinition/KBV_PR_MIO_ULB_Patient"),
            name: [
                {
                    use: {
                        __value: new CodePIO("official"),
                    },
                    text: {
                        __value: new StringPIO("Dr. Alex Prinz Stackelberg"),
                    },
                    family: {
                        __value: new StringPIO("Prinz Stackelberg"),
                        extension: [
                            {
                                __url: new UriPIO("http://fhir.de/StructureDefinition/humanname-namenszusatz"),
                                valueString: {
                                    __value: new StringPIO("Prinz"),
                                },
                            },
                            {
                                __url: new UriPIO("http://hl7.org/fhir/StructureDefinition/humanname-own-name"),
                                valueString: {
                                    __value: new StringPIO("Stackelberg"),
                                },
                            },
                        ],
                    },
                    given: {
                        __value: new StringPIO("Alex"),
                    },
                    prefix: {
                        __value: new StringPIO("Dr."),
                        extension: [
                            {
                                __url: new UriPIO("http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier"),
                                valueCode: {
                                    __value: new CodePIO("AC"),
                                },
                            },
                        ],
                    },
                },
                {
                    use: {
                        __value: new CodePIO("maiden"),
                    },
                    text: {
                        __value: new StringPIO("Schneider"),
                    },
                    family: {
                        __value: new StringPIO("Schneider"),
                        extension: [
                            {
                                __url: new UriPIO("http://hl7.org/fhir/StructureDefinition/humanname-own-name"),
                                valueString: {
                                    __value: new StringPIO("Schneider"),
                                },
                            },
                        ],
                    },
                },
            ],
            gender: {
                __value: new CodePIO("male"),
            },
            communication: [
                {
                    language: {
                        coding: {
                            system: {
                                __value: new UriPIO("urn:ietf:bcp:47"),
                            },
                            version: {
                                __value: new StringPIO("4.0.1"),
                            },
                            code: {
                                __value: new CodePIO("de"),
                            },
                            display: {
                                __value: new StringPIO("German"),
                            },
                        },
                    },
                },
            ],
        },
    },
    "39f928a1-52f6-4563-8918-214cb3b2b55f": {
        KBV_PR_MIO_ULB_Organization: {
            name: {
                __value: new StringPIO("Universitätsklinikum Augsburg"),
            },
            telecom: [
                {
                    system: {
                        __value: new CodePIO("phone"),
                    },
                    value: {
                        __value: new StringPIO("0821-387456"),
                    },
                },
                {
                    system: {
                        __value: new CodePIO("email"),
                    },
                    value: {
                        __value: new StringPIO("uka@gmx.de"),
                    },
                },
            ],
        },
    },
    "2a73739e-7df1-4a61-a79d-8d95ae45a563": {
        KBV_PR_MIO_ULB_Organization: {},
    },
};

describe("Tests for class SubTree", (): void => {
    describe("Generate a SubTree out of an EntryType", (): void => {
        it("should generate a SubTree representing the gender property of the patient", (): void => {
            const subTree: SubTree = new SubTree(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.gender",
                exampleEntryType
            );
            expect(subTree.absolutePath).toEqual("e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.gender");
            expect(subTree.lastPathElement).toEqual("gender");
            expect(subTree.addedPaths).toEqual([] as string[]);
            expect(subTree.children).toEqual([] as SubTree[]);
            expect(subTree.data).toEqual({ _value: "male" } as CodePIO);
        });

        it("should generate a SubTree representing the organization resource", (): void => {
            const subTree: SubTree = new SubTree(
                "39f928a1-52f6-4563-8918-214cb3b2b55f.KBV_PR_MIO_ULB_Organization",
                exampleEntryType
            );
            expect(subTree.absolutePath).toEqual("39f928a1-52f6-4563-8918-214cb3b2b55f.KBV_PR_MIO_ULB_Organization");
            expect(subTree.lastPathElement).toEqual("KBV_PR_MIO_ULB_Organization");
            expect(subTree.addedPaths).toEqual([] as string[]);
            expect(subTree.data).toEqual(undefined);
            expect(subTree.children.length).toEqual(3);

            //Check all children of SubTree
            const nameSubTree: SubTree = subTree.children.find((child: SubTree): boolean => {
                return child.lastPathElement === "name";
            }) as SubTree;
            expect(nameSubTree.absolutePath).toEqual(
                "39f928a1-52f6-4563-8918-214cb3b2b55f.KBV_PR_MIO_ULB_Organization.name"
            );
            expect(nameSubTree.lastPathElement).toEqual("name");
            expect(nameSubTree.addedPaths).toEqual([] as string[]);
            expect(nameSubTree.children).toEqual([] as SubTree[]);
            expect(nameSubTree.data).toEqual({ _value: "Universitätsklinikum Augsburg" } as StringPIO);

            const telecom1SubTree: SubTree = subTree.children.find((child: SubTree): boolean => {
                return child.lastPathElement === "telecom[0]";
            }) as SubTree;
            expect(telecom1SubTree.absolutePath).toEqual(
                "39f928a1-52f6-4563-8918-214cb3b2b55f.KBV_PR_MIO_ULB_Organization.telecom[0]"
            );
            expect(telecom1SubTree.lastPathElement).toEqual("telecom[0]");
            expect(telecom1SubTree.addedPaths).toEqual([] as string[]);
            expect(telecom1SubTree.data).toEqual(undefined);
            expect(telecom1SubTree.children.length).toEqual(2);

            //Check sub SubTree of 'telecom[0]
            const telecom1SystemSubTree: SubTree = telecom1SubTree.children.find((child: SubTree): boolean => {
                return child.lastPathElement === "system";
            }) as SubTree;
            expect(telecom1SystemSubTree.absolutePath).toEqual(
                "39f928a1-52f6-4563-8918-214cb3b2b55f.KBV_PR_MIO_ULB_Organization.telecom[0].system"
            );
            expect(telecom1SystemSubTree.lastPathElement).toEqual("system");
            expect(telecom1SystemSubTree.addedPaths).toEqual([] as string[]);
            expect(telecom1SystemSubTree.children).toEqual([] as SubTree[]);
            expect(telecom1SystemSubTree.data).toEqual({ _value: "phone" } as CodePIO);

            const telecom1ValueSubTree: SubTree = telecom1SubTree.children.find((child: SubTree): boolean => {
                return child.lastPathElement === "value";
            }) as SubTree;
            expect(telecom1ValueSubTree.absolutePath).toEqual(
                "39f928a1-52f6-4563-8918-214cb3b2b55f.KBV_PR_MIO_ULB_Organization.telecom[0].value"
            );
            expect(telecom1ValueSubTree.lastPathElement).toEqual("value");
            expect(telecom1ValueSubTree.addedPaths).toEqual([] as string[]);
            expect(telecom1ValueSubTree.children).toEqual([] as SubTree[]);
            expect(telecom1ValueSubTree.data).toEqual({ _value: "0821-387456" } as StringPIO);
        });

        it("should generate a SubTree representing both names of the patient", (): void => {
            const subTree: SubTree = new SubTree(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name",
                exampleEntryType
            );
            expect(subTree.absolutePath).toEqual("e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name");
            expect(subTree.lastPathElement).toEqual("name");
            expect(subTree.addedPaths).toEqual([] as string[]);
            expect(subTree.data).toEqual(undefined);
            expect(subTree.children.length).toEqual(2);

            //Check all children of SubTree
            const name1SubTree: SubTree = subTree.children.find((child: SubTree): boolean => {
                return child.lastPathElement === "name[0]";
            }) as SubTree;
            expect(name1SubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name[0]"
            );
            expect(name1SubTree.lastPathElement).toEqual("name[0]");
            expect(name1SubTree.addedPaths).toEqual([] as string[]);
            expect(name1SubTree.data).toEqual(undefined);
            expect(name1SubTree.children.length).toEqual(5);

            const name2SubTree: SubTree = subTree.children.find((child: SubTree): boolean => {
                return child.lastPathElement === "name[1]";
            }) as SubTree;
            expect(name2SubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name[1]"
            );
            expect(name2SubTree.lastPathElement).toEqual("name[1]");
            expect(name2SubTree.addedPaths).toEqual([] as string[]);
            expect(name2SubTree.data).toEqual(undefined);
            expect(name2SubTree.children.length).toEqual(3);

            //Check 'use' property of patient's maiden name
            const useSubTree: SubTree = name2SubTree.children.find((child: SubTree): boolean => {
                return child.lastPathElement === "use";
            }) as SubTree;
            expect(useSubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name[1].use"
            );
            expect(useSubTree.lastPathElement).toEqual("use");
            expect(useSubTree.addedPaths).toEqual([] as string[]);
            expect(useSubTree.children).toEqual([] as SubTree[]);
            expect(useSubTree.data).toEqual({ _value: "maiden" } as CodePIO);

            //Check family name of patient
            const familySubTree: SubTree = name1SubTree.children.find((child: SubTree): boolean => {
                return child.lastPathElement === "family";
            }) as SubTree;
            expect(familySubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name[0].family"
            );
            expect(familySubTree.lastPathElement).toEqual("family");
            expect(familySubTree.addedPaths).toEqual([] as string[]);
            expect(familySubTree.children.length).toEqual(2);
            expect(familySubTree.data).toEqual({ _value: "Prinz Stackelberg" } as StringPIO);

            //Check family name extension "Prinz"
            const familyExtensionSubTree: SubTree = familySubTree.children.find((child: SubTree): boolean => {
                return child.lastPathElement === "extension[0]";
            }) as SubTree;
            expect(familyExtensionSubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name[0].family.extension[0]"
            );
            expect(familyExtensionSubTree.lastPathElement).toEqual("extension[0]");
            expect(familyExtensionSubTree.addedPaths).toEqual([] as string[]);
            expect(familyExtensionSubTree.children.length).toEqual(1);
            expect(familyExtensionSubTree.data).toEqual({
                _value: "http://fhir.de/StructureDefinition/humanname-namenszusatz",
            } as UriPIO);
        });
    });

    describe("Generate a SubTree out of a SubTree", (): void => {
        const baseSubTree: SubTree = new SubTree(
            "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient",
            exampleEntryType
        );
        it("should generate a SubTree representing the 'communication'' property of the patient", (): void => {
            const communicationSubTree: SubTree = new SubTree("communication", baseSubTree);
            expect(communicationSubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.communication"
            );
            expect(communicationSubTree.lastPathElement).toEqual("communication");
            expect(communicationSubTree.addedPaths).toEqual([] as string[]);
            expect(communicationSubTree.data).toEqual(undefined);
            expect(communicationSubTree.children.length).toEqual(1);

            //Check children of 'communication' SubTree
            const communication_1_SubTree: SubTree = communicationSubTree.children[0];
            expect(communication_1_SubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.communication[0]"
            );
            expect(communication_1_SubTree.lastPathElement).toEqual("communication[0]");
            expect(communication_1_SubTree.addedPaths).toEqual([] as string[]);
            expect(communication_1_SubTree.data).toEqual(undefined);
            expect(communication_1_SubTree.children.length).toEqual(1);

            //Check children of 'communication[0]' SubTree
            const languageSubTree: SubTree = communication_1_SubTree.children[0];
            expect(languageSubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.communication[0].language"
            );
            expect(languageSubTree.lastPathElement).toEqual("language");
            expect(languageSubTree.addedPaths).toEqual([] as string[]);
            expect(languageSubTree.data).toEqual(undefined);
            expect(languageSubTree.children.length).toEqual(1);

            //Check children of 'language' SubTree
            const codingSubTree: SubTree = languageSubTree.children[0];
            expect(codingSubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.communication[0].language.coding"
            );
            expect(codingSubTree.lastPathElement).toEqual("coding");
            expect(codingSubTree.addedPaths).toEqual([] as string[]);
            expect(codingSubTree.data).toEqual(undefined);
            expect(codingSubTree.children.length).toEqual(4);

            //Check one child of 'coding' SubTree
            const displaySubTree: SubTree = codingSubTree.getChild("display") as SubTree;
            expect(displaySubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.communication[0].language.coding.display"
            );
            expect(displaySubTree.lastPathElement).toEqual("display");
            expect(displaySubTree.addedPaths).toEqual([] as string[]);
            expect(displaySubTree.children.length).toEqual(0);
            expect(displaySubTree.data).toEqual({ _value: "German" } as StringPIO);
        });
    });

    describe("Generate an empty SubTree", (): void => {
        it("should generate an empty SubTree", (): void => {
            const subTree: SubTree = new SubTree(
                "22166350-40ae-48b6-abfc-deeaf5372960.KBV_PR_MIO_ULB_Organization.address",
                undefined
            );
            expect(subTree.absolutePath).toEqual(
                "22166350-40ae-48b6-abfc-deeaf5372960.KBV_PR_MIO_ULB_Organization.address"
            );
            expect(subTree.lastPathElement).toEqual("address");
            expect(subTree.addedPaths).toEqual([] as string[]);
            expect(subTree.children).toEqual([] as SubTree[]);
            expect(subTree.data).toEqual(undefined);
        });
    });

    describe("Transform a SubTree back to an EntryType", (): void => {
        describe("Transform all patient data from a SubTree back to an EntryType", (): void => {
            const patientSubTree: SubTree = new SubTree(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient",
                exampleEntryType
            );
            const retransformedEntryType: EntryType | EntryType[] = patientSubTree.transformSubTreeToEntryType();
            const originalEntryType: EntryType =
                exampleEntryType["e029b2b8-5dc6-4feb-990a-7471fb9b54e3"]["KBV_PR_MIO_ULB_Patient"];

            it("The retransformed SubTree should be equal to the original 'exampleEntryType'", (): void => {
                expect(JSON.stringify(retransformedEntryType)).toEqual(JSON.stringify(originalEntryType));
            });
        });

        describe("Transform all patient names from a SubTree back to an EntryType", (): void => {
            const patientNameSubTree: SubTree = new SubTree(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name",
                exampleEntryType
            );
            const retransformedEntryType: EntryType | EntryType[] = patientNameSubTree.transformSubTreeToEntryType();
            const originalEntryType: EntryType =
                exampleEntryType["e029b2b8-5dc6-4feb-990a-7471fb9b54e3"]["KBV_PR_MIO_ULB_Patient"]["name"];

            it("The retransformed SubTree should be equal to the original 'exampleEntryType'.", (): void => {
                expect(JSON.stringify(retransformedEntryType)).toEqual(JSON.stringify(originalEntryType));
            });
        });

        describe("Transform one specific patient name from a SubTree back to an EntryType", (): void => {
            const patientNameSubTree: SubTree = new SubTree(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name[0]",
                exampleEntryType
            );
            const retransformedEntryType: EntryType | EntryType[] = patientNameSubTree.transformSubTreeToEntryType();
            const originalEntryType: EntryType =
                exampleEntryType["e029b2b8-5dc6-4feb-990a-7471fb9b54e3"]["KBV_PR_MIO_ULB_Patient"]["name"][0];

            it("The retransformed SubTree should be equal to the original 'exampleEntryType'!", (): void => {
                expect(JSON.stringify(retransformedEntryType)).toEqual(JSON.stringify(originalEntryType));
            });
        });

        describe("Transform header data from a SubTree back to an EntryType", (): void => {
            const patientProfileSubTree: SubTree = new SubTree(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.@profile@",
                exampleEntryType
            );
            const retransformedEntryType: EntryType | EntryType[] = patientProfileSubTree.transformSubTreeToEntryType();
            const originalEntryType: EntryType =
                exampleEntryType["e029b2b8-5dc6-4feb-990a-7471fb9b54e3"]["KBV_PR_MIO_ULB_Patient"]["@profile@"];

            it("The retransformed SubTree should be equal to the original 'exampleEntryType'.", (): void => {
                expect(JSON.stringify(retransformedEntryType)).toEqual(JSON.stringify(originalEntryType));
            });
        });

        describe("Transform a primitive data type from a SubTree back to an EntryType", (): void => {
            const maidenNameSubTree: SubTree = new SubTree(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name[1].family.extension[0].valueString",
                exampleEntryType
            );
            const retransformedEntryType: EntryType | EntryType[] = maidenNameSubTree.transformSubTreeToEntryType();
            const temp: EntryType = exampleEntryType["e029b2b8-5dc6-4feb-990a-7471fb9b54e3"]["KBV_PR_MIO_ULB_Patient"];
            const originalEntryType: EntryType = temp["name"][1]["family"]["extension"][0]["valueString"];

            it("The retransformed SubTree should be equal to the original 'exampleEntryType'.", (): void => {
                expect(JSON.stringify(retransformedEntryType)).toEqual(JSON.stringify(originalEntryType));
            });
        });
    });

    describe("Tests for method getSubTreeByPath()", (): void => {
        const patientSubTree: SubTree = new SubTree(
            "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient",
            exampleEntryType
        );

        it("should return a SubTree representing the gender", (): void => {
            const newSubTree: SubTree = patientSubTree.getSubTreeByPath("gender");
            expect(newSubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.gender"
            );
            expect(newSubTree.lastPathElement).toEqual("gender");
            expect(newSubTree.addedPaths).toEqual([] as string[]);
            expect(newSubTree.data).toEqual({ _value: "male" } as CodePIO);
            expect(newSubTree.children).toEqual([] as SubTree[]);
        });

        it("should return a SubTree representing the header data '@profile@'", (): void => {
            const newSubTree: SubTree = patientSubTree.getSubTreeByPath("@profile@");
            expect(newSubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.@profile@"
            );
            expect(newSubTree.lastPathElement).toEqual("@profile@");
            expect(newSubTree.addedPaths).toEqual([] as string[]);
            expect(newSubTree.data).toEqual({
                _value: "https://fhir.kbv.de/StructureDefinition/KBV_PR_MIO_ULB_Patient",
            } as CodePIO);
            expect(newSubTree.children).toEqual([] as SubTree[]);
        });

        it("should return a SubTree representing all patient names", (): void => {
            const newSubTree: SubTree = patientSubTree.getSubTreeByPath("name");

            //Check the returned SubTree object
            expect(newSubTree.absolutePath).toEqual("e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name");
            expect(newSubTree.lastPathElement).toEqual("name");
            expect(newSubTree.addedPaths).toEqual([] as string[]);
            expect(newSubTree.data).toEqual(undefined);
            expect(newSubTree.children.length).toEqual(2);

            //Check children of the returned SubTree object
            const nameSubTree: SubTree = newSubTree.children[0];
            const maidenNameSubTree: SubTree = newSubTree.children[1];
            expect(nameSubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name[0]"
            );
            expect(nameSubTree.lastPathElement).toEqual("name[0]");
            expect(nameSubTree.addedPaths).toEqual([] as string[]);
            expect(nameSubTree.data).toEqual(undefined);
            expect(nameSubTree.children.length).toEqual(5);
            expect(maidenNameSubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name[1]"
            );
            expect(maidenNameSubTree.lastPathElement).toEqual("name[1]");
            expect(maidenNameSubTree.addedPaths).toEqual([] as string[]);
            expect(maidenNameSubTree.data).toEqual(undefined);
            expect(maidenNameSubTree.children.length).toEqual(3);

            //Check patients full name
            const fullNameSubTree: SubTree = nameSubTree.children[1];
            expect(fullNameSubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.name[0].text"
            );
            expect(fullNameSubTree.lastPathElement).toEqual("text");
            expect(fullNameSubTree.addedPaths).toEqual([] as string[]);
            expect(fullNameSubTree.data).toEqual({ _value: "Dr. Alex Prinz Stackelberg" } as StringPIO);
            expect(fullNameSubTree.children.length).toEqual(0);
        });

        it("should return an empty SubTree because path does not exist", (): void => {
            const birthDateSubTree: SubTree = patientSubTree.getSubTreeByPath("birthDate");
            expect(birthDateSubTree.absolutePath).toEqual(
                "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.birthDate"
            );
            expect(birthDateSubTree.lastPathElement).toEqual("birthDate");
            expect(birthDateSubTree.addedPaths).toEqual([] as string[]);
            expect(birthDateSubTree.data).toEqual(undefined);
            expect(birthDateSubTree.children).toEqual([] as SubTree[]);
        });
    });

    describe("Tests for method setValue() and correct behaviour of the 'addedPaths' property", (): void => {
        const patientSubTree: SubTree = new SubTree(
            "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient",
            exampleEntryType
        );

        describe("Check method setValue()", (): void => {
            it("should add a birthDate to the patient and its subTree", (): void => {
                patientSubTree.setValue("birthDate", new DatePIO(1947, 3, 18));
                const birthDateSubTree: SubTree | undefined = patientSubTree.children.find(
                    (child: SubTree): boolean => {
                        return child.lastPathElement === "birthDate";
                    }
                );
                expect(birthDateSubTree === undefined).toEqual(false);
                expect((birthDateSubTree as SubTree).absolutePath).toEqual(
                    "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.birthDate"
                );
                expect((birthDateSubTree as SubTree).lastPathElement).toEqual("birthDate");
                expect((birthDateSubTree as SubTree).addedPaths).toEqual([] as string[]);
                expect((birthDateSubTree as SubTree).data).toEqual({
                    _value: { year: 1947, month: 3, day: 18 },
                } as DatePIO);
                expect((birthDateSubTree as SubTree).children).toEqual([] as SubTree[]);
            });

            it("should overwrite the gender", (): void => {
                patientSubTree.setValue("gender", new CodePIO("unknown"));
                const genderSubTree: SubTree | undefined = patientSubTree.children.find((child: SubTree): boolean => {
                    return child.lastPathElement === "gender";
                });
                expect(genderSubTree === undefined).toEqual(false);
                expect((genderSubTree as SubTree).absolutePath).toEqual(
                    "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.gender"
                );
                expect((genderSubTree as SubTree).lastPathElement).toEqual("gender");
                expect((genderSubTree as SubTree).addedPaths).toEqual([] as string[]);
                expect((genderSubTree as SubTree).data).toEqual({ _value: "unknown" } as CodePIO);
                expect((genderSubTree as SubTree).children).toEqual([] as SubTree[]);
            });
        });

        describe("Check correct behaviour of 'addedPaths' property", (): void => {
            it("Property 'addedPaths' should contain all added paths of the last test", (): void => {
                expect(patientSubTree.addedPaths).toEqual([
                    "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.birthDate",
                    "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.gender",
                ]);
            });

            it("There should be no duplicates in the 'addedPaths' property", (): void => {
                patientSubTree.setValue("gender", new CodePIO("female"));
                expect(patientSubTree.addedPaths.length).toEqual(2);
            });

            it("should copy all relevant paths to the new SubTree, if method getSubTreeByPath() is called", (): void => {
                const newSubTree: SubTree = patientSubTree.getSubTreeByPath("gender");
                expect(newSubTree.addedPaths).toEqual([
                    "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient.gender",
                ]);
            });
        });
    });

    describe("Tests for getting child SubTrees and values", (): void => {
        const patientSubTree: SubTree = new SubTree(
            "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient",
            exampleEntryType
        );
        const emptySubTree: SubTree = new SubTree(
            "2a73739e-7df1-4a61-a79d-8d95ae45a563.KBV_PR_MIO_ULB_Organization",
            exampleEntryType
        );

        it("should return all children of te patientSubTree as string[]", (): void => {
            expect(patientSubTree.getAllChildren()).toEqual([
                "@profile@",
                "name[0]",
                "name[1]",
                "gender",
                "communication[0]",
            ]);
        });

        it("The chained calls should return the maiden name value in the end", (): void => {
            expect(patientSubTree.getChild("name[1]").getChild("text").getValue()).toEqual({
                _value: "Schneider",
            } as StringPIO);
        });

        it("The chained calls should return the maiden name value as string in the end", (): void => {
            expect(patientSubTree.getChild("name[1]").getChild("text").getValueAsString()).toEqual("Schneider");
        });

        it("The getValueAsString should return undefined if there is no value", (): void => {
            expect(emptySubTree.getValueAsString()).toEqual(undefined);
        });

        it("should throw an error, because the child is not existing", (): void => {
            expect(() => patientSubTree.getChild("random")).toThrow();
        });
    });

    describe("Tests to check if subTree holds data", (): void => {
        const patientSubTree: SubTree = new SubTree(
            "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient",
            exampleEntryType
        );
        const emptySubTree: SubTree = new SubTree(
            "2a73739e-7df1-4a61-a79d-8d95ae45a563.KBV_PR_MIO_ULB_Organization",
            exampleEntryType
        );
        it("should return true, because the subTree holds data", (): void => {
            expect(SubTree.doesSubTreeHoldData(patientSubTree.getChild("name[1]").getChild("text"))).toEqual(true);
        });
        it("should return false, because the subTree does not hold data", (): void => {
            expect(SubTree.doesSubTreeHoldData(emptySubTree)).toEqual(false);
        });
    });

    describe("Tests for method deleteValue()", (): void => {
        const patientSubTree: SubTree = new SubTree(
            "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient",
            exampleEntryType
        );

        it("should throw not an error, because 'subTreePath' does not exist", (): void => {
            expect(() => patientSubTree.deleteValue("random")).not.toThrow();
        });

        it("should delete the gender value of the patient", (): void => {
            patientSubTree.deleteValue("gender");
            expect(patientSubTree.getChild("gender").getValue()).toEqual(undefined);
        });
    });

    describe("Tests for method deleteSubTreeByPath()", (): void => {
        const patientSubTree: SubTree = new SubTree(
            "e029b2b8-5dc6-4feb-990a-7471fb9b54e3.KBV_PR_MIO_ULB_Patient",
            exampleEntryType
        );

        it("should not throw an error, although 'subTreePath' does not exist", (): void => {
            expect(() => patientSubTree.deleteSubTreeByPath("random")).not.toThrow();
        });

        it("should delete the whole 'communication' SubTree of the patient", (): void => {
            patientSubTree.deleteSubTreeByPath("communication[0]");
            expect(() => patientSubTree.getChild("communication[0]")).toThrow();
        });
    });

    describe("Tests for method integrateSubTree()", (): void => {
        const orgaSubTree: SubTree = new SubTree(
            "39f928a1-52f6-4563-8918-214cb3b2b55f.KBV_PR_MIO_ULB_Organization",
            exampleEntryType
        );
        const subTreeOfSubTreeWithNonExistingPath: SubTree = orgaSubTree.getSubTreeByPath("address[0].line");

        it("adding a value to subTreeOfSubTree should not affect orgaSubTree", (): void => {
            subTreeOfSubTreeWithNonExistingPath.setValue("", new StringPIO("Tulpenstrasse 3"));
            expect(orgaSubTree.getSubTreeByPath("address[0].line").getValueAsString()).toEqual(undefined);
        });

        it("integrating subTreeOfSubTree should affect orgaSubTree", (): void => {
            orgaSubTree.integrateSubTree(subTreeOfSubTreeWithNonExistingPath);
            expect(orgaSubTree.getSubTreeByPath("address[0].line").getValueAsString()).toEqual("Tulpenstrasse 3");
        });

        it("should not integrate a SubTree with not matching absolutePaths", (): void => {
            const notMatchingSubTree: SubTree = new SubTree(
                "39f928a1-52f6-4563-8918-214cb3b2b55f.Organization.address[1].line",
                undefined
            );
            notMatchingSubTree.setValue("", new StringPIO("Augustweg 2"));
            orgaSubTree.integrateSubTree(notMatchingSubTree);
            expect(orgaSubTree.getSubTreeByPath("address[1].line").getValueAsString()).toEqual(undefined);
        });

        it("already existing subTree paths should be overwritten", (): void => {
            const matchingSubTree: SubTree = new SubTree(
                "39f928a1-52f6-4563-8918-214cb3b2b55f.KBV_PR_MIO_ULB_Organization.address[1].line",
                undefined
            );
            matchingSubTree.setValue("", new StringPIO("Augustweg 2"));
            orgaSubTree.integrateSubTree(matchingSubTree);
            expect(orgaSubTree.getSubTreeByPath("address[1].line").getValueAsString()).toEqual("Augustweg 2");
        });
    });
});
