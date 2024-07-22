import { Dayjs } from "dayjs";

/**
 * The Interface for address objects for the AddressForm Component
 * @interface
 * @property {string} street optional street input
 * @property {string} houseNumber optional house number input
 * @property {string} additionalLocator optional additional locator input
 * @property {string} postOfficeBoxNumber optional post office box number input
 * @property {string} postOfficeBoxRadio stringifies boolean to enable post office box input
 * @property {string} use optional string for use of address
 * @property {string} text optional string for text of address
 * @property {string} city optional string for city of address
 * @property {string} country optional string for country of address
 * @property {string} district optional string for district of address
 * @property {string[]} line optional string array for line of address
 * @property {string} postalCode optional string for postal code of address
 * @property {string} type optional string for type of address
 * @property {string} id optional string for id of address
 */
export interface IAddressObject {
    id?: string;
    street?: string;
    houseNumber?: string;
    additionalLocator?: string;
    postOfficeBoxNumber?: string;
    postOfficeBoxRadio?: string;
    use?: "home" | "work" | "temp" | "old" | "billing";
    text?: string;
    city?: string;
    country?: string;
    district?: string;
    line?: string[];
    postalCode?: string;
    type?: "postal" | "physical" | "both";
}

/**
 * Custom interface for allergy object.
 * @interface
 * @property {string} id string for id of allergy
 * @property {string} allergyType optional string for type of allergy
 * @property {ITimePeriodObject} timePeriod optional array of Dayjs for time period of allergy
 * @property {string} allergyCategory optional string for category of allergy
 * @property {string} allergyCriticality optional string for criticality of allergy
 * @property {string} furtherInfo string for further information about allergy
 * @property {string} symptoms optional string for symptoms of allergy
 */
export interface IAllergyObject {
    id: string;
    allergyType?: string;
    timePeriod?: ITimePeriodObject;
    allergyCategory?: string;
    allergyCriticality?: string;
    furtherInfo: string;
    symptoms?: string;
    note?: string;
}

/**
 * Custom interface for care problem object.
 * @interface
 * @property {string} id string for id of care problem
 * @property {string} careProblemCode string of care problem code form the value set
 * @property {string} careProblemComment optional comment for care problem
 * @property {Dayjs} careProblemOnset optional date of care problem onset
 */
export interface ICareProblemObject {
    id: string;
    careProblemCode: string;
    careProblemComment?: string;
    careProblemOnset?: Dayjs;
}

/**
 * Custom interface for contact person object.
 * @interface
 * @property {string} id string for id of contact person
 * @property {string} role Optional String for the contact's role
 * @property {string} gender Optional String for the contact's gender
 * @property {IFullNameObject} name Optional IFullNameObject for the contact's name
 * @property {IAddressObject[]} address Optional IAddressObject list for all the contact's addresses
 * @property {ITelecomObject} telecom Optional ITelecomObject list for all the contact's contact channels
 */
export interface IContactPersonObject {
    id: string;
    role?: string;
    gender?: string;
    name?: IFullNameObject;
    address?: IAddressObject[];
    telecom?: ITelecomObject[];
}

/**
 * Custom interface for device object.
 * @interface
 * @property {string} id string for id of device
 * @property {string} deviceType ValueSet value for type of device
 * @property {string} deviceName optional string for name of device
 * @property {string} modelNumber optional string for model number of device
 * @property {string} serialNumber optional string for serial number of device
 * @property {string} udiCarrier optional string for UDI carrier of device
 * @property {string} deviceResponsibleOrganization optional string for responsible organization uuid of device
 * @property {boolean} given True, if device is given to patient
 */
export interface IDeviceObject {
    id: string;
    deviceType?: string;
    deviceName?: string;
    modelNumber?: string;
    serialNumber?: string;
    udiCarrier?: string;
    deviceResponsibleOrganization?: string;
    given: boolean;
}

/**
 * Interface for the DocumentObject
 * @interface
 * @property {string} documentName string that represents the document name
 * @property {string} documentUrl string that represents the document url
 * @property {string} uuidDocument string that represents the document uuid
 * @property {string} uuidProvenance string that represents the provenance uuid
 */
export interface IEPADocumentObject {
    documentName: string;
    documentUrl: string;
    uuidDocument: string;
    uuidProvenance: string;
}

/**
 * Custom interface for implant object.
 * @interface
 * @property {string} id string for id of implant
 * @property {string} implantType type of implant
 * @property {string} comment optional comment for implant
 */
export interface IImplantObject {
    id: string;
    implantType?: string;
    comment?: string;
}

/**
 * Interface for the MaidenNameObject
 * @interface
 * @property {string} familyName string that represents the maiden name
 * @property {string} vorsatzwort optional string that represents the maiden name's Vorsatzwort
 * @property {string} namenszusatz optional string that represents the maiden name's Namenszusatz
 */
export interface IMaidenNameObject {
    familyName: string;
    vorsatzwort?: string;
    namenszusatz?: string;
}

/**
 * Custom interface for medical problem object.
 * @interface
 * @property {string} id string that represents the medical problem's id
 * @property {string} medicalProblemClinicalStatus optional string for clinical status of medical problem
 * @property {string} medicalProblemCode string for code of medical problem
 * @property {string} medicalProblemComment optional string for comment of medical problem
 * @property {ITimePeriodObject} medicalProblemPeriod optional array of Dayjs for period of medical problem
 * @property {string} medicalProblemSeverity optional string for severity of medical problem
 * @property {string} medicalProblemVerificationStatus optional string for verification status of medical problem
 * @property {string} medicalProblemPerformer optional string for performer of medical problem
 */
export interface IMedicalProblemObject {
    id: string;
    medicalProblemClinicalStatus?: string;
    medicalProblemCode: string;
    medicalProblemComment?: string;
    medicalProblemPeriod?: ITimePeriodObject;
    medicalProblemSeverity?: string;
    medicalProblemVerificationStatus?: string;
    medicalProblemPerformer?: string;
}

/**
 * Custom interface for Location form
 * @interface
 * @property {string} type ValueSet value for residence type of location
 * @property {string} class ValueSet value for living condition of location
 * @property {string} participant participants reference id
 * @property {string} serviceProvider uuid of organization
 */
export interface ILocationObject {
    type?: string;
    class?: string;
    participant?: string;
    serviceProvider?: string;
}

/**
 * Interface for the FullNameObject
 * @interface
 * @property {string} familyName string that represents the family name
 * @property {string} givenName optional string that represents the given name
 * @property {string} prefix optional string that represents the name's prefix
 * @property {string} vorsatzwort optional string that represents the name's Vorsatzwort
 * @property {string} namenszusatz optional string that represents the name's Namenszusatz
 * @property {IMaidenNameObject} geburtsname optional IMaidenNameObject that represents the maiden name
 */
export interface IFullNameObject {
    familyName: string;
    givenName?: string;
    prefix?: string;
    vorsatzwort?: string;
    namenszusatz?: string;
    geburtsname?: IMaidenNameObject;
}

/**
 * The Interface for an organization object
 * @interface
 * @property {string} id string that represents the organization's id
 * @property {string} name string that represents the organization's name
 * @property {string} type optional string that represents the organization's type as an enum value
 * @property {IOrganizationIdentifierObject[]} identifier optional organization identifier list
 * @property {IAddressObject[]} address optional organization address list
 * @property {ITelecomObject[]} telecom optional organization contact channel list
 */
export interface IOrganizationObject {
    id: string;
    name: string;
    type?: string;
    identifier?: IOrganizationIdentifierObject[];
    address?: IAddressObject[];
    telecom?: ITelecomObject[];
}

/**
 * Custom interface for the Organization identifier object
 * @interface
 * @property {string} value value of the identifier type
 * @property {string} displayName value to be shown for this identifier
 */
export interface IOrganizationIdentifierObject {
    label: string;
    value: string;
}

/**
 * Custom interface for practitioner object.
 * @interface
 * @property {string} id string for id of practitioner
 * @property {string} additionalInfo optional string for additional information about practitioner
 * @property {string} organization string for organization uuid of practitioner
 * @property {string} qualification optional string for qualification of practitioner
 * @property {string} role optional string for role of practitioner
 * @property {string} speciality optional string for speciality of practitioner
 * @property {IFullNameObject} practitionerName optional IFullNameObject for name of practitioner
 * @property {IAddressObject[]} address optional IAddressObject list for all the practitioner's addresses
 * @property {ITelecomObject[]} telecom optional ITelecomObject list for all the practitioner's contact channels
 * @property {string} ZANR optional string for dentistnumber of practitioner
 * @property {string} EFN optional string for trainingnumber of practitioner
 * @property {string} ANR optional string for doctornumber of practitioner
 */
export interface IPractitionerObject {
    id: string;
    additionalInfo?: string;
    organization: string;
    qualification?: string;
    role?: string;
    speciality?: string;
    practitionerName?: IFullNameObject;
    address?: IAddressObject[];
    telecom?: ITelecomObject[];
    ZANR?: string;
    EFN?: string;
    ANR?: string;
    author?: boolean;
}

/**
 * Custom interface for risk object.
 * @interface
 * @property {string} id string for id of risk resource
 * @property {string} riskValue ValueSet value for type of risk
 * @property {Dayjs} riskEffective optional date of risk effective
 * @property {string} riskPerformer optional string for performer of risk
 */
export interface IRiskObject {
    id: string;
    riskValue: string;
    riskEffective?: Dayjs;
    riskPerformer?: string;
}

/**
 * Custom interface for telecom wrapper.
 * @interface
 * @property {string} label optional string for label of telecom (e.g "Fax", "E-Mail")
 * @property {string} system identifier for type of communication option (e.g. "phone", "email")
 * @property {string} value Value of telecom (e.g. telephone number, e-mail-address, etc.)
 */
export interface ITelecomObject {
    label: string;
    system: string;
    value: string;
}

/**
 * Interface for the TimePeriodObject
 * @interface
 * @property {Dayjs} start optional Dayjs that represents the start of the time period
 * @property {Dayjs} end optional Dayjs that represents the end of the time period
 */
export interface ITimePeriodObject {
    start?: Dayjs;
    end?: Dayjs;
}

/**
 * Interface for the DocumentUploadObject
 * @interface
 * @property {string} fileId string that represents the file id
 * @property {string} documentName string that represents the document name
 * @property {string} fileName optional string that represents the file name
 * @property {string} documentData string that represents the document data
 * @property {string} documentType optional string that represents the document type
 * @property {string} uuidDocument string that represents the document uuid
 * @property {string} uuidProvenance string that represents the provenance uuid
 * @property {string} status optional string that represents the upload status
 * @property {number} percent optional number that represents the upload progress
 */
export interface IUploadDocumentObject {
    fileId: string;
    documentName: string;
    fileName?: string;
    documentData: string;
    documentType?: string;
    uuidDocument: string;
    uuidProvenance: string;
    status?: string;
    percent?: number;
}
