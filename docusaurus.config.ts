import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import clientConfig from './client.json';

const config: Config = {
  title: clientConfig.orgName,
  tagline: clientConfig.tagline,
  favicon: 'img/favicon.ico',

  url: `https://${clientConfig.slug}.tkbstrategies.com`,
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
      copyright: `Powered by <a href="https://tkbstrategies.com" style="color: var(--tkb-gold-light, #ffd088);">TKB Strategies</a>`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
