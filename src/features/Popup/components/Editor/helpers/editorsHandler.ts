import { updateContent } from '@src/store/slices/contentSlice/contentSlice.slice'
export const handleEditorChange = async (dispatch: any, newContent: any, index: number) => {
  await dispatch(updateContent({ newContent, index }))
}

export const handleKeyDown = (_dispatch: any, _event: any, _key: any) => {}
