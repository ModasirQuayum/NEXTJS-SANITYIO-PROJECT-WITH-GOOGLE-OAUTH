export type Publisher = {
    _id: string,
    type: "publisher",
    _createdAt:string,
    _updatedAt:string,
    username:string,
    email:string,
    image:string,
}

export type Content = {
    _id: string,
    type:"content",
    title:string,
    context:string,
    description:string,
    image:string,
    _createdAt:string,
    _updatedAt:string,
    publisher?:{
        _ref:string,
        _type:"reference",
        _weak?:boolean,
    },
}