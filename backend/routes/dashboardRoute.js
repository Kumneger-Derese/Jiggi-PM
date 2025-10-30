import express from 'express'
import {protect} from "../middleware/protect.js";
import {changeRole, getDashboardData, removeTeamMember} from "../controllers/dashboardController.js";

const dashboardRouter = express.Router()

dashboardRouter.use(protect)

dashboardRouter.get('/data', getDashboardData)
dashboardRouter.put('/change-role', changeRole)
dashboardRouter.delete('/remove-member/:projectId/:memberId', removeTeamMember)

export {dashboardRouter}