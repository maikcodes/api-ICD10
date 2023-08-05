export const logException = (layer = null, file = null, err) => {
  if (!layer && !file) {
    console.log(`\nAn error ocurred, ${err}`)
  } else {
    console.log(`\nAn error ocurred in: Layer ${layer}, File: ${file}, ${err}\n`)
  }
}
