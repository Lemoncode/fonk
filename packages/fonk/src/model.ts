export type ErrorMessage = string;

export type Errors<Model> = Partial<Record<DeepKey<Model>, ErrorMessage | undefined>> | undefined;

export interface InternalValidatorProps<Model, Field extends DeepKey<Model>> {
  value: DeepValue<Model, Field & string>;
  values?: Model;
}

export type ValidatorProps<CustomArgs = {}> = CustomArgs & {
  message?: string;
};

export type ValidatorFn<CustomArgs = {}, Model = any, Field extends DeepKey<Model> = any> = (
  props?: ValidatorProps<CustomArgs>
) => (props: InternalValidatorProps<Model, Field>) => ErrorMessage | Promise<ErrorMessage> | undefined;

export type DeepKey<Model> = Model extends object
  ? {
      [K in keyof Model]: `${Exclude<K, symbol>}${DeepKey<Model[K]> extends never ? '' : `.${DeepKey<Model[K]>}`}`;
    }[keyof Model]
  : never;

export type DeepValue<Model, Key extends string> = Key extends keyof Model
  ? Model[Key]
  : Key extends `${infer K}.${infer R}`
    ? K extends keyof Model
      ? DeepValue<Model[K], R>
      : never
    : never;

export type ValidationSchema<Model> = {
  [Field in DeepKey<Model>]?: Array<ReturnType<ValidatorFn<any, Model, Field>>>;
};
