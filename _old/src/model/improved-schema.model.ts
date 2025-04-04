interface ValidationResult {
  type: string;
  succeeded: boolean;
  message: string;
}

interface ValidatorProps<CustomArgs> {
  value: any;
  values?: any;
  customArgs?: CustomArgs;
  message?: string;
}

interface FieldValidator<CustomArgs = unknown> {
  validator: (props: ValidatorProps<CustomArgs>) => Promise<ValidationResult>;
  customArgs?: any;
  message?: string;
}

type Leaves<Entity> = Entity extends object
  ? {
      [K in keyof Entity]: `${Exclude<K, symbol>}${Leaves<
        Entity[K]
      > extends never
        ? ''
        : `.${Leaves<Entity[K]>}`}`;
    }[keyof Entity]
  : never;

type ValidationSchema<Entity> = Record<Leaves<Entity>, FieldValidator[]>;

interface MyForm {
  name: string;
  email: string;
  client: {
    id: number;
    name: string;
  };
  acceptedTerms: boolean;
}

const maxLength = async (props: ValidatorProps<{ length: number }>) => {};

const validationSchema: ValidationSchema<MyForm> = {
  'client.id': [{}],
};
