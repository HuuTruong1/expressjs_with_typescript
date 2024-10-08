import { Router, Request, Response, NextFunction } from "express";
import UserController from "../controllers/user.controller";
import authenticate from "../middlewares/authenticateMiddleware";
import authorize from "../middlewares/authorizeMiddleware";
import UserRole from "../types/UserRole";
import { log } from "console";

const router = Router();

router.get('/users', authenticate, authorize(UserRole.ADMIN), (req: Request, res: Response) => {
    if (req.query.page || req.query.pageSize) {
        UserController.getUsersByPage(req, res);
    } else {
        UserController.getUsers(req, res);
    }
})

router.get('/users/:id', authenticate, authorize(UserRole.ADMIN), (req: Request, res: Response) => {
    UserController.getUserById(req, res);
})


router.post('/users', (req: Request, res: Response) => {
    UserController.postUser(req, res);
})


router.put('/admin/update_info/(:id)', authenticate, authorize(UserRole.ADMIN), (req: Request, res: Response) => {
    UserController.updateUser(req, res);
})

router.put('/user/update_profile/(:id)', authenticate, authorize(UserRole.USER), (req: Request, res: Response) => {
    UserController.updateProfile(req, res);
})


router.delete('/users/(:id)', authenticate, authorize(UserRole.ADMIN), (req: Request, res: Response) => {
    UserController.deleteUserById(req, res);
})

router.get('/old-url', (req: Request, res: Response) => {
    setTimeout(() => {
        log("HAHA");
        res.redirect('/api/new-url');  
    }, 3000);
});

router.get('/new-url', (req: Request, res: Response) => {
    res.json("Success!");
});


export default router;
