import generateSlug from '../utils/generate.js'
import Category from '../model/category.js'
import { faker } from '@faker-js/faker'

const categorySeed = async (numberOfAccount = 5) => {
  await Category.deleteMany()
  console.log('category are being created....')

  let category = []
  for (let i = 0; i < numberOfAccount; i++) {
    const name = faker.word.noun()
    const slug = generateSlug(name)
    const category = new Category({
      name,
      slug,
    })
    category, push(category._doc._id)
    await category.save()
  }
  console.log('category created successful!')
  return category
}

export default categorySeed
