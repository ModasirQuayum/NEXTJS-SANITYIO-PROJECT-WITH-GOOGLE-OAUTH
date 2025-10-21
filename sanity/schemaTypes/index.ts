import { type SchemaTypeDefinition } from 'sanity'
import { publisher } from './publisher'
import { content } from './content'
import { comment } from './comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [publisher,content,comment],
}
