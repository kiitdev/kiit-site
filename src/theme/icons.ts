import {
  IconApi,
  IconBrandGithub,
  IconBrandKotlin,
  IconBrandSwift,
  IconBug,
  IconCheck,
  IconCircleCheck,
  IconCircleX,
  IconCloud,
  IconCode,
  IconDatabase,
  IconGitBranch,
  IconLock,
  IconLockOpen,
  IconMap,
  IconNetwork,
  IconPackage,
  IconRocket,
  IconServer,
  IconSettings,
  IconShieldLock,
  IconStack2,
  IconTerminal2,
  IconWebhook,
  type Icon,
} from '@tabler/icons-react';

/**
 * Canonical icon names used across the site, mapped to the Tabler component
 * that currently renders them. Everything else imports from here (or uses
 * the <Icon name="..."/> component below) instead of importing Tabler
 * directly, so swapping icon libraries later is a one-file change.
 */
export const icons = {
  api: IconApi,
  bug: IconBug,
  check: IconCheck,
  cloud: IconCloud,
  code: IconCode,
  database: IconDatabase,
  'git-branch': IconGitBranch,
  github: IconBrandGithub,
  kotlin: IconBrandKotlin,
  lock: IconLock,
  'lock-open': IconLockOpen,
  network: IconNetwork,
  package: IconPackage,
  passed: IconCircleCheck,
  'rejected': IconCircleX,
  restricted: IconShieldLock,
  roadmap: IconMap,
  rocket: IconRocket,
  server: IconServer,
  settings: IconSettings,
  stack: IconStack2,
  swift: IconBrandSwift,
  terminal: IconTerminal2,
  webhook: IconWebhook,
} satisfies Record<string, Icon>;

export type IconName = keyof typeof icons;

export default icons;
