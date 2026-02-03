import type { Route } from './+types/home';

export function meta(_args: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home(): React.ReactElement {
  return <div />;
}
