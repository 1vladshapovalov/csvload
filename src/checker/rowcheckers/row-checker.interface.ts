export interface IRowChecker {
    name: string;
    checkRow(data: { [key: string]: string | number }): Promise<string| number | null>;
}
