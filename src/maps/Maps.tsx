import React, { useEffect, useRef } from "react";
import "../css/Maps.css";
import Coordinate from "./components/Coordinate";
import FarmMapWeb from "../assets/farm-map-web.webp";
import { CLOUD_IMAGES } from "../constants";
import { getRandomValue } from "../utils";

// Cloud Particle Component
interface CloudParticleProps {
	index: number;
}

const CloudParticle: React.FC<CloudParticleProps> = ({ index }) => {
	const cloudRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const cloud = cloudRef.current;
		if (cloud) {
			const size = getRandomValue(100, 200); // Random size between 100px and 200px
			const x = getRandomValue(0, 100); // Random horizontal position (0-100%)
			const y = getRandomValue(-10, 20); // Random vertical position (-10% to 20%)
			const delay = getRandomValue(0, 20); // Random animation delay (0-20 seconds)
			const imageIndex = Math.floor(Math.random() * CLOUD_IMAGES.length); // Random image index
			const image = CLOUD_IMAGES[imageIndex];

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
			const size = getRandomValue(2, 6); // Random size between 2px and 6px
			const x = getRandomValue(0, 100); // Random horizontal position (0-100%)
			const y = getRandomValue(0, 100); // Random vertical position (0-100%)
			const delay = getRandomValue(0, 5); // Random animation delay (0-5 seconds)

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
			<img
				src={FarmMapWeb}
				alt="Farm map image"
				width={2500}
				height={2500}
				className="w-screen h-screen hidden md:block"
			/>
			<img
				src="/farm-map.webp"
				alt="Game map"
				width={2200}
				height={2200}
				className="h-screen w-screen md:hidden"
			/>

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
			{/* <div className="fixed inset-0 bg-black opacity-10"></div> */}
		</div>
	);
}

export default Maps;
