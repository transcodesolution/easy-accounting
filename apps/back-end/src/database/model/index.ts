import { ModelDefinition } from "@nestjs/mongoose";
import type { Query, Schema as SchemaType } from 'mongoose';

export interface ISoftDeleteMethod<T> {
    softDelete: () => Promise<T>;
}

export const Model: ModelDefinition[] = [];

export function softDeletePlugin<T>(schema: SchemaType<T>) {
    schema.pre(/^find/, function (this: Query<any, any, Record<string, any>, any>, next) {
        this.where({ deletedAt: null });
        next();
    });

    schema.methods.softDelete = function () {
        this.deletedAt = new Date();
        return this.save();
    };
}