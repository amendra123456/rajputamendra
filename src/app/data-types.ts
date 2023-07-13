export interface userSignUp{
    name:string,
    email:string,
    password:string
}
export interface userLogin{
    id:number,
    email:string,
    password:string
}
export interface Product{
    id:number,
    name:string,
    category:string,
    price:number,
    image:string,
    color:string,
    decrs:string,
    quantity:undefined|number;
}
export interface signUp{
    name:string,
    email:string,
    password:string
}
export interface cart{
    id?: string | null;
    user_id:number,
    cart:string,
    
}
export interface cartData{
    id:number,
    name:string,
    category:string,
    price:number,
    image:string,
    color:string,
    decrs:string,
    quantity:undefined|number;
}

export interface priceSummary{
    price:number,
    delivery:number,
    tax:number,
    discount:number,
    total:number
}

export interface order{
    price:number,
    total_price?:number,
    user_id?:number,
    email:string,
    address:string,
    contact:string,
    id?:number
}