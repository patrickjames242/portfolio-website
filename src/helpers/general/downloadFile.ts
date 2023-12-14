export function downloadFile(
  url: string,
  fileName?: string,
  nodeToPutLinkIn?: Node,
): void {
  nodeToPutLinkIn = nodeToPutLinkIn ?? document.body;
  const link = document.createElement('a');
  link.style.display = 'none';
  link.style.pointerEvents = 'auto';
  link.href = url;
  if (fileName) {
    link.download = fileName;
  }
  nodeToPutLinkIn.appendChild(link);
  link.click();
  nodeToPutLinkIn.removeChild(link);
}
