import { useState, useEffect, useRef } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import cn from 'classnames';

const PageWithTransition = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const enter = () => {
      setTransitioning(true);
    };
    const complete = () => {
      setTransitioning(false);
    };
    router.events.on('routeChangeStart', enter);
    router.events.on('routeChangeComplete', complete);
    return () => {
      router.events.off('routeChangeStart', enter);
      router.events.off('routeChangeComplete', complete);
    };
  }, [Component, router.events]);

  const className =
    'page-with-transition ' +
    cn({
      'animate-slideUpEnter': !transitioning,
      'animate-slideUpLeave': transitioning
    });

  return (
    <div className={className}>
      <Component {...pageProps} />
    </div>
  );
};

export default PageWithTransition;
