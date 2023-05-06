export const logException = (layer = null, file = null, err) => {
  if (!layer && !file) {
    console.log(`\nAn error ocurred in: Layer ${layer}, File: ${file}, Error: ${err}\n`)
  } else {
    console.log(`An error ocurred, Error: ${err}`)
  }
}
