import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';

const config: StorybookConfig = {
  stories: [
    '../packages/tree-table/src/**/*.mdx',
    '../packages/tree-table/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    // 使用更快的 react-docgen 而不是 react-docgen-typescript
    reactDocgen: 'react-docgen',
    // 跳过类型检查以加快启动速度
    check: false,
  },
  // 使用自定义的优化 Vite 配置
  async viteFinal(config) {
    return mergeConfig(config, viteConfig);
  },
  // 核心配置优化
  core: {
    disableTelemetry: true, // 禁用遥测
    disableWhatsNewNotifications: true, // 禁用通知
  },
};

export default config;
