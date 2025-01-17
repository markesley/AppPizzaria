import {Router, Request, Response} from 'express';
import multer from 'multer';
import {CreateUserController} from './controllers/user/CreateUserController'
import {AuthUserController} from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAutheticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import {ListCategoryController} from './controllers/category/ListCategoryController'

import { CreateProductController } from './controllers/product/CreateProductController'

import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import uploadConfig from './config/multer'

import { CreateOrderController } from './controllers/order/CreateOrderController';
import {RemoveOrderController} from './controllers/order/RemoveOrderController';
import {AddItemController} from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/OrderRemoveController';
import {SendOrderController} from './controllers/order/SendOrderController';

import {ListOrderController} from './controllers/order/ListOrderController'

import {DetailOrderController} from './controllers/order/DetailOrderService'
import { FinishOrderController } from './controllers/order/FinishOrderController';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))

// router.get('/teste', (req:Request, res:Response) => {
//     return res.json({ok:true})
// })
//ROTAS USER
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me',isAuthenticated, new DetailUserController().handle)

//--ROTAS CATEGORY
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

//ROTAS --PRODUCT
// router.post('/product', isAuthenticated,upload.single('file'), new CreateProductController().handle)
router.post('/product', isAuthenticated, new CreateProductController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)


//ROTAS --ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)

router.get('/orders', isAuthenticated, new ListOrderController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)


export {router};