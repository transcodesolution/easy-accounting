import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { IApiResponse } from "@easy-accounting/interfaces";
import { Request } from 'express';
import { PaginationDto } from '../helper/pagination.dto';

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IApiResponse<T>> {
        const request: Request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const state: PaginationDto = { page: 1, limit: 10 };
        if (request.query?.page) {
            state.page = +request.query?.page;
            state.limit = +request.query?.limit;
        }
        return next.handle().pipe(map(data => ({ data: data?.data ?? {}, error: data ?? {}, status: response.statusCode, message: data?.message, state: { ...state, total: data?.data?.total ?? 0 } })));
    }
}