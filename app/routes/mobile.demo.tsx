import type { Route } from './+types/mobile.demo';
import FeatureMobile from '../components/feature/FeatureMobile';

export function meta(_args: Route.MetaArgs): Route.MetaDescriptors {
  return [{ title: 'Mobile Demo' }, { name: 'description', content: 'Mobile demo view.' }];
}

export default function MobileDemo(): React.ReactElement {
  return (
    <>
      <style>{`
        :root {
          color-scheme: dark;
        }

        html,
        body,
        #root {
          height: 100%;
        }

        .mobile-demo-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.6) transparent;
        }

        .mobile-demo-scroll::-webkit-scrollbar {
          width: 2px;
        }

        .mobile-demo-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .mobile-demo-scroll::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.6);
          border-radius: 2px;
        }
      `}</style>
      <div className="mobile-demo-scroll h-full w-full overflow-x-hidden overflow-y-auto bg-transparent">
        <FeatureMobile />
      </div>
    </>
  );
}
