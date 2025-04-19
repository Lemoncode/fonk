export type Locale = 'en' | 'es';

type Leaves<Entity> = Entity extends object
  ? {
      [K in keyof Entity]: `${Exclude<K, symbol>}${Leaves<Entity[K]> extends never ? '' : `.${Leaves<Entity[K]>}`}`;
    }[keyof Entity]
  : never;

type ParamsForKey<Keys, Key extends Leaves<Keys>> = Key extends `${infer Head}.${infer Tail}`
  ? Head extends keyof Keys
    ? Tail extends Leaves<Keys[Head]>
      ? ParamsForKey<Keys[Head], Tail>
      : never
    : never
  : Key extends keyof Keys
    ? Keys[Key] extends (params: infer P) => any
      ? P
      : never
    : never;

export type GetTranslation<Keys> = <Key extends Leaves<Keys>>(key: Key, params?: ParamsForKey<Keys, Key>) => string;
export type Translations<Keys> = Record<Locale, Keys>;
