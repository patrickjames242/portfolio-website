import angular from "./technologyIcons/angular.svg";
import css from "./technologyIcons/css.svg";
import django from "./technologyIcons/django.svg";
import firebase from "./technologyIcons/firebase.svg";
import git from "./technologyIcons/git.svg";
import heroku from "./technologyIcons/heroku.svg";
import html from "./technologyIcons/html.svg";
import javascript from "./technologyIcons/javascript.svg";
import laravel from "./technologyIcons/laravel.svg";
import nodeJs from "./technologyIcons/nodejs.svg";
import php from "./technologyIcons/php.svg";
import postgres from "./technologyIcons/postgresql.svg";
import python from "./technologyIcons/python.svg";
import reactNative from "./technologyIcons/react-native.svg";
import react from "./technologyIcons/react.svg";
import redux from "./technologyIcons/redux.svg";
import rxjs from "./technologyIcons/rxjs.svg";
import sass from "./technologyIcons/sass.svg";
import swift from "./technologyIcons/swift.svg";
import typescript from "./technologyIcons/typescript.svg";
import xcode from "./technologyIcons/xcode.png";
export interface Technology {
	name: string;
	url: string;
	iconSrc: string;
}

export const technologies = (() => {
	const x = {
		typescript: {
			name: "TypeScript",
			url: "https://www.typescriptlang.org/",
			iconSrc: typescript,
		},
		scss: {
			name: "SCSS",
			url: "https://sass-lang.com/",
			iconSrc: sass,
		},
		react: {
			name: "React",
			url: "https://reactjs.org/",
			iconSrc: react,
		},
		angular: {
			name: "Angular",
			url: "https://angular.io/",
			iconSrc: angular,
		},
		express: {
			name: "Express",
			url: "https://expressjs.com/",
			iconSrc: "",
		},
		websockets: {
			name: "WebSockets",
			url: "https://en.wikipedia.org/wiki/WebSocket",
			iconSrc: "",
		},
		rxjs: {
			name: "RxJS",
			url: "https://rxjs.dev/",
			iconSrc: rxjs,
		},
		reactNative: {
			name: "React Native",
			url: "https://reactnative.dev/",
			iconSrc: reactNative,
		},
		expo: {
			name: "Expo",
			url: "https://expo.dev/",
			iconSrc: "",
		},
		redux: {
			name: "Redux",
			url: "https://redux.js.org/",
			iconSrc: redux,
		},
		postgres: {
			name: "PostgreSQL",
			url: "https://www.postgresql.org/",
			iconSrc: postgres,
		},
		python: {
			name: "Python",
			url: "https://www.python.org/",
			iconSrc: python,
		},
		django: {
			name: "Django",
			url: "https://www.djangoproject.com/",
			iconSrc: django,
		},
		nodeJS: {
			name: "NodeJS",
			url: "https://nodejs.org/en/",
			iconSrc: nodeJs,
		},
		git: {
			name: "Git",
			url: "https://git-scm.com/",
			iconSrc: git,
		},
		swift: {
			name: "Swift",
			url: "https://developer.apple.com/swift/",
			iconSrc: swift,
		},
		xcode: {
			name: "Xcode",
			iconSrc: xcode,
			url: "https://developer.apple.com/xcode/",
		},
		firebase: {
			name: "Firebase",
			url: "https://firebase.google.com/",
			iconSrc: firebase,
		},
		heroku: {
			name: "Heroku",
			iconSrc: heroku,
			url: "https://www.heroku.com/",
		},
		html: {
			name: "HTML",
			iconSrc: html,
			url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
		},
		css: {
			name: "CSS",
			iconSrc: css,
			url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
		},
		javascript: {
			name: "JavaScript",
			iconSrc: javascript,
			url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
		},
		php: {
			name: "PHP",
			iconSrc: php,
			url: "https://www.php.net/",
		},
		laravel: {
			name: "Laravel",
			iconSrc: laravel,
			url: "https://laravel.com/",
		},
	};
	const technologies: Record<keyof typeof x, Technology> = x;
	return technologies;
})();

export const technologiesList: Technology[] = (() => {
	const t = technologies;
	return [
		t.git,
		t.swift,
		t.xcode,
		t.reactNative,
		t.html,
		t.css,
		t.javascript,
		t.typescript,
		t.scss,
		t.react,
		t.angular,
		t.rxjs,
		t.redux,
		t.nodeJS,
		t.python,
		t.django,
		t.postgres,
		t.firebase,
		t.heroku,
	];
})();
