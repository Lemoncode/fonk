export type ErrorMessage = string;

export type Errors<Model, ValidationResult = ErrorMessage> =
  | Partial<Record<DeepKey<Model>, ValidationResult | undefined>>
  | undefined;

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

export type ValidatorFn<
  CustomArgs = {},
  ValidationResult = ErrorMessage,
  Model = any,
  Field extends DeepKey<Model> = any,
> = (
  props?: ValidatorProps<CustomArgs>
) => (props: InternalValidatorProps<Model, Field>) => ValidationResult | Promise<ValidationResult> | undefined;

export type DeepKey<Model> = Model extends object
  ? {
      [K in keyof Model]: Model[K] extends Array<infer ArrayType>
        ? ArrayType extends object
          ?
              | `${Exclude<K, symbol>}`
              | `${Exclude<K, symbol>}[i].${DeepKey<ArrayType>}`
              | `${Exclude<K, symbol>}[${number}].${DeepKey<ArrayType>}`
          : `${Exclude<K, symbol>}` | `${Exclude<K, symbol>}[i]` | `${Exclude<K, symbol>}[${number}]`
        : Model[K] extends object
          ? `${Exclude<K, symbol>}.${DeepKey<Model[K]>}` | `${Exclude<K, symbol>}`
          : `${Exclude<K, symbol>}`;
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

export type ValidationSchema<Model, ValidationResult = ErrorMessage> = {
  [Field in DeepKey<Model>]?: Array<ReturnType<ValidatorFn<any, ValidationResult, Model, Field>>>;
};

export type ValidateFieldFn<Model, ValidationResult = ErrorMessage> = <Field extends DeepKey<Model>>(
  field: Field,
  value: DeepValue<Model, Field & string>,
  values?: Model,
  arrayIndexes?: ArrayIndexes<Field & string>
) => Promise<ValidationResult | undefined>;
