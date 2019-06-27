import { Events } from '../enums/event.enum';
import { Genders } from '../enums/gender.enum';

export default class Record {

    private _firstName: string;

    private _lastName: string;

    private _birthdate: string;

    private _canSee: string[];

    private _canWrite: string[];

    private _event: Events;

    private _message: string;

    private _bloodType: string;

    private _weight: Number;

    private _height: number;

    private _sex: Genders;

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
    public get event(): Events {
        return this._event;
    }
    public set event(value: Events) {
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
    public get sex(): Genders {
        return this._sex;
    }
    public set sex(value: Genders) {
        this._sex = value;
    }

    public get lastUpdate(): Date {
        return this._lastUpdate;
    }
}
