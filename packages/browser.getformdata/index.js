/**
 * Gives you the fields and data of a `form` element. `getFormData` uses `FormData` and returns a plain object.
 * @parentpackage browser
 * @param {HTMLFormElement} formElement The HTML `form` element.
 * @param {boolean} [onlyTruthy=false] Falsy fields (like `''`) are omitted if `true`.
 * @returns {object} The plain object of the form data.
 * @example
 * ```jsx
 * const Form = () => {
 *   const form = useRef(null)
 *   return (
 *     <>
 *       <form ref={form}>
 *         <input name="firstname" />
 *         <input name="lastname" />
 *       </form>
 *       <button onClick={() => console.log(getFormData(form.current))}>
 *         Log all form values
 *       </button>
 *       <button onClick={() => console.log(getFormData(form.current, true))}>
 *         Log truthy form values
 *       </button>
 *     </>
 *   )
 * }
 * ```
 *
 * If `firstname` is `Stan` and `lastname` is left empty:
 *
 * ```js
 * getFormData(form.current)       // { firstname: 'Stan', lastname: '' }
 * getFormData(form.current, true) // { firstname: 'Stan' }
 * ```
 */
const getFormData = (formElement, onlyTruthy) => {
  const formData = new FormData(formElement)
  const data = {}
  Array.from(formData.entries()).forEach(([key, value]) => {
    if (!onlyTruthy || value) {
      data[key] = value
    }
  })
  return data
}

module.exports = getFormData
