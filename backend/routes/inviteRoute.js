import express from "express";
import {protect} from "../middleware/protect.js";
import {acceptInvitation, invitedProjects, sendInvitation, verifyInvitation} from "../controllers/inviteController.js";


const inviteRouter = express.Router()

inviteRouter.use(protect)

inviteRouter.post('/:projectId/invite', sendInvitation)
inviteRouter.get('/:token/verify', verifyInvitation)
inviteRouter.post('/accept', acceptInvitation)
inviteRouter.get('/projects', invitedProjects)

export {inviteRouter}