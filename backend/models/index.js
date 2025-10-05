import User from './userModel.js'
import List from './listModel.js'
import Card from './cardModel.js'
import Project from './projectModel.js'
import ProjectMember from './ProjectMember.js'

// User => Project
User.hasMany(Project, { foreignKey: 'ownerId', as: 'projects' })
Project.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' })

// Project => List
Project.hasMany(List, { foreignKey: 'projectId', as: 'lists' })
List.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })

// List => Card
List.hasMany(Card, { foreignKey: 'listId', as: 'cards' })
Card.belongsTo(List, { foreignKey: 'listId', as: 'list' })

// Project <=> Member
User.belongsToMany(Project, {
  through: ProjectMember,
  foreignKey: 'projectId',
  otherKey: 'userId',
  as: 'project'
})
Project.belongsToMany(User, {
  through: ProjectMember,
  foreignKey: 'userId',
  otherKey: 'projectId',
  as: 'member'
})

export { User, Project, List, Card, ProjectMember }
