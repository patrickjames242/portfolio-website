import betterLivingApp from "./projectImages/better-living-app.png";
import betterLivingImage from "./projectImages/better-living-site.png";
import screwsWorldImage from "./projectImages/screws-world-site.png";
import swapacropImage from "./projectImages/swapacrop.png";

export interface Project {
	imageUrl: string;
	subtitle: string;
	title: string;
	technologies: Technology[];
	description: string;
	githubLink?: string;
	websiteLink: string;
}

export interface Technology {
	name: string;
	url: string;
}

const placeholderDescription =
	"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam necessitatibus provident nesciunt harum blanditiis. Cum totam sed explicabo dolorum aspernatur, pariatur aut a voluptate maxime consequuntur eaque quidem autem ipsa assumenda quibusdam";

const tech = {
	typescript: { name: "TypeScript", url: "https://www.typescriptlang.org/" },
	scss: { name: "SCSS", url: "https://sass-lang.com/" },
	react: { name: "React", url: "https://reactjs.org/" },
	angular: { name: "Angular", url: "https://angular.io/" },
	express: { name: "Express", url: "https://expressjs.com/" },
	websockets: {
		name: "WebSockets",
		url: "https://en.wikipedia.org/wiki/WebSocket",
	},
	rxjs: { name: "RxJS", url: "https://rxjs.dev/" },
	reactNative: { name: "React Native", url: "https://reactnative.dev/" },
	expo: { name: "Expo", url: "https://expo.dev/" },
	redux: { name: "Redux", url: "https://redux.js.org/" },
	postgres: { name: "PostgreSQL", url: "https://www.postgresql.org/" },
	python: { name: "Python", url: "https://www.python.org/" },
	django: { name: "Django", url: "https://www.djangoproject.com/" },
	nodeJS: { name: "NodeJS", url: "https://nodejs.org/en/" },
};
export const allProjects: Project[] = [
	{
		imageUrl: swapacropImage,
		title: "Swapacrop",
		subtitle: "Web Application",
		technologies: [tech.angular, tech.typescript, tech.scss, tech.rxjs],
		description: placeholderDescription,
		websiteLink: "https://swapacrop.com/",
	},
	{
		imageUrl: betterLivingImage,
		title: "Better Living Website",
		subtitle: "Website Landing Page",
		technologies: [tech.react, tech.typescript, tech.scss],
		description: placeholderDescription,
		githubLink: "/",
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
		description: placeholderDescription,
		githubLink: "/",
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
		description: placeholderDescription,
		githubLink: "/",
		websiteLink: "https://screwsworldbahamas.com/",
	},
];
