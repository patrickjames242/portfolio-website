import OrangeImageView from "helper-views/OrangeImageView/OrangeImageView";
import SectionHeader from "helper-views/SectionHeader/SectionHeader";
import AndroidIconSVG from "helper-views/svg/AndroidIconSVG";
import AppleIconSVG from "helper-views/svg/AppleIconSVG";
import ExternalLink from "helper-views/svg/ExternalLinkSVG";
import GithubSVG from "helper-views/svg/GithubSVG";
import TriangleIconSVG from "helper-views/svg/TriangleSVG";
import { usePresentationController } from "helpers/AnimationController";
import { useCallbackRef } from "helpers/hooks";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { allProjects, Project } from "./projectsData";
import styles from "./ProjectsSection.module.scss";

export interface ProjectsSectionProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const ProjectsSection: React.ForwardRefRenderFunction<
	HTMLDivElement,
	ProjectsSectionProps
> = ({ ...htmlAttributes }, forwardedRef) => {
	const rootRef = useCallbackRef(forwardedRef);
	const sectionHeaderRef = useRef<HTMLHeadingElement>(null);
	const projectRefs = useRef(
		allProjects.map(() => React.createRef<HTMLDivElement>())
	).current;

	const presentationController = usePresentationController();

	useEffect(() => {
		presentationController.addSection({
			sectionRoot: rootRef.getLatest()!,
			presentationItems: [
				{ slideUpElement: sectionHeaderRef.current! },
				...projectRefs.map((x) => ({
					subsection: {
						sectionRoot: x.current!,
						presentationItems: [{ slideUpElement: x.current! }],
						threshold: 0.4,
					},
				})),
			],
		});
	}, [presentationController, projectRefs, rootRef]);

	return (
		<div
			{...htmlAttributes}
			ref={rootRef}
			className={[
				styles.ProjectsSection,
				htmlAttributes.className,
			].asClassString()}
		>
			<SectionHeader ref={sectionHeaderRef} titleText="Examples of My Work" />
			<div className={styles.projectsBox}>
				{allProjects.map((project, index) => (
					<ProjectView
						ref={projectRefs[index]}
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

const ProjectView = (() => {
	const ProjectView: React.ForwardRefRenderFunction<
		HTMLDivElement,
		ProjectViewProps
	> = ({ project, alignment, ...htmlAttributes }, forwardedRef) => {
		const rootRef = useCallbackRef<HTMLDivElement>(forwardedRef);
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
					rootRef
						.getLatest()
						?.insertBefore(
							titleSectionRef.current!,
							rootRef.getLatest()!.childNodes[0]
						);
				}
			};
			listener();
			matcher.addEventListener("change", listener);
			return () => {
				matcher.removeEventListener("change", listener);
			};
		}, [rootRef]);

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
						{[
							{
								href: project.githubLink,
								svg: <GithubSVG />,
							},
							{
								href: project.playStoreLink,
								svg: <AndroidIconSVG />,
							},
							{
								href: project.appStoreLink,
								svg: <AppleIconSVG />,
							},
							{
								className: styles.externalLink,
								href: project.websiteLink,
								svg: <ExternalLink />,
							},
						].compactMap((x, i) =>
							x.href == null ? null : (
								<a
									className={x.className}
									href={x.href}
									target="_blank"
									rel="noreferrer"
									key={i}
								>
									{x.svg}
								</a>
							)
						)}
					</div>
				</div>
				<OrangeImageView
					className={styles.imageView}
					imageUrl={project.imageUrl}
					href={project.websiteLink}
				/>
			</div>
		);
	};

	return React.forwardRef(ProjectView);
})();
