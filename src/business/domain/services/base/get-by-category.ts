import { IUseCase } from "@/business/domain/common/use-case";

export interface IGetByCategoryBaseUseCase<T> extends IUseCase<string, T[]> {}
