export interface Pagination{
    pageNumber:number;
    totalPages:number;
    itemsPerPage:number;
    totalItems:number;
}

export class PaginatedResult<T>{
    result?: T;
    pagination?: Pagination;
}