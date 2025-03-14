import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'IR'],
  defaultLocale: 'en',
  localePrefix:"never"
});