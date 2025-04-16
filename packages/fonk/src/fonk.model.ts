export type ErrorMessage = string;

export type Errors<Model> = Partial<Record<DeepKey<Model>, ErrorMessage | undefined>> | undefined;

type ExtractArrayPaths<Field extends string> =
  Field extends `${infer Prefix}[${string}].${infer ArrayName}[${string}]${infer Rest}`
    ? Prefix | `${Prefix}.${ArrayName}` | ExtractArrayPaths<`${Prefix}[${string}].${ArrayName}${Rest}`>
    : Field extends `${infer Prefix}.${infer ArrayName}[${string}]${infer Rest}`
      ? `${Prefix}.${ArrayName}` | ExtractArrayPaths<`${Prefix}.${ArrayName}${Rest}`>
      : Field extends `${infer Prefix}[${string}]${infer Rest}`
        ? Prefix | ExtractArrayPaths<`${Prefix}${Rest}`>
        : never;

export type ArrayIndexes<Field extends string = string> = {
  [K in ExtractArrayPaths<Field>]?: number;
};

export interface ArrayValidationContext<Model, Field extends DeepKey<Model>> {
  field: Field;
  values: Model;
  path: string[];
  segmentValue?: Model | DeepValue<Model, Field & string>;
  arrayIndexes?: ArrayIndexes<Field & string>;
  lastArrayIndexSegment?: string;
}

export interface InternalValidatorProps<Model, Field extends DeepKey<Model>> {
  value: DeepValue<Model, Field & string>;
  values: Model;
  arrayIndexes: ArrayIndexes<Field & string>;
}

export type ValidatorProps<CustomArgs = {}> = CustomArgs & {
  message?: string;
};

export type ValidatorFn<CustomArgs = {}, Model = any, Field extends DeepKey<Model> = any> = (
  props?: ValidatorProps<CustomArgs>
) => (props: InternalValidatorProps<Model, Field>) => ErrorMessage | Promise<ErrorMessage> | undefined;

export type DeepSchemaKey<Model> = Model extends object
  ? {
      [K in keyof Model]-?:
        | `${Exclude<K, symbol>}`
        | (Model[K] extends Array<infer ArrayType>
            ? ArrayType extends object
              ? `${Exclude<K, symbol>}[i]` | `${Exclude<K, symbol>}[i].${DeepSchemaKey<ArrayType>}`
              : `${Exclude<K, symbol>}[i]`
            : Model[K] extends object | undefined
              ? `${Exclude<K, symbol>}.${DeepSchemaKey<NonNullable<Model[K]>>}`
              : never);
    }[keyof Model]
  : never;

export type DeepKey<Model> = Model extends object
  ? {
      [K in keyof Model]-?:
        | `${Exclude<K, symbol>}`
        | (Model[K] extends Array<infer ArrayType>
            ? ArrayType extends object
              ? `${Exclude<K, symbol>}[${number}]` | `${Exclude<K, symbol>}[${number}].${DeepKey<ArrayType>}`
              : `${Exclude<K, symbol>}[${number}]`
            : Model[K] extends object | undefined
              ? `${Exclude<K, symbol>}.${DeepKey<NonNullable<Model[K]>>}`
              : never);
    }[keyof Model]
  : never;

export type DeepValue<Model, Key extends string> = Key extends keyof Model
  ? Model[Key]
  : Key extends `${infer K}[${number}].${infer R}`
    ? K extends keyof Model
      ? Model[K] extends Array<infer ArrayType>
        ? DeepValue<ArrayType, R>
        : never
      : never
    : Key extends `${infer P}.${infer L}[${number}]`
      ? P extends keyof Model
        ? Model[P] extends object
          ? L extends keyof Model[P]
            ? Model[P][L] extends Array<infer ArrayType>
              ? ArrayType
              : never
            : never
          : never
        : never
      : Key extends `${infer K}[${number}]`
        ? K extends keyof Model
          ? Model[K] extends Array<infer ArrayType>
            ? ArrayType
            : never
          : never
        : Key extends `${infer K}.${infer R}`
          ? K extends keyof Model
            ? DeepValue<Model[K], R>
            : never
          : never;

export type ConvertSchemaKeyToKey<Model, Field extends string> = Field extends `${infer Prefix}[i]${infer Suffix}`
  ? ConvertSchemaKeyToKey<Model, `${Prefix}[${number}]${Suffix}`>
  : Field extends DeepKey<Model>
    ? Field
    : never;

export type ValidationSchema<Model> = {
  [Field in DeepSchemaKey<Model>]?: Array<ReturnType<ValidatorFn<any, Model, ConvertSchemaKeyToKey<Model, Field>>>>;
};

export type ValidateFieldFn<Model> = <Field extends DeepKey<Model>>(
  field: Field,
  value: DeepValue<Model, Field & string>,
  values?: Model,
  arrayIndexes?: ArrayIndexes<Field & string>
) => Promise<ErrorMessage | undefined>;
