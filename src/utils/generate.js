// generate slug
const generateSlug = (title) => {
  return title.trim().toLowercase().replace(' ', '-')
}

export default generateSlug
