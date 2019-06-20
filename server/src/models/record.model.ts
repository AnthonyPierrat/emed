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

}
