export type init = {
  editable_class?: string
  menubar?: boolean
  editable_root?: boolean
  height?: number
  plugins?: string[]
  toolbar?: string
  noneditable_class?: string
}
export const editableInit: init = {
  editable_class: 'editable',
  menubar: true,
  editable_root: true,
  height: 500,
  plugins: [
    'advlist autolink blocksformat formatselect lists link image charmap print preview anchor table',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount',
  ],
  toolbar:
    'undo redo | fullscreen | blocksformat | formatselect | bold italic backcolor | table |' +
    'alignleft aligncenter alignright alignjustify | ' +
    'bullist numlist outdent indent | link | image | ' +
    'removeformat | help',
}
export const nonEditableInit: init = {
  noneditable_class: 'mceNonEditable',
  menubar: false,
  editable_root: false,
  height: 500,
}
