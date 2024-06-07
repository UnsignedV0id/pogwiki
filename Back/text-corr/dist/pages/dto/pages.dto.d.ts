export declare class CreatePagesDto {
    title: string;
    content: string;
    creator: number;
}
declare const UpdatePagesDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePagesDto>>;
export declare class UpdatePagesDto extends UpdatePagesDto_base {
}
export {};
