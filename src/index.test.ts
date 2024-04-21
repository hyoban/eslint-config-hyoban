import { expect, it } from 'vitest'

import { defu } from './utils'

it('should replace array in rules', () => {
  expect(
    defu(
      {
        a: ['1', 'always'],
      },
      {
        a: ['2', 'always'],
      },
    ),
  ).toEqual({
    a: ['1', '2', 'always'],
  })

  expect(
    defu(
      {
        rules: {
          '@typescript-eslint/member-delimiter-style': [
            'error',
            {
              multiline: { delimiter: 'semi', requireLast: false },
              singleline: { delimiter: 'semi', requireLast: false },
              multilineDetection: 'brackets',
            },
          ],
        },
      },
      {
        rules: {
          '@typescript-eslint/member-delimiter-style': [
            'error',
            {
              multiline: { delimiter: 'semi', requireLast: true },
              singleline: { delimiter: 'semi', requireLast: false },
              multilineDetection: 'brackets',
            },
          ],
        },
      },
    ),
  ).toEqual({
    rules: {
      '@typescript-eslint/member-delimiter-style': [
        'error',
        {
          multiline: { delimiter: 'semi', requireLast: false },
          singleline: { delimiter: 'semi', requireLast: false },
          multilineDetection: 'brackets',
        },
      ],
    },
  })
})
