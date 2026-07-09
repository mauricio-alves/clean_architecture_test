import { IUseCase } from "@/business/domain/common/use-case";

export interface IGetBaseUseCase<T> extends IUseCase<string, T> {}
