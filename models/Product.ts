import mongoose, { Document, Schema } from 'mongoose';

export interface IProductLink {
  platform: 'amazon' | 'flipkart' | 'myntra' | 'nykaa' | '1mg' | 'pharmeasy' | 'healthkart' | 'bigbasket' | 'jiomart';
  url: string;
  price: number;
  logo?: string;
}

export interface ISpecification {
  key: string;
  value: string;
}

export interface IReview {
  user: mongoose.Types.ObjectId;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IFAQ {
  question: string;
  answer: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  detailedDescription?: string;
  category: string;
  images: string[];
  specifications: ISpecification[];
  productLinks: IProductLink[];
  ourPrice: number;
  stockLevel: number;
  lowStockThreshold: number;
  sku: string;
  tags: string[];
  featured: boolean;
  status: 'catalogue' | 'inventory';
  reviews: IReview[];
  faqs: IFAQ[];
  averageRating: number;
  totalReviews: number;
  frequentlyBoughtWith: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    detailedDescription: {
      type: String,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
    },
    images: {
      type: [String],
      required: [true, 'At least one product image is required'],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one image is required',
      },
    },
    specifications: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    productLinks: [
      {
        platform: {
          type: String,
          enum: ['amazon', 'flipkart', 'myntra', 'nykaa', '1mg', 'pharmeasy', 'healthkart', 'bigbasket', 'jiomart'],
          required: true,
        },
        url: { type: String, required: true },
        price: { type: Number, required: true },
        logo: String,
      },
    ],
    ourPrice: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
    },
    stockLevel: {
      type: Number,
      default: 0,
      min: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    tags: [String],
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['catalogue', 'inventory'],
      default: 'catalogue',
    },
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        userName: String,
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    frequentlyBoughtWith: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create indexes
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ status: 1 });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

