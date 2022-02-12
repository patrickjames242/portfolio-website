export {};
// import { useCallback } from "react";
// import { getAnimationStack } from "./general";
// import { useUnmounted } from "./hooks";

// type Presentation =
// 	| (() => { animationLengthSeconds: number } | null | undefined | void)
// 	| { slideUpElement: HTMLElement };
// export type PresentationItem = Presentation | { animateAtOnce: Presentation[] };

// interface PresentationSection {
// 	sectionRoot: HTMLElement;
// 	presentationItems: PresentationItem[];
// }

// export interface PresentationController {
// 	addSection(section: PresentationSection): void;
// }

// export function usePresentationController(): PresentationController {
//    const unmounted$ = useUnmounted();
//    const addSection = useCallback(() => {
//       const animationStack = getAnimationStack(300);
//       const observer = new IntersectionObserver(entries => {
//          const
//       });
//       unmounted$.subscribe(() => observer.disconnect());
//    }, []);

//    return {addSection}
// }
