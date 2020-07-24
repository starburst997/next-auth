export default (options) => {
  const { discourse_url } = options
  return {
    id: 'discourse',
    name: 'Discourse',
    type: 'discourse',
    version: '1.0',
    profile: (profile) => {
      return {
        id: profile.id,
        name: profile.name || profile.login,
        email: profile.email,
        image: profile.avatar_url
      }
    },
    ...options
  }
}
