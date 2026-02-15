import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ConversionEntry {
    outputFilename: string;
    timestamp: Time;
    preset: string;
    tiktokUrl: string;
}
export type Time = bigint;
export interface backendInterface {
    addConversion(tiktokUrl: string, preset: string, outputFilename: string): Promise<void>;
    getConversionHistory(): Promise<Array<ConversionEntry>>;
}
