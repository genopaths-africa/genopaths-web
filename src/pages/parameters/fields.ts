import type { Field, RuleType } from 'react-querybuilder';
import { defaultOperators } from 'react-querybuilder';
import { musicalInstruments } from './musicalInstruments';

export const validator = (r: RuleType) => !!r.value;

export const fields: Field[] = [
  {
    name: 'sample_name',
    label: 'Sample name',
    placeholder: 'Enter sample name',
    validator,
  },
  {
    name: 'source_level1',
    label: 'Source Level1',
    placeholder: 'Enter Source Level1',
    defaultOperator: 'beginsWith',
    validator,
  },
  {
    name: 'source_level3',
    label: 'Source Level3',
    placeholder: 'Enter Source Level3',
    defaultOperator: 'beginsWith',
    validator,
  },
  {
    name: 'sublocation',
    label: 'Sublocation',
    placeholder: 'Enter Sublocation',
    defaultOperator: 'beginsWith',
    validator,
  },
//   { name: 'age', label: 'Age', inputType: 'number', validator },
  {
    name: 'source_level3',
    label: 'Source Level3',
    placeholder: 'Source Level3',
    defaultOperator: 'beginsWith',
    validator,
  },
  {
    name: 'hhid',
    label: 'HHID',
    valueEditorType: 'checkbox',
    operators: defaultOperators.filter((op) => op.name === '='),
    defaultValue: false,
  },
    {
    name: 'gender',
    label: 'Gender',
    operators: defaultOperators.filter((op) => op.name === '='),
    valueEditorType: 'radio',
    values: [
      { name: 'M', label: 'Male' },
      { name: 'F', label: 'Female' },
      { name: 'O', label: 'Other' },
      { name: 'A', label: 'Any' },
    ],
  },
    { name: 'date', label: 'Date', inputType: 'date' },
//   {
//     name: 'instrument',
//     label: 'Primary instrument',
//     valueEditorType: 'select',
//     values: musicalInstruments,
//     defaultValue: 'Cowbell',
//     operators: defaultOperators.filter((op) => op.name === '='),
//   },
//   {
//     name: 'alsoPlays',
//     label: 'Also plays',
//     valueEditorType: 'multiselect',
//     values: musicalInstruments,
//     defaultValue: 'More cowbell',
//     operators: defaultOperators.filter((op) => op.name === 'in'),
//   },

//   { name: 'height', label: 'Height', validator },
//   { name: 'job', label: 'Job', validator },
//   { name: 'description', label: 'Description', valueEditorType: 'textarea' },
//   { name: 'birthdate', label: 'Birth Date', inputType: 'date' },
//   { name: 'datetime', label: 'Show Time', inputType: 'datetime-local' },
//   { name: 'alarm', label: 'Daily Alarm', inputType: 'time' },
//   {
//     name: 'groupedField1',
//     label: 'Grouped Field 1',
//     comparator: 'groupNumber',
//     groupNumber: 'group1',
//     valueSources: ['field', 'value'],
//   },
//   {
//     name: 'groupedField2',
//     label: 'Grouped Field 2',
//     comparator: 'groupNumber',
//     groupNumber: 'group1',
//     valueSources: ['field', 'value'],
//   },
//   {
//     name: 'groupedField3',
//     label: 'Grouped Field 3',
//     comparator: 'groupNumber',
//     groupNumber: 'group1',
//     valueSources: ['field', 'value'],
//   },
//   {
//     name: 'groupedField4',
//     label: 'Grouped Field 4',
//     comparator: 'groupNumber',
//     groupNumber: 'group1',
//     valueSources: ['field', 'value'],
//   },
];