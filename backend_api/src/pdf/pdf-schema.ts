// pdf.schema.ts
import { Schema, Document } from 'mongoose';

export interface Pdf extends Document {
  contentType: string;
  data: Buffer;
}

export const PdfSchema = new Schema({
  contentType: { type: String, required: true },
  data: { type: Buffer, required: true },
});
