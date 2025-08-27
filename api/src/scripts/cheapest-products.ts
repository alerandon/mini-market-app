import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { Product } from '@mini-market/shared';
import connectDB from '../database';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Función getTopCheapestAvailable
 * - Filtra productos con stock disponible
 * - Ordena por precio ascendente
 * - Devuelve los N más baratos (default 3)
 */
function getTopCheapestAvailable(
  products: Product[],
  top: number = 3,
): Product[] {
  return products
    .filter((product) => product.isAvailable)
    .sort((a, b) => a.price - b.price)
    .slice(0, top);
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

    // Cargar productos
    const dataPath = path.join(__dirname, '../data/products.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const products: Product[] = JSON.parse(data);

    // Conectar a la base de datos
    await connectDB();

    // Ejecutar función
    const result = getTopCheapestAvailable(products, top);

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
