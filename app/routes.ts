import { type RouteConfig, index, route } from '@react-router/dev/routes';

// 定义应用的路由表。
export default [
  index('routes/home.tsx'),
  route('mobile/demo', 'routes/mobile.demo.tsx'),
] satisfies RouteConfig;
