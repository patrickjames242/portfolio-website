import { technologies, Technology } from 'helpers/technologies/technologies';
import React, { CSSProperties } from 'react';
import { DocumentViewerHeaderButton } from './DocumentViewer/DocumentViewerHeader';
import {
  DocumentViewerItem,
  documentViewerItemImage,
  documentViewerWebsiteDemo,
} from './DocumentViewer/helpers';
import betterLivingAppImage from './projectImages/better-living-app.png';
import betterLivingImage from './projectImages/better-living-site.png';
import chatCamImage from './projectImages/chat-cam-image.png';
import screwsWorldImage from './projectImages/screws-world-site.png';
import swapacropImage from './projectImages/swapacrop.png';
import teleconnectImage from './projectImages/teleconnect.jpg';

export interface Project {
  imageUrls: (string | { url: string; imageStyle?: CSSProperties })[];
  subtitle: string;
  title: string;
  technologies: Technology[];
  description: React.ReactNode;
  githubLink?: string;
  websiteLink: string;
  appStoreLink?: string;
  playStoreLink?: string;
  documentViewerItems: DocumentViewerItem[];
}

function project(
  project: Omit<Project, 'documentViewerItems'> & {
    documentViewerItems: {
      data: DocumentViewerItem.Data;
      description?: string;
      title?: string;
      headerButtons?: DocumentViewerHeaderButton;
    }[];
  },
): Project {
  return {
    ...project,
    documentViewerItems: project.documentViewerItems.map<DocumentViewerItem>(
      (item) => ({
        ...item,
        headerButtons: [],
        title: project.title,
      }),
    ),
  };
}

const tech = technologies;
export const allProjects: Project[] = [
  project({
    imageUrls: [
      {
        url: teleconnectImage,
        imageStyle: {
          height: '100%',
          objectFit: 'contain',
          backgroundColor: '#63a8f8',
        },
      },
    ],
    title: 'TeleConnect',
    subtitle: 'Web & Mobile Application',
    technologies: [tech.react, tech.reactNative, tech.php, tech.laravel],
    description: (
      <>
        {
          "This is a web and mobile application that allows Patients to request medical services from Doctor's Hospital and pay for them online."
        }
        <br />I served as the main front-end developer on this project.
      </>
    ),
    websiteLink: 'https://dhconnect.doctorshosp.com',
    documentViewerItems: [
      {
        data: documentViewerItemImage(teleconnectImage),
      },
    ],
  }),
  project({
    imageUrls: [swapacropImage],
    title: 'Swapacrop',
    subtitle: 'Web Application',
    technologies: [tech.angular, tech.typescript, tech.scss, tech.rxjs],
    description: (
      <>
        {
          'This web app is an online marketplace that allows users to buy and sell locally grown and made products, inclusive mainly of fruits, vegetables, livestock etc. It\'s mission is to "improve the overall health and wellbeing of communities one crop at a time."'
        }
        <br />I served as the main front-end developer on this project.
      </>
    ),
    websiteLink: 'https://swapacrop.com/',
    documentViewerItems: [
      {
        data: documentViewerItemImage(swapacropImage),
      },
    ],
  }),
  project({
    imageUrls: [betterLivingImage],
    title: 'Better Living Website',
    subtitle: 'Website Landing Page',
    technologies: [tech.react, tech.typescript, tech.scss],
    description: (
      <>
        This is the official website for Better Living Health Center & Deli. It
        was built for the purpose of promoting and marketing the health center
        as well as providing useful information about it.
      </>
    ),
    githubLink: 'https://github.com/patrickjames242/better-living-website',
    websiteLink: 'https://betterlivingnassau.com/',
    documentViewerItems: [
      { data: documentViewerWebsiteDemo('https://betterlivingnassau.com') },
    ],
  }),
  project({
    imageUrls: [betterLivingAppImage],
    title: 'Better Living App',
    subtitle: 'Cross Platform App',
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
        proprietor. The app also features a{' '}
        <a
          className="underline-on-hover"
          href="https://en.wikipedia.org/wiki/Content_management_system"
          target="_blank"
          rel="noreferrer"
        >
          CMS
        </a>{' '}
        that allows staff to update information in the app in realtime.
      </>
    ),
    githubLink: 'https://github.com/patrickjames242/better-living-app',
    websiteLink: 'https://app.betterlivingnassau.com/',
    playStoreLink:
      'https://play.google.com/store/apps/details?id=com.patrickhanna.betterliving',
    appStoreLink:
      'https://apps.apple.com/lr/app/better-living-health-center/id1541047557',
    documentViewerItems: [
      { data: documentViewerItemImage(betterLivingAppImage) },
    ],
  }),
  project({
    imageUrls: [screwsWorldImage],
    title: 'Screws World Website',
    subtitle: 'Website Landing Page',
    technologies: [
      tech.typescript,
      tech.react,
      tech.scss,
      tech.nodeJS,
      tech.express,
    ],
    description: (
      <>
        {
          "This serves as the official website of Screws and Fastener's world. It's purpose is to market the business and provide customers with a catalog of available products. It also features a "
        }
        <a
          className="underline-on-hover"
          href="https://en.wikipedia.org/wiki/Content_management_system"
          target="_blank"
          rel="noreferrer"
        >
          CMS
        </a>{' '}
        that allows the proprietor to update the product catalogue.
      </>
    ),
    githubLink: 'https://github.com/patrickjames242/screws-world-website',
    websiteLink: 'https://screwsworldbahamas.com/',
    documentViewerItems: [
      { data: documentViewerWebsiteDemo('https://screwsworldbahamas.com') },
    ],
  }),
  project({
    imageUrls: [chatCamImage],
    title: 'ChatCam',
    subtitle: 'Native iOS App',
    technologies: [tech.swift, tech.xcode, tech.firebase],
    description: (
      <>
        ChatCam is a dumbed-down SnapChat clone that allows users to chat with
        each other and take photos and videos, which they can then store in
        their memories or send to other users.
      </>
    ),
    websiteLink: 'https://apps.apple.com/us/app/chatcam/id1611648925',
    appStoreLink: 'https://apps.apple.com/us/app/chatcam/id1611648925',
    documentViewerItems: [{ data: documentViewerItemImage(chatCamImage) }],
  }),
];
