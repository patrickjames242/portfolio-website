import { technologies, Technology } from "helpers/technologies/technologies";
import React from "react";
import betterLivingApp from "./projectImages/better-living-app.png";
import betterLivingImage from "./projectImages/better-living-site.png";
import screwsWorldImage from "./projectImages/screws-world-site.png";
import swapacropImage from "./projectImages/swapacrop.png";

export interface Project {
	imageUrl: string;
	subtitle: string;
	title: string;
	technologies: Technology[];
	description: React.ReactNode;
	githubLink?: string;
	websiteLink: string;
}

const tech = technologies;
export const allProjects: Project[] = [
	{
		imageUrl: swapacropImage,
		title: "Swapacrop",
		subtitle: "Web Application",
		technologies: [tech.angular, tech.typescript, tech.scss, tech.rxjs],
		description: (
			<>
				This web app is an online marketplace that allows users to buy and sell
				locally grown and made products, inclusive mainly of fruits, vegetables,
				livestock etc. It's mission is to "improve the overall health and
				wellbeing of communities one crop at a time."
				<br />I served as the main front-end developer on this project.
			</>
		),
		websiteLink: "https://swapacrop.com/",
	},
	{
		imageUrl: betterLivingImage,
		title: "Better Living Website",
		subtitle: "Website Landing Page",
		technologies: [tech.react, tech.typescript, tech.scss],
		description: (
			<>
				This is the official website for Better Living Health Center & Deli. It
				was built for the purpose of promoting and marketing the health center
				as well as providing useful information about it.
			</>
		),
		githubLink: "https://github.com/patrickjames242/better-living-website",
		websiteLink: "https://betterlivingnassau.com/",
	},
	{
		imageUrl: betterLivingApp,
		title: "Better Living App",
		subtitle: "Cross Platform App",
		technologies: [
			tech.reactNative,
			tech.typescript,
			tech.python,
			tech.django,
			tech.postgres,
		],
		description: (
			<>
				This app allows users to place food orders at Better Living Health
				Center and browse a collection of health tip videos prepared by the
				proprietor. The app also features a{" "}
				<a
					className="underline-on-hover"
					href="https://en.wikipedia.org/wiki/Content_management_system"
					target="_blank"
					rel="noreferrer"
				>
					CMS
				</a>{" "}
				that allows staff to update information in the app in realtime.
			</>
		),
		githubLink: "https://github.com/patrickjames242/better-living-app",
		websiteLink: "https://app.betterlivingnassau.com/",
	},
	{
		imageUrl: screwsWorldImage,
		title: "Screws World Website",
		subtitle: "Website Landing Page",
		technologies: [
			tech.typescript,
			tech.react,
			tech.scss,
			tech.nodeJS,
			tech.express,
		],
		description: (
			<>
				This serves as the official website of Screws and Fastener's world. It's
				purpose is to market the business and provide customers with a catalog
				of available products. It also features a{" "}
				<a
					className="underline-on-hover"
					href="https://en.wikipedia.org/wiki/Content_management_system"
					target="_blank"
					rel="noreferrer"
				>
					CMS
				</a>{" "}
				that allows the proprietor to update the product catalogue.
			</>
		),
		githubLink: "/",
		websiteLink: "https://screwsworldbahamas.com/",
	},
];
