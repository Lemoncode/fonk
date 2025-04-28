// import type { StandardSchemaV1 } from './standard.schema.js';
// import type { DeepKey, ValidationSchema, DeepValue } from './fonk.model.js';
// import { normalizeField } from './fonk.helpers.js';

// type FieldSchemaRecord<Model> = {
//   [Field in DeepKey<Model>]: StandardSchemaV1<DeepValue<Model, Field>>;
// };
// type Fonk<Model> = {
//   /* ... */
// } & FieldSchemaRecord<Model>;

// // TODO: Check this "standard" for validation libraries: https://github.com/standard-schema/standard-schema
// export const getFonk = <Model>(validationSchema: ValidationSchema<Model>): Fonk<Model> => {
//   /* ... */

//   const fieldSchemaRecord: FieldSchemaRecord<Model> = Object.entries(validationSchema).reduce((acc, [field]) => {
//     const normalizedField = normalizeField(field);
//     const value: StandardSchemaV1<DeepValue<Model, DeepKey<Model>>> = {
//       '~standard': {
//         version: 1,
//         vendor: 'fonk',
//         validate: async (value: any) => {
//           try {
//             // TODO: const values = options?.context?.values as Model;
//             const message = await validateField(field as DeepKey<Model>, value);
//             if (message) {
//               return {
//                 issues: [{ message, path: normalizedField.split('.') }],
//               };
//             }
//             return {
//               value,
//               issues: undefined,
//             };
//           } catch (error) {
//             return {
//               issues: [{ message: error instanceof Error ? error.message : 'Unknown error' }],
//             };
//           }
//         },
//       },
//     };
//     acc[normalizedField] = value;
//     return acc;
//   }, {} as FieldSchemaRecord<Model>);

//   return {
//     /* ... */
//     ...fieldSchemaRecord,
//   };
// };
