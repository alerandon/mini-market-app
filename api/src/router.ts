import { Router } from 'express';
import productRouter from './features/products/product.router';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: '¡Bienvenido a la api del mini-market!' });
});
router.use('/products', productRouter);

export default router;
