export default function validateAs(as: string, allowedTags: string[]) {
  if (!allowedTags.includes(as)) {
    throw new Error(`${as} cannot be used for 'as' prop of this component. 'as' must be one of ${allowedTags.join(', ')}`)
  }
}
