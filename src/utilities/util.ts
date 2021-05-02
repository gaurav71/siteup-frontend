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
