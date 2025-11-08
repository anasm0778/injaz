export class Categoryes {
    constructor(public name: string, public status: string, public slag: string, public createdDate: string, public updatedDate: string) {
        if (!this.isValidString(name)) {
            throw Error(JSON.stringify({ message: "Invalid username. Username must be a non-empty string." }));
        }
        if (!this.isValidString(status)) {
            throw Error(JSON.stringify({ message: "Invalid username. Username must be a non-empty string." }));
        }
        this.returnData()
    }
    public returnData() {
        return {
            name: this.name, status: this.status, slag: this.slag, createdDate: this.createdDate, updatedDate: this.updatedDate
        }
    }
    private isValidString(userName: string): boolean {
        return typeof userName === 'string' && userName.trim().length > 0;
    }
}