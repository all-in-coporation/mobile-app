import { Identifier } from './Identifier';
import { Address } from './Address';
import { Phone } from './Phone';

export class User {
    _id: Object; // The database identifier
    // User Idenification Data
    name: string;
    middleName?: string;
    surname: string;
    birthDate: Date;
    address: Address;
    identifier: Identifier;
    gender: string; // A string representing gender ['M', 'F']
    email: Array<string>;
    nationality: string; // Country code in: ISO 3166-1 alpha-3
    phone?: Array<Phone>;
    yearsOld: number;

    // Custom APP data
    profilePic: string = 'default-pic.jpg';
    job?: string;
    bio?: string;
    /**
     * The following object value is created by the name of the social network
     * as key and the link as value. Ex: `{facebook: 'https://facebook.com'}`
     */
    socialNetworks?: Object;
    speakLenguages?: Array<string>; // A country code array in: ISO 3166-1 alpha-3
    interestedIn?: string; // An optional string representing interest in gender ['M', 'F']
    musicKind?: Array<string>;
    followers?: Array<Object>; // An Array containing the Users object ids
    permissions?: Array<string>;
}
