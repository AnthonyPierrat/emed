import { IsArray, IsDate, IsDefined, IsInt, IsString } from "class-validator";
import { EventType } from "../enums/event-type.enum";

export default class Record {

    @IsDefined()
    @IsString()
    private _firstName: string;
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }

    @IsDefined()
    @IsString()
    private _lastName: string;
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }

    @IsDefined()
    @IsString()
    private _birthdate: string;
    public get birthdate(): string {
        return this._birthdate;
    }
    public set birthdate(value: string) {
        this._birthdate = value;
    }

    @IsArray()
    private _canSee: string[];
    public get canSee(): string[] {
        return this._canSee;
    }
    public set canSee(value: string[]) {
        this._canSee = value;
    }

    @IsArray()
    private _canWrite: string[];
    public get canWrite(): string[] {
        return this._canWrite;
    }
    public set canWrite(value: string[]) {
        this._canWrite = value;
    }

    @IsDefined()
    @IsInt()
    private _event: EventType;
    public get event(): EventType {
        return this._event;
    }
    public set event(value: EventType) {
        this._event = value;
    }

    @IsDefined()
    @IsString()
    private _message: string;
    public get message(): string {
        return this._message;
    }
    public set message(value: string) {
        this._message = value;
    }

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    @IsDefined()
    @IsString()
    private _bloodtype: string;
    public get bloodtype(): string {
        return this._bloodtype;
    }
    public set bloodtype(value: string) {
        this._bloodtype = value;
    }

    @IsDefined()
    @IsString()
    private _weight: Number;
    public get weight(): Number {
        return this._weight;
    }
    public set weight(value: Number) {
        this._weight = value;
    }

    @IsDefined()
    @IsString()
    private _address: string;
    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }

    @IsDefined()
    @IsString()
    private _phoneNumber: string;
    public get phoneNumber(): string {
        return this._phoneNumber;
    }
    public set phoneNumber(value: string) {
        this._phoneNumber = value;
    }

    @IsDefined()
    @IsString()
    private _height: number;
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;
    }

    @IsDefined()
    @IsString()
    private _sexe: string;
    public get sexe(): string {
        return this._sexe;
    }
    public set sexe(value: string) {
        this._sexe = value;
    }
}
