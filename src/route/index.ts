import express,{Router } from "express";
import userRoute from './userRoute';

const rootRouter: Router = Router();
rootRouter.use('/users', userRoute);

export default rootRouter;
