import uniqueId from 'lodash/uniqueId';
import {
  DocumentViewerCollection,
  DocumentViewerItem,
} from './DocumentViewer/helpers';
import { Project } from './projectsData';

export class ProjectsDocumentViewerCollection
  implements DocumentViewerCollection
{
  public readonly initialItem: DocumentViewerItem;
  private readonly allDocumentItems: readonly DocumentViewerItem[];
  private readonly documentIdToIndexMap: ReadonlyMap<string, number>;

  constructor(allProjects: Project[], initialProjectIndex: number) {
    if (allProjects[initialProjectIndex] == null)
      throw new Error(`Invalid initialProjectIndex: ${initialProjectIndex}`);

    const allDocumentItems: DocumentViewerItem[] = allProjects.flatMap(
      (project) => {
        return project.documentViewerItems.map((item) => ({
          id: uniqueId(),
          ...item,
        }));
      },
    );

    const initialItemIndex = (() => {
      let result = 0;
      for (let i = 0; i < initialProjectIndex; i++) {
        result += allProjects[i].documentViewerItems.length;
      }
      return result;
    })();

    this.initialItem = allDocumentItems[initialItemIndex];
    this.allDocumentItems = allDocumentItems;
    this.documentIdToIndexMap = new Map<string, number>(
      allDocumentItems.map((item, index) => [item.id!, index]),
    );
  }

  public getNextItem = (
    currentItem: DocumentViewerItem,
  ): DocumentViewerItem | null => {
    const currentIndex = this.documentIdToIndexMap.get(currentItem.id!);
    if (currentIndex == null) return null;
    const nextIndex = currentIndex + 1;
    if (nextIndex >= this.allDocumentItems.length) return null;
    return this.allDocumentItems[nextIndex];
  };

  public getPreviousItem = (
    currentItem: DocumentViewerItem,
  ): DocumentViewerItem | null => {
    const currentIndex = this.documentIdToIndexMap.get(currentItem.id!);
    if (currentIndex == null) return null;
    const previousIndex = currentIndex - 1;
    if (previousIndex < 0) return null;
    return this.allDocumentItems[previousIndex];
  };
}
