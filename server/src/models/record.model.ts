import { IsArray, IsDate, IsDefined, IsInt, IsString } from "class-validator";
import { EventType } from "../enums/event-type.enum";
import { SexType } from "../enums/sex-type.enum";

export default class Record {
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    public get birthdate(): string {
        return this._birthdate;
    }
    public set birthdate(value: string) {
        this._birthdate = value;
    }
    public get canSee(): string[] {
        return this._canSee;
    }
    public set canSee(value: string[]) {
        this._canSee = value;
    }
    public get canWrite(): string[] {
        return this._canWrite;
    }
    public set canWrite(value: string[]) {
        this._canWrite = value;
    }
    public get event(): EventType {
        return this._event;
    }
    public set event(value: EventType) {
        this._event = value;
    }
    public get message(): string {
        return this._message;
    }
    public set message(value: string) {
        this._message = value;
    }
    public get bloodtype(): string {
        return this._bloodtype;
    }
    public set bloodtype(value: string) {
        this._bloodtype = value;
    }
    public get weight(): Number {
        return this._weight;
    }
    public set weight(value: Number) {
        this._weight = value;
    }
    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }
    public get phoneNumber(): string {
        return this._phoneNumber;
    }
    public set phoneNumber(value: string) {
        this._phoneNumber = value;
    }
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;
    }
    public get sex(): SexType {
        return this._sex;
    }
    public set sex(value: SexType) {
        this._sex = value;
    }

    @IsDefined()
    @IsString()
    private _firstName: string;

    @IsDefined()
    @IsString()
    private _lastName: string;

    @IsDefined()
    @IsString()
    private _birthdate: string;

    @IsArray()
    private _canSee: string[];

    @IsArray()
    private _canWrite: string[];

    @IsDefined()
    @IsInt()
    private _event: EventType;

    @IsDefined()
    @IsString()
    private _message: string;

    @IsDefined()
    @IsString()
    private _bloodtype: string;

    @IsDefined()
    @IsString()
    private _weight: Number;

    @IsDefined()
    @IsString()
    private _address: string;

    @IsDefined()
    @IsString()
    private _phoneNumber: string;

    @IsDefined()
    @IsString()
    private _height: number;

    @IsDefined()
    @IsString()
    private _sex: SexType;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
