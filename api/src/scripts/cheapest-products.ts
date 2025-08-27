import dotenv from 'dotenv';
import { FlattenMaps } from 'mongoose';
import connectDB from '../database';
import { IProduct, Product } from '../features/products/product.model';

dotenv.config();

/**
 * Función getTopCheapestAvailable
 * - Filtra productos con stock disponible
 * - Ordena por precio ascendente
 * - Devuelve los N más baratos (default 3)
 */
async function getTopCheapestAvailable(
  top: number = 3,
): Promise<FlattenMaps<IProduct>[]> {
  return Product.find({ isAvailable: true })
    .sort({ price: 1 })
    .limit(top)
    .lean();
}

async function main() {
  try {
    // Obtener argumentos de la línea de comandos
    const args = process.argv.slice(2);
    const top = args[0] ? parseInt(args[0]) : 3;

    // Validar que sea un número válido
    if (isNaN(top) || top <= 0) {
      console.log('❌ El argumento debe ser un número mayor a 0');
      console.log('Uso: npx tsx src/scripts/cheapest-products.ts [número]');
      console.log('Ejemplo: npx tsx src/scripts/cheapest-products.ts 5');
      return;
    }

    // Conectar a la base de datos
    await connectDB();

    // Ejecutar función
    const result = await getTopCheapestAvailable(top);

    // Mostrar resultado
    console.log(`Top ${top} productos más baratos disponibles:`);
    result.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
