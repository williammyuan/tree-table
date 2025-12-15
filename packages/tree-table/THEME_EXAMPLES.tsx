import React, { useState } from 'react';
import { TreeTable, TreeNode, ColumnDef, ThemeConfig } from '@kfb/tree-table';
import '@kfb/tree-table/dist/styles/TreeTable.css';
import '@kfb/tree-table/dist/styles/TreeTable.theme.css';

// 定义数据类型
interface DataNode extends TreeNode {
  name: string;
  type: string;
  description: string;
}

// 示例数据
const data: DataNode[] = [
  {
    id: '1',
    name: 'root',
    type: 'object',
    description: '根节点',
    children: [
      {
        id: '1-1',
        name: 'child1',
        type: 'string',
        description: '子节点1',
      },
      {
        id: '1-2',
        name: 'child2',
        type: 'number',
        description: '子节点2',
      },
    ],
  },
];

// 列配置
const columns: ColumnDef<DataNode>[] = [
  {
    key: 'name',
    title: '名称',
    width: 200,
  },
  {
    key: 'type',
    title: '类型',
    width: 120,
  },
  {
    key: 'description',
    title: '描述',
    flex: 1,
  },
];

// ========== 示例1: 基础主题切换 ==========
export function BasicThemeExample() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'auto'>('light');

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setThemeMode('light')}>☀️ 明亮</button>
        <button onClick={() => setThemeMode('dark')}>🌙 深色</button>
        <button onClick={() => setThemeMode('auto')}>🔄 跟随系统</button>
      </div>

      <TreeTable
        data={data}
        columns={columns}
        theme={{ mode: themeMode }}
      />
    </div>
  );
}

// ========== 示例2: 自定义品牌主题 ==========
export function BrandThemeExample() {
  // 紫色品牌主题
  const purpleBrandTheme: ThemeConfig = {
    mode: 'dark',
    cssVariables: {
      // 品牌主色
      '--tree-table-primary-color': '#7c3aed',
      '--tree-table-primary-hover': '#8b5cf6',
      
      // 品牌强调色
      '--tree-table-accent-color': '#f59e0b',
      '--tree-table-accent-hover': '#fbbf24',
      
      // 深色背景
      '--tree-table-bg-container': '#0f0f0f',
      '--tree-table-bg-header': '#1a1a1a',
      '--tree-table-bg-body': '#0f0f0f',
    },
  };

  return (
    <TreeTable
      data={data}
      columns={columns}
      theme={purpleBrandTheme}
    />
  );
}

// ========== 示例3: 跟随系统主题 ==========
export function AutoThemeExample() {
  // 使用 auto 模式自动跟随系统主题
  return (
    <TreeTable
      data={data}
      columns={columns}
      theme={{ mode: 'auto' }}
    />
  );
}

// ========== 示例4: 与全局主题系统集成 ==========

// 假设你有一个全局主题上下文
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export function IntegratedThemeExample() {
  const { theme } = React.useContext(ThemeContext);

  return (
    <TreeTable
      data={data}
      columns={columns}
      theme={{ mode: theme }}
    />
  );
}

// ========== 示例5: 监听系统主题变化 ==========
function useSystemTheme() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isDark;
}

export function SystemThemeExample() {
  const isDarkMode = useSystemTheme();

  return (
    <div>
      <p>当前系统主题: {isDarkMode ? '深色' : '明亮'}</p>
      <TreeTable
        data={data}
        columns={columns}
        theme={{ mode: isDarkMode ? 'dark' : 'light' }}
      />
    </div>
  );
}

// ========== 示例6: 主题持久化 ==========
function usePersistedTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('tree-table-theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  React.useEffect(() => {
    localStorage.setItem('tree-table-theme', theme);
  }, [theme]);

  return [theme, setTheme] as const;
}

export function PersistedThemeExample() {
  const [theme, setTheme] = usePersistedTheme();

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换主题 (当前: {theme === 'light' ? '明亮' : '深色'})
      </button>

      <TreeTable
        data={data}
        columns={columns}
        theme={{ mode: theme }}
      />
    </div>
  );
}

// ========== 示例7: 多个预设主题 ==========
type PresetTheme = 'light' | 'dark' | 'blue' | 'purple' | 'green';

const PRESET_THEMES: Record<PresetTheme, ThemeConfig> = {
  light: {
    mode: 'light',
  },
  dark: {
    mode: 'dark',
  },
  blue: {
    mode: 'dark',
    cssVariables: {
      '--tree-table-primary-color': '#1e90ff',
      '--tree-table-accent-color': '#00bfff',
    },
  },
  purple: {
    mode: 'dark',
    cssVariables: {
      '--tree-table-primary-color': '#7c3aed',
      '--tree-table-accent-color': '#f59e0b',
    },
  },
  green: {
    mode: 'dark',
    cssVariables: {
      '--tree-table-primary-color': '#10b981',
      '--tree-table-accent-color': '#34d399',
    },
  },
};

export function PresetThemesExample() {
  const [currentTheme, setCurrentTheme] = useState<PresetTheme>('light');

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <select 
          value={currentTheme} 
          onChange={(e) => setCurrentTheme(e.target.value as PresetTheme)}
        >
          <option value="light">明亮</option>
          <option value="dark">深色</option>
          <option value="blue">蓝色主题</option>
          <option value="purple">紫色主题</option>
          <option value="green">绿色主题</option>
        </select>
      </div>

      <TreeTable
        data={data}
        columns={columns}
        theme={PRESET_THEMES[currentTheme]}
      />
    </div>
  );
}

// ========== 示例8: 高对比度主题（无障碍） ==========
export function HighContrastThemeExample() {
  const highContrastTheme: ThemeConfig = {
    mode: 'dark',
    cssVariables: {
      // 高对比度背景
      '--tree-table-bg-container': '#000000',
      '--tree-table-bg-header': '#1a1a1a',
      '--tree-table-bg-body': '#000000',
      
      // 高对比度文字
      '--tree-table-text-primary': '#ffffff',
      '--tree-table-text-secondary': '#ffffff',
      
      // 高对比度边框
      '--tree-table-border-color': '#ffffff',
      '--tree-table-border-color-light': '#666666',
    },
  };

  return (
    <TreeTable
      data={data}
      columns={columns}
      theme={highContrastTheme}
    />
  );
}
