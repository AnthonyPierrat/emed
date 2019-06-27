import { IsArray, IsDate, IsDefined, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { EventType } from "../enums/event-type.enum";
import { SexType } from "../enums/sex-type.enum";

export default class Record {

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
    @IsNumber()
    private _event: EventType;

    @IsDefined()
    @IsString()
    private _message: string;

    @IsOptional()
    @IsString()
    private _bloodType: string;

    @IsOptional()
    @IsNumber()
    private _weight: Number;

    @IsOptional()
    @IsNumber()
    private _height: number;

    @IsOptional()
    @IsNumber()
    private _sex: SexType;

    @IsDate()
    private _lastUpdate: Date;

    constructor(values: Object = {}) {
        Object.assign(this, values);
        this._lastUpdate = new Date();
    }

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
    public get bloodType(): string {
        return this._bloodType;
    }
    public set bloodType(value: string) {
        this._bloodType = value;
    }
    public get weight(): Number {
        return this._weight;
    }
    public set weight(value: Number) {
        this._weight = value;
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

    public get lastUpdate(): Date {
        return this._lastUpdate;
    }
}
