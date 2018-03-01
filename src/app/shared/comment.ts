
export class Comment {
    
        constructor(
            public id: number = null,
            public created: Date = null,
            public modified: Date = null,
            public subject: string = null,
            public body: string = null,
            public status: string = null,
            public rating: number = null,
            public user: string = null,
            public consultant: number = null
        ){}
        
    }