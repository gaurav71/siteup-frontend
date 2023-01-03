export const debounce = <Params>(
  cb: (input: Params) => void,
  time: number
): ((input: Params) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (input: Params) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        cb(input)
        timeout = null
      }, time)
    }
  }
}

export const loadScript = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}]"`)) return resolve()
    const scriptElement = document.createElement('script')
    scriptElement.src = src
    scriptElement.onload = () => resolve()
    scriptElement.onerror = (error) => reject(error)
    document.body.appendChild(scriptElement)
  })
