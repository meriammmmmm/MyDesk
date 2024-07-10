import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import 'suneditor/dist/css/suneditor.min.css'

const defaultFonts = ['Poppins', 'Cairo', 'Tajawal']
interface SetState {
  value: string
  onChange: (newContent: string) => void
  onKeyDown: (event: any) => void
  isDisable: boolean
}
export default function TextEditor({ isDisable, onChange, value, onKeyDown }: SetState) {
  const sortedFontOptions = [...defaultFonts].sort()

  return (
    <SunEditor
      onChange={onChange}
      setDefaultStyle="font-size:16px;font-family: Poppins;"
      setContents={value}
      disable={isDisable}
      hideToolbar
      onKeyDown={onKeyDown}
      setOptions={{
        buttonList: [
          // default
          // ['font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
          // ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
          // ['fontColor', 'hiliteColor', 'textStyle'],
          // ['removeFormat'],
          // ['outdent', 'indent'],
          // ['align', 'horizontalRule', 'list', 'lineHeight'],
          // ['table', 'image', 'link'],
          // ['undo', 'redo'],
          // min-width: 800
          [
            '%800',
            // [
            //   [
            //     ':p-More Paragraph-default.more_paragraph',
            //     'font',
            //     'fontSize',
            //     'formatBlock',
            //     'paragraphStyle',
            //     'blockquote',
            //   ],
            //   ['bold', 'underline', 'italic', 'strike'],
            //   [
            //     ':t-More Text-default.more_text',
            //     'subscript',
            //     'superscript',
            //     'fontColor',
            //     'hiliteColor',
            //     'textStyle',
            //   ],
            //   ['removeFormat'],
            //   ['outdent', 'indent'],
            //   ['align', 'horizontalRule', 'list', 'lineHeight'],
            //   ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image'],
            //   // ['undo', 'redo'],
            // ],
          ],
          // (min-width: 767)
          [
            '%767',
            [
              [
                ':p-More Paragraph-default.more_paragraph',
                'font',
                'fontSize',
                'formatBlock',
                'paragraphStyle',
                'blockquote',
              ],
              [
                ':t-More Text-default.more_text',
                'bold',
                'underline',
                'italic',
                'strike',
                'subscript',
                'superscript',
                'fontColor',
                'hiliteColor',
                'textStyle',
              ],
              ['removeFormat'],
              ['outdent', 'indent'],
              [
                ':e-More Line-default.more_horizontal',
                'align',
                'horizontalRule',
                'list',
                'lineHeight',
              ],
              [':r-More Rich-default.more_plus', 'table', 'link', 'image'],
              // ['undo', 'redo'],
            ],
          ],
          // (min-width: 480)
          [
            '%480',
            [
              [
                'dir',
                'fontSize',
                'hiliteColor',
                'fontColor',
                'align',
                'outdent',
                'indent',
                ':t-More Text-default.more_text',
                'bold',

                'italic',
              ],
              [':p-More Paragraph-default.more_paragraph', 'font'],
              //   [
              //     ':e-More Line-default.more_horizontal',
              //     'horizontalRule',
              //     'list',
              //     'lineHeight',
              //   ],
              //   [':r-More Rich-default.more_plus', 'table', 'link', 'image'],
              //   // ['undo', 'redo'],
            ],
          ],
        ],
        defaultTag: 'div',
        imageUploadSizeLimit: 3500000,
        mode: 'balloon',
        font: sortedFontOptions,
      }}
    />
  )
}
