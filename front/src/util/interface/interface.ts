
export interface UserIF{

    _id:string

    name:string
    
    email:String

    age:number

    image:string

}

export interface MessageIF{
    
    message:string

    roon:string

    name:string

    time:string
}

export interface RoomIF{

    imageUrl:string

    ingroup:string[]

    name:string

}