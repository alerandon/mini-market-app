import dotenv from 'dotenv';
import connectDB from './database';
import { Product } from './products/product.model';
import fs from 'fs';
import path from 'path';

dotenv.config();

const seedDatabase = async () => {
  try {
    const productsPath = path.resolve('product.json');
    const sampleProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    console.log('🌱 Iniciando proceso de seed...');

    // Conectar a la base de datos
    await connectDB();

    // Limpiar la colección de productos
    await Product.deleteMany({});
    console.log('🗑️  Productos existentes eliminados');

    // Insertar productos de ejemplo
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ ${createdProducts.length} productos creados exitosamente`);

    // Mostrar resumen
    console.log('\n📊 Resumen de productos creados:');
    for (const product of createdProducts) {
      console.log(
        `   • ${product.name} - $${product.price} (${product.category})`,
      );
    }

    console.log('\n🎉 Proceso de seed completado exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante el proceso de seed:', error);
    process.exit(1);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase;
