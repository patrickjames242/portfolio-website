import SectionHeader from "helper-views/SectionHeader/SectionHeader";
import ExternalLink from "helper-views/svg/ExternalLinkSVG";
import GithubSVG from "helper-views/svg/GithubSVG";
import TriangleIconSVG from "helper-views/svg/TriangleSVG";
import React, { useLayoutEffect, useRef } from "react";
import { allProjects, Project } from "./projectsData";
import styles from "./ProjectsSection.module.scss";

export interface ProjectsSectionProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const ProjectsSection: React.ForwardRefRenderFunction<
	HTMLDivElement,
	ProjectsSectionProps
> = ({ ...htmlAttributes }, ref) => {
	return (
		<div
			{...htmlAttributes}
			ref={ref}
			className={[
				styles.ProjectsSection,
				htmlAttributes.className,
			].asClassString()}
		>
			<SectionHeader titleText="Some Things I've Built" />
			<div className={styles.projectsBox}>
				{allProjects.map((project, index) => (
					<ProjectView
						project={project}
						alignment={index % 2 === 0 ? "right" : "left"}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

export default React.forwardRef(ProjectsSection);

interface ProjectViewProps extends React.HTMLAttributes<HTMLDivElement> {
	alignment: "left" | "right";
	project: Project;
}

const ProjectView: React.FC<ProjectViewProps> = ({
	project,
	alignment,
	...htmlAttributes
}: ProjectViewProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const detailsSectionRef = useRef<HTMLDivElement>(null);
	const titleSectionRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const matcher = window.matchMedia(
			`(min-width: ${styles.maxNarrowScreenWidth})`
		);
		const listener = () => {
			const areProjectsExpanded = matcher.matches;
			if (areProjectsExpanded) {
				detailsSectionRef.current?.insertBefore(
					titleSectionRef.current!,
					detailsSectionRef.current!.childNodes[0]
				);
			} else {
				rootRef.current?.insertBefore(
					titleSectionRef.current!,
					rootRef.current!.childNodes[0]
				);
			}
		};
		listener();
		matcher.addEventListener("change", listener);
		return () => {
			matcher.removeEventListener("change", listener);
		};
	}, []);

	return (
		<div
			{...htmlAttributes}
			ref={rootRef}
			className={[
				styles.ProjectView,
				htmlAttributes.className,
				styles[alignment],
			].asClassString()}
		>
			<div ref={titleSectionRef} className={styles.titleSection}>
				<div className={styles.subtitle}>{project.subtitle}</div>
				<div className={styles.title}>{project.title}</div>
			</div>
			<div ref={detailsSectionRef} className={styles.detailsSection}>
				<div className={styles.descriptionBox}>{project.description}</div>
				<div className={styles.technologiesBox}>
					{project.technologies.map((x, index) => (
						<a
							className={styles.technology}
							href={x.url}
							target="_blank"
							rel="noreferrer"
							key={index}
						>
							<TriangleIconSVG />
							<div className={styles.text}>{x.name}</div>
						</a>
					))}
				</div>
				<div className={styles.linkButtons}>
					{project.githubLink != null && (
						<a
							className={styles.github}
							href={project.githubLink}
							target="_blank"
							rel="noreferrer"
						>
							<GithubSVG />
						</a>
					)}
					<a
						className={styles.externalLink}
						href={project.websiteLink}
						target="_blank"
						rel="noreferrer"
					>
						<ExternalLink />
					</a>
				</div>
			</div>

			<a
				className={styles.imageView}
				href={project.websiteLink}
				target="_blank"
				rel="noreferrer"
			>
				<div>
					<img src={project.imageUrl} alt="" />
				</div>
				<div className={styles.imageCover}></div>
			</a>
		</div>
	);
};
