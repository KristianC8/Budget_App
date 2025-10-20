export const helpNumericKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  const regex = /^[0-9]$/
  if (
    event.key !== 'Backspace' &&
    event.key !== 'Tab' &&
    event.key !== 'ArrowLeft' &&
    event.key !== 'ArrowRight' &&
    event.key !== 'Delete' &&
    event.key !== 'Enter' &&
    !regex.test(event.key)
  ) {
    event.preventDefault()
  }
}
