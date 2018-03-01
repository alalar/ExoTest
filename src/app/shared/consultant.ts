import { Comment } from './comment';

export class Consultant {
    
        constructor(
            public id: number = null,
            public created: Date = null,
            public modified: Date = null,
            public uuid: string = null,
            public email: string = null,
            public short_name: string = null,
            public full_name: string = null,
            public date_joined: Date = null,
            public status: string = null,
            public gender: string = null,
            public short_me: string = null,
            public location: string = null,
            public profile_picture: string = null,
            public comments:Array<Comment>
        ){}
    }