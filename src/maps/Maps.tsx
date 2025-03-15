import React, { useEffect, useRef } from "react";
import "../css/Maps.css";
import Reset from "../../public/reset-svgrepo-com.svg";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Coordinate from "./components/Coordinate";

// Cloud Particle Component
interface CloudParticleProps {
	index: number;
}

const CloudParticle: React.FC<CloudParticleProps> = ({ index }) => {
	const cloudRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const cloud = cloudRef.current;
		if (cloud) {
			const size = Math.random() * 100 + 100; // Random size between 50px and 150px
			const x = Math.random() * 100; // Random horizontal position (0-100%)
			const y = Math.random() * 30 - 10; // Random vertical position (-10% to 20% - closer to the top)
			const delay = Math.random() * 20; // Random animation delay (0-30 seconds)
			const cloudImages = [
				"/clouds/cloud1.png",
				"/clouds/cloud2.png",
				"/clouds/cloud3.png",
			]; // Replace with your cloud image paths
			const imageIndex = Math.floor(Math.random() * cloudImages.length); // Random image
			const image = cloudImages[imageIndex];

			cloud.style.width = `${size}px`;
			cloud.style.height = `${size * 0.5}px`; // Make them a bit wider than tall
			cloud.style.left = `${x}%`;
			cloud.style.top = `${y}%`;
			cloud.style.zIndex = "20";
			cloud.style.animationDelay = `${delay}s`;
			cloud.style.backgroundImage = `url(${image})`;
		}
	}, [index]);

	return <div className="cloud-particle" ref={cloudRef}></div>;
};

// Dust Particle Component (Previous Code - No changes needed)
interface DustParticleProps {
	index: number;
}

const DustParticle: React.FC<DustParticleProps> = ({ index }) => {
	const particleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const particle = particleRef.current;
		if (particle) {
			const size = Math.random() * 4 + 2; // Random size between 2px and 6px
			const x = Math.random() * 100; // Random horizontal position (0-100%)
			const y = Math.random() * 100; // Random vertical position (0-100%)
			const delay = Math.random() * 2; // Random animation delay (0-5 seconds)

			particle.style.width = `${size}px`;
			particle.style.height = `${size}px`;
			particle.style.left = `${x}%`;
			particle.style.top = `${y}%`;
			particle.style.animationDelay = `${delay}s`;
		}
	}, [index]);

	return <div className="dust-particle" ref={particleRef}></div>;
};

function Maps() {
	const numClouds = 7; // Adjust the number of clouds as needed
	const numParticles = 50; // Adjust the number of dust particles as needed

	return (
		<div className="w-full flex items-center justify-center h-screen relative overflow-hidden bg-gradient-to-br from-[#9EC2C0] to-[#6AA6BD] flex-col">
			{/* For Desktop */}
			<div
				style={{ backgroundImage: "url(/map2.webp)" }}
				className="fixed inset-0 md:bg-cover bg-center bg-no-repeat hidden md:block"
			/>
			<TransformWrapper
				initialScale={1}
				minScale={1}
				maxScale={5}
				doubleClick={{ disabled: true }} // Prevent double-click zoom
			>
				{({ zoomIn, zoomOut, resetTransform }) => (
					<>
						{/* Optional Zoom Controls */}
						<div className="fixed bottom-4 right-4 z-10 space-x-2 flex flex-col space-y-2 justify-end md:hidden">
							<button
								onClick={() => zoomIn()}
								className="bg-white py-1 font-semibold px-3 rounded-md drop-shadow-2xl text-xl flex items-center justify-center text-[var(--primary-color)]">
								+
							</button>
							<button
								onClick={() => zoomOut()}
								className="bg-white py-1 font-semibold px-3 rounded-md drop-shadow-2xl text-xl flex items-center justify-center text-[var(--primary-color)]">
								-
							</button>
							<button
								onClick={() => resetTransform()}
								className="bg-red-500 cursor-pointer  flex items-center justify-center text-white w-fit px-3 py-2 rounded-md">
								<img
									src={Reset}
									alt="Reset svg"
									width={32}
									height={32}
									className="w-4 text-white"
								/>
							</button>
						</div>

						<TransformComponent>
							<img
								src="/map2.webp"
								alt="Game map"
								width={2200}
								height={2200}
								className="w-full h-auto md:hidden"
							/>
						</TransformComponent>
					</>
				)}
			</TransformWrapper>
			{/* <div
				style={{ backgroundImage: "url(/map3.webp)" }}
				className="fixed inset-0 md:bg-cover bg-center bg-no-repeat hidden md:block"
			/>

			<img
				src="/map3.webp"
				alt="Game map"
				width={2200}
				height={2200}
				className="w-auto md:hidden"
			/> */}

			{/* Cloud Particles */}
			{[...Array(numClouds)].map((_, index) => (
				<CloudParticle key={`cloud-${index}`} index={index} />
			))}

			{/* Dust Particles */}
			{[...Array(numParticles)].map((_, index) => (
				<DustParticle key={`dust-${index}`} index={index} />
			))}

			{/* Show Coordinate */}
			<Coordinate />

			{/* Optional: Overlay to darken/tint the background */}
			<div className="fixed inset-0 bg-black opacity-10"></div>
		</div>
	);
}

export default Maps;
