   import {
    pgTable,
    uuid,
    varchar,
    text, 
    timestamp,
     boolean,  
     integer
   } from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm'
import { unique } from 'drizzle-orm/gel-core'
import { time } from 'node:console'

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email:varchar('email', {length:255}).notNull().unique(),
    username:varchar('username', {length:50}).notNull().unique(),
    password:varchar('password', {length:50}).notNull(),
    firstName: varchar('first_name', {length:50}),
    lastName: varchar('last_name', {length:50}),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()

})

export const habits = pgTable('habits', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('id').references(()=> users.id, {onDelete:'cascade'}).notNull(),
    name:varchar('name', {length:50}).notNull(),
    description: text('description'),
    frequency: varchar('frequency', {length:20}).notNull(),
    targetCounts: integer('target_count').default(1),
    isActive: boolean('is_active').default(true).notNull()
})

export const entries = pgTable('entries',{
    id: uuid('id').primaryKey().defaultRandom(),
    habitId: uuid('id').references(()=> habits.id, {onDelete:'cascade'}).notNull(),
    complete:timestamp('completion_date').defaultNow().notNull(),
    note:text('note'),
    createdAt: timestamp('created_at').defaultNow().notNull()
})

export const tags = pgTable('tags', {
    id: uuid('id').primaryKey().defaultRandom(),
    name:varchar('name', {length:50}).notNull(),
    color: varchar('color',{length:7}).default('rgba(7, 158, 95, 0.33)'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updateAt:timestamp('updated_at').defaultNow().notNull()
})

export const habitTags = pgTable('habitTags', {
    id:uuid('id').primaryKey().defaultRandom(),
    habitId: uuid('id').references(()=> habits.id, {onDelete:'cascade'}).notNull(),
    tagId: uuid('tag_id').references(()=> tags.id, {
        onDelete: 'cascade'
    }).notNull()
})

export const userRelations = relations(users, ({many})=>({
    habits: many(habits),
}))

export const habitsRelations = relations(habits, ({one, many})=>({
    user: one(users, {
        fields: [habits.userId],
        references:[users.id] 
    }),
    entries: many(entries),
    habitTags: many(habitTags)
}))

export const entriesRelations = relations(entries, ({one})=>({
    habit: one(habits,{
        fields:[entries.habitId],
        references: [habits.id]
    })
}))

export const tagsRelations = relations(tags, ({many})=>({
    habitTags: many(habitTags)
}))

export const habitTagsRelations = relations(habitTags, ({one})=>({
    habits: one(habits, {
        fields: [habitTags.habitId],
        references: [habits.id]
    }),
    tags: one(tags, {
        fields:[habitTags.tagId],
        references: [tags.id]
    })
}))