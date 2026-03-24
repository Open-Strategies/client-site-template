import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import clientConfig from './client.json';

const config: Config = {
  title: clientConfig.orgName,
  tagline: clientConfig.tagline,
  favicon: 'img/favicon.ico',

  // Set siteUrl in client.json, or override with SITE_URL environment variable at build time
  url: process.env.SITE_URL || clientConfig.siteUrl || 'https://example.com',
  baseUrl: '/',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: clientConfig.orgName,
      hideOnScroll: true,
      logo: clientConfig.logoPath
        ? {
            alt: clientConfig.orgName,
            src: clientConfig.logoPath,
          }
        : undefined,
      items: [],
    },
    footer: {
      style: 'dark',
      copyright: clientConfig.tagline,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
