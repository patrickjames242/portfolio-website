import { DocumentViewerHeaderButton } from './DocumentViewerHeader';

export namespace DocumentViewerItem {
  export type Data =
    | { type: 'image'; imageUrl: string }
    | { type: 'website-demo'; websiteUrl: string }
    | { type: 'pdf-file'; fileUrl: string };
}

export function documentViewerItemImage(
  imageUrl: string,
): DocumentViewerItem.Data {
  return { type: 'image', imageUrl } satisfies DocumentViewerItem.Data;
}

export function documentViewerWebsiteDemo(
  websiteUrl: string,
): DocumentViewerItem.Data {
  return { type: 'website-demo', websiteUrl } satisfies DocumentViewerItem.Data;
}

export interface DocumentViewerItem {
  id?: string;
  data: DocumentViewerItem.Data;
  description?: string;
  title: string;
  headerButtons?: DocumentViewerHeaderButton[];
  viewerMaxWidth?: number | string;
}

export interface DocumentViewerCollection {
  initialItem: DocumentViewerItem;
  getNextItem?: (currentItem: DocumentViewerItem) => DocumentViewerItem | null;
  getPreviousItem?: (
    currentIndex: DocumentViewerItem,
  ) => DocumentViewerItem | null;
}
