import mongoose, { Document, Schema } from 'mongoose';

export interface ISettings extends Document {
  tax: {
    gstRate: number;
    enabled: boolean;
  };
  shipping: {
    freeShippingThreshold: number;
    standardShippingCost: number;
    expressShippingCost: number;
    enabled: boolean;
  };
  policies: {
    privacyPolicy?: string;
    refundPolicy?: string;
    termsAndConditions?: string;
    shippingPolicy?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    tax: {
      gstRate: {
        type: Number,
        default: 18,
        min: 0,
        max: 100,
      },
      enabled: {
        type: Boolean,
        default: true,
      },
    },
    shipping: {
      freeShippingThreshold: {
        type: Number,
        default: 500,
      },
      standardShippingCost: {
        type: Number,
        default: 50,
      },
      expressShippingCost: {
        type: Number,
        default: 150,
      },
      enabled: {
        type: Boolean,
        default: true,
      },
    },
    policies: {
      privacyPolicy: String,
      refundPolicy: String,
      termsAndConditions: String,
      shippingPolicy: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

