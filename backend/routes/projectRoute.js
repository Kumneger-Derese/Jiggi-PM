import express from 'express';
import {
    createProject,
    getProjects,
    getProject,
    deleteProject,
    updateProject
} from "../controllers/projectController.js";
import {protect} from "../middleware/protect.js";

const projectRouter = express.Router();

projectRouter.use(protect);

projectRouter.get('/', getProjects);
projectRouter.get('/:projectId', getProject);
projectRouter.post('/create-project', createProject);
projectRouter.put('/update-project/:projectId', updateProject);
projectRouter.delete('/delete-project/:projectId', deleteProject);

export {projectRouter};