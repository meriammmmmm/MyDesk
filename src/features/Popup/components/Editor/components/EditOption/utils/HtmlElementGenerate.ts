export function createImageHTML(src: string): string {
  return `
     <div class="se-wrapper-inner se-wrapper-wysiwyg sun-editor-editable">
     <img src="${src}" alt="img-not-found" />
     </div>
  `
}
