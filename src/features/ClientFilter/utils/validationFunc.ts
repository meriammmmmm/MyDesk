export function isAlphabeticString(str: string | undefined): boolean {
  // Check if the input is undefined or null
  if (str === undefined || str === null) {
    return false
  }

  // Check if the string length is less than 3
  if (str.length < 3) {
    return false
  }

  // Check if all characters in the string are alphabetic
  for (let i = 0; i < str.length; i++) {
    if (!/[a-zA-Z]/.test(str[i])) {
      return false
    }
  }

  return true
}
export function isValidEndpoint(endpoint: string | undefined): boolean {
  if (endpoint === undefined || endpoint === null) {
    return false
  } else if (endpoint.trim() === '' || endpoint.length < 4) {
    // You can add more checks here if needed, such as validating the format.
    return false
  } else {
    return true
  }
}
