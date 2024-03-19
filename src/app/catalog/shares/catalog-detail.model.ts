export class GetProductRequestDto {  
    PageSize : number = 10
    PageCount : number = 1
}

export class GetCategoryResponseDto { 
    id? : string = '' 
    title : string = ''
}

export class GetManufacturersResponseDto { 
    id? : string = '' 
    title : string = ''
}

export class GetProductResponseDto { 
    id : string = '' 
    title : string = '' 
    categoryId : string = ''
    ManufacturerId : string = ''
    IsDiscount : number = 0
    price : number = 10.99
    quantity : number = 0
}