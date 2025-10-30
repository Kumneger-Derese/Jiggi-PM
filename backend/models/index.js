import User from './userModel.js'
import List from './listModel.js'
import Card from './cardModel.js'
import Invite from './inviteModel.js'
import Project from './projectModel.js'
import ProjectMember from './ProjectMember.js'

// User => Project
User.hasMany(Project, {foreignKey: 'ownerId', as: 'projects'})
Project.belongsTo(User, {foreignKey: 'ownerId', as: 'owner'})

// Project => List
Project.hasMany(List, {foreignKey: 'projectId', as: 'lists'})
List.belongsTo(Project, {foreignKey: 'projectId', as: 'project'})

// List => Card
List.hasMany(Card, {foreignKey: 'listId', as: 'cards'})
Card.belongsTo(List, {foreignKey: 'listId', as: 'list'})

// Project <=> User
User.belongsToMany(Project, {
    through: ProjectMember,
    foreignKey: 'userId', // The FK from User in ProjectMember
    as: 'project'
})

Project.belongsToMany(User, {
    through: ProjectMember,
    foreignKey: 'projectId', // The FK from Project in ProjectMember
    as: 'member'
})

// User => Invite
User.hasMany(Invite, {foreignKey: 'inviterId', as: 'inviter'})
Invite.belongsTo(User, {foreignKey: 'inviterId', as: 'inviter'})

//Project => Invite
Project.hasMany(Invite, {foreignKey: 'projectId'})
Invite.belongsTo(Project, {foreignKey: 'projectId'})

// ProjectMember => User & Project
ProjectMember.belongsTo(User, {foreignKey: 'userId', as: 'user'})
ProjectMember.belongsTo(Project, {foreignKey: 'projectId', as: 'project'})

export {User, Project, List, Card, ProjectMember, Invite}
