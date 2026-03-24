import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import client from './client.json';

function adjustHex(hex: string, amount: number): string {
  const normalized = hex.replace('#', '');
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized;

  const channels = [0, 2, 4].map((start) =>
    Math.max(
      0,
      Math.min(255, parseInt(value.slice(start, start + 2), 16) + amount),
    ),
  );

  return `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}

const clientAccentCss = `
:root {
  --ifm-color-primary: ${client.primaryColor};
  --ifm-color-primary-dark: ${adjustHex(client.primaryColor, -18)};
  --ifm-color-primary-darker: ${adjustHex(client.primaryColor, -28)};
  --ifm-color-primary-darkest: ${adjustHex(client.primaryColor, -52)};
  --ifm-color-primary-light: ${adjustHex(client.primaryColor, 18)};
  --ifm-color-primary-lighter: ${adjustHex(client.primaryColor, 30)};
  --ifm-color-primary-lightest: ${adjustHex(client.primaryColor, 54)};
  --tkb-accent-secondary: ${client.secondaryColor};
  --tkb-accent-secondary-light: ${adjustHex(client.secondaryColor, 64)};
}

[data-theme='dark'] {
  --ifm-color-primary: ${adjustHex(client.primaryColor, 20)};
  --ifm-color-primary-dark: ${client.primaryColor};
  --ifm-color-primary-darker: ${adjustHex(client.primaryColor, -12)};
  --ifm-color-primary-darkest: ${adjustHex(client.primaryColor, -28)};
  --ifm-color-primary-light: ${adjustHex(client.primaryColor, 42)};
  --ifm-color-primary-lighter: ${adjustHex(client.primaryColor, 58)};
  --ifm-color-primary-lightest: ${adjustHex(client.primaryColor, 76)};
  --tkb-accent-secondary: ${adjustHex(client.secondaryColor, 24)};
  --tkb-accent-secondary-light: ${adjustHex(client.secondaryColor, 78)};
}
`;

const config: Config = {
  title: client.orgName,
  tagline: client.tagline,
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: `https://${client.slug}.tkbstrategies.com`,
  baseUrl: '/',
  organizationName: 'TKB-Strategies',
  projectName: 'client-site-template',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  stylesheets: [
    `data:text/css;charset=utf-8,${encodeURIComponent(clientAccentCss)}`,
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          exclude: ['**/CLAUDE.md'],
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
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: client.orgName,
      logo: {
        alt: 'Client Site Template Logo',
        src: client.logoPath,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'defaultSidebar',
          position: 'left',
          label: 'Engagement',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright:
        'Powered by <a href="https://tkbstrategies.com" target="_blank" rel="noopener noreferrer">TKB Strategies</a>',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
