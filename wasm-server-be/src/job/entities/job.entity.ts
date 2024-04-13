import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    wasm: string;

    //@Column()
    //input: any;

    //@Column()
    //results: any;
}
