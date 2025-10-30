import express from 'express';
import {
    createProject,
    getProjects,
    getProject,
    deleteProject,
    updateProject
} from "../controllers/projectController.js";
import {protect} from "../middleware/protect.js";
import {validateRequest} from "../middleware/validateRequest.js";
import {createProjectSchema, updateProjectSchema} from "../validation/projectValidation.js";

const projectRouter = express.Router();

projectRouter.use(protect);

projectRouter.get('/', getProjects);
projectRouter.get('/:projectId', getProject);
projectRouter.post('/create-project', validateRequest(createProjectSchema), createProject);
projectRouter.put('/update-project/:projectId', validateRequest(updateProjectSchema), updateProject);
projectRouter.delete('/delete-project/:projectId', deleteProject);

export {projectRouter};