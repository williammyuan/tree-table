import type { Preview } from '@storybook/react';
import { createElement } from 'react';
import '../packages/tree-table/src/styles/TreeTable.css';
// @ts-ignore
import packageJson from '../packages/tree-table/package.json';

const preview: Preview = {
  globalTypes: {
    locale: {
      name: 'Language',
      description: 'Switch language for stories',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'zh', title: '简体中文' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story) => 
      createElement('div', { style: { position: 'relative' } }, [
        createElement('div', {
          key: 'version-badge',
          style: {
            position: 'fixed',
            top: '10px',
            right: '10px',
            padding: '6px 12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 9999,
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }
        }, [
          createElement('span', { key: 'v-label', style: { opacity: 0.9 } }, 'v'),
          createElement('span', { key: 'version' }, packageJson.version)
        ]),
        createElement(Story, { key: 'story' })
      ])
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
  },
  tags: ['autodocs'],
};

export default preview;
