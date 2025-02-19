import {
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { timestamps } from './_utils'

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
  }),
  image: text('image'),
  currentProject: uuid('current_project'),
  ...timestamps,
})




export const usersSchema = createInsertSchema(users)
export type UserSchema = z.infer<typeof usersSchema>
