import { objectType, extendType, stringArg, nonNull , intArg} from 'nexus'

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.string('id')
    t.string('createdAt')
    t.string('title')
    t.string('description')
    t.string('status')
  },
})

export const TasksQuery = extendType({
  type: 'Query',
  definition(t) {
    // get all tasks
    t.nonNull.list.field('tasks', {
      type: 'Task',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.task.findMany()
      },
    });
  },
})

export const TaskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // create a new task
    t.nonNull.field('createTask', {
     type: 'Task',
     args: {
       title: nonNull(stringArg()),
       description: nonNull(stringArg()),
       id: stringArg(),
       status: stringArg(),
     },
     resolve(_root, args, ctx) {
       return ctx.prisma.task.create({
         data: {
           title: args.title,
           description: args.description,
           id: args.id,
           status: args.status,
         }
       })
     },
   });
     // update a task by id
     t.field('updateTask', {
      type: 'Task',
      args: {
        id: nonNull(stringArg()),
        title: stringArg(),
        description: stringArg(),
        status: stringArg(),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.task.update({
          where: { id: args.id },
          data: {
            title: args.title,
            description: args.description,
            status: args.status,
          },
        });
      },
    });
    // delete a task by id
    t.field('deleteTask', {
      type: 'Task',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.task.delete({
          where: { id: args.id },
        });
      },
    });
  },
});