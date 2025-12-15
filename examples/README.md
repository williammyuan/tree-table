# 性能优化示例

## 运行性能演示

### 1. 在浏览器中查看
将 `performance-demo.tsx` 集成到你的 React 应用中:

```tsx
import PerformanceDemo from './examples/performance-demo';

function App() {
  return <PerformanceDemo />;
}
```

### 2. 运行性能基准测试

在 Node.js 环境中运行:

```bash
# 进入 tree-table 包目录
cd packages/tree-table

# 运行性能测试
node --loader tsx src/utils/performance-test.ts
```

或者在浏览器控制台中:

```javascript
import { runBenchmarkSuite } from '@kfb/tree-table/utils/performance-test';

// 运行完整的基准测试套件
await runBenchmarkSuite();

// 或者运行单个测试
import { runPerformanceTest } from '@kfb/tree-table/utils/performance-test';
await runPerformanceTest(
  5,    // 树深度
  4,    // 每层子节点数
  100   // 迭代次数
);
```

## 性能对比

### 测试场景
- **小数据量** (~40节点): 基础性能验证
- **中等数据量** (~340节点): 常见业务场景
- **大数据量** (~1365节点): 复杂树形结构
- **超大数据量** (~4000+节点): 极限场景测试

### 预期结果

| 数据规模 | structuredClone | Immer | 性能提升 |
|---------|----------------|-------|---------|
| 小 (~40) | ~2ms | ~0.5ms | **4x** |
| 中 (~340) | ~15ms | ~1.5ms | **10x** |
| 大 (~1365) | ~60ms | ~3ms | **20x** |
| 超大 (~4000+) | ~200ms | ~5ms | **40x** |

*实际性能取决于硬件配置和浏览器版本*

## 性能优化要点

### 1. Immer 的优势
- ✅ **结构共享**: 只克隆修改路径上的节点
- ✅ **写时复制**: 未修改的节点复用原引用
- ✅ **内存效率**: 减少 90% 的内存分配
- ✅ **GC 友好**: 减少垃圾回收压力

### 2. 最佳实践
```typescript
// ✅ 推荐: 使用 Immer
const newData = produce(data, (draft) => {
  draft[0].name = 'new name';
});

// ❌ 避免: 完整深拷贝
const newData = structuredClone(data);
newData[0].name = 'new name';
```

### 3. 批量更新
```typescript
// ✅ 一次更新完成多个修改
const newData = produce(data, (draft) => {
  draft[0].name = 'A';
  draft[1].name = 'B';
  draft[2].name = 'C';
});

// ❌ 避免多次更新
let data = original;
data = produce(data, d => { d[0].name = 'A' });
data = produce(data, d => { d[1].name = 'B' });
data = produce(data, d => { d[2].name = 'C' });
```

## 监控性能

### 使用 React DevTools Profiler
1. 安装 React DevTools 浏览器扩展
2. 打开 Profiler 标签
3. 点击录制按钮
4. 执行操作(添加、删除、更新节点)
5. 停止录制,查看性能火焰图

### 使用 Performance API
```typescript
const start = performance.now();
// 执行操作
const duration = performance.now() - start;
console.log(`Operation took ${duration}ms`);
```

### 使用 Chrome DevTools Performance
1. 打开 Chrome DevTools
2. 切换到 Performance 标签
3. 点击录制按钮
4. 执行操作
5. 停止录制,分析性能瓶颈

## 故障排查

### 性能未提升?
1. 检查是否正确使用 Immer
2. 确认没有在 produce 外部修改 draft
3. 避免不必要的深拷贝操作
4. 检查是否有其他性能瓶颈(渲染、计算等)

### 内存占用高?
1. 检查是否有内存泄漏
2. 确认旧数据引用已释放
3. 考虑使用虚拟滚动减少 DOM 节点
4. 定期清理不需要的数据

## 相关文档
- [性能优化详细说明](../PERFORMANCE_OPTIMIZATION.md)
- [Immer 官方文档](https://immerjs.github.io/immer/)
- [React 性能优化指南](https://react.dev/learn/render-and-commit)




