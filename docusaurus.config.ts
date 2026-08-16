import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Kiit',
  tagline: 'A lightweight, modular Kotlin framework. Adopt one module at a time.',
  // TODO: placeholder Docusaurus favicon, swap for a real Kiit favicon once one exists.
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://www.kiit.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'kiitdev',
  projectName: 'kiit-site',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // TODO: Step 4 replaces this single default docs instance with two
          // versioned instances, one each for kiit-codes and kiit-result.
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/kiitdev/kiit-site/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/kiitdev/kiit-site/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // TODO: swap for a real Kiit social card once one exists.
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Kiit',
      // No navbar logo yet — no dedicated overall Kiit mark exists, only the
      // per-module logos (kiit-codes, kiit-result) used on the homepage cards.
      items: [
        {
          // TODO: Step 4 splits this into separate kiit-codes / kiit-result
          // doc instances (a dropdown or two links). Points at the default
          // single docs instance for now so the link isn't dangling.
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/kiitdev',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Modules',
          items: [
            {
              label: 'kiit-codes',
              href: 'https://github.com/kiitdev/kiit-codes',
            },
            {
              label: 'kiit-result',
              href: 'https://github.com/kiitdev/kiit-result',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/kiitdev',
            },
          ],
        },
      ],
      copyright: `Kiit is a lightweight, modular Kotlin framework for building server applications, APIs, CLIs, and jobs. Adopt one module at a time.<br />Copyright © ${new Date().getFullYear()} Kiit.`,
    },
    // Dark code block background in both site themes (not just dark mode).
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
