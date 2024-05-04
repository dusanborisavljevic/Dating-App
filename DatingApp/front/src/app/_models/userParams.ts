import { User } from "./User";

export class userParams{
    pageSize:number = 5;
    pageNumber:number = 1;
    gender:string;
    minAge:number = 18;
    maxAge:number = 99;
    orderBy:string = 'lastActive'

    constructor(user:User){
        this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}