

import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface GetTodosUseCase {
    execute(id: number): Promise<TodoEntity[]>
}

export class GetTodo implements GetTodosUseCase {

    constructor(
        private readonly repository:TodoRepository,
    ) {}

    execute(id:number): Promise<TodoEntity[]> {
        return this.repository.getAll();
    }

}