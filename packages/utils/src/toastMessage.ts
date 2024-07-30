/**
 * this function is used to show toast message
 * @param  {String} title title of the toast
 * @param {String}  description   description of the toast
 * @param {("info" | "warning" | "success" | "error")}  status   status of the toast
 */

export const toastMessage = (
  title: string | null,
  description: string | null,
  status: 'info' | 'warning' | 'success' | 'error',
) => {
  console.log(title, description, status)
}
