import { Router } from 'express';
import * as productController from './product.controller';

const productRouter = Router();

productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProductById);

export default productRouter;
