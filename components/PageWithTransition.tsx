import { useState, useEffect, useRef } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import cn from "classnames";

const PageWithTransition = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	const [transitioning, setTransitioning] = useState(false);
	const prevScreen = useRef(Component);

	useEffect(() => {
		const enter = () => {
			prevScreen.current = Component;

			setTransitioning(true);
			setTimeout(() => {
				setTransitioning(false);
			}, 280);
		};
		router.events.on("routeChangeStart", enter);
		return () => {
			router.events.off("routeChangeStart", enter);
		};
	}, [Component, router.events]);

	const Screen = !transitioning ? Component : prevScreen.current;

	const className =
		"bg-white overflow-auto p-6 max-h-[30rem] text-left w-full h-full ease-linear duration-200 rounded-xl border shadow-md hover:shadow-xl hover:shadow-gray-200 " +
		cn({
			"animate-slideUpEnter": !transitioning,
			"animate-slideUpLeave": transitioning,
		});

	return (
		<div className={className}>
			<Screen {...pageProps} />
		</div>
	);
};

export default PageWithTransition;
