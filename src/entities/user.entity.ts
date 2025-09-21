import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile.entity";
import { Post } from "./Post.entity";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username : string

    @Column()
    password: string

    @Column()
    createdAt: Date

    @Column({default: new Date()})
    updatedAt: Date   

    @Column({nullable: true})
    authStrategy: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile:Profile

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]
    
}
 