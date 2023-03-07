import Image from "next/image";

import avartarImg from "../public/avatarImg.png";
import mainBackground from "../public/mainBackground.jpg";

const MainAvartar = () => {
	return (
		<section className="h-[30rem] self-stretch border rounded-xl w-3/5 border-gray-200">
			<div className="flex flex-col items-center justify-end bg-cover bg-avartar w-full h-full rounded-xl">
				<Image
					alt="avatarImg"
					className="rounded-full border self-auto translate-y-10"
					src={avartarImg}
					height={150}
					width={150}
				/>
				<div className="w-full h-1/6 bg-white"></div>
				<div className="flex gap-2 justify-between w-full h-auto rounded-bl-xl rounded-br-xl p-1 bg-white">
					<button className="bg-white rounded-xl border basis-1/2 py-2">
						My Linkedin
					</button>
					<button className="bg-white rounded-xl border basis-1/2 py-2">
						Download CV
					</button>
				</div>
			</div>
		</section>
	);
};

export default MainAvartar;
