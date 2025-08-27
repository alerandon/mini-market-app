import { Schema, model, Document } from 'mongoose';
import { Product as SharedProduct } from '@mini-market/shared';

export interface IProduct
  extends Document,
    Omit<SharedProduct, '_id' | 'createdAt' | 'updatedAt'> {}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      set: (value: number) => Number.parseFloat(value.toFixed(2)),
    },
    isAvailable: {
      type: Boolean,
      default: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

productSchema.index({ category: 1 });
productSchema.index({ isAvailable: 1 });

export const Product = model<IProduct>('Product', productSchema);
