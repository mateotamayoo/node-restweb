import { Request, Response } from "express"
import { prisma } from "../../data/postgres";

export class TodosController {
    //* DI
    constructor() {

    }

    public getTodos = async (req: Request,res: Response) => {
        const todos = await prisma.todo.findMany();

        return res.json(todos);
    }

    public getTodoById = async (req:Request, res:Response) => {

        const id = +req.params.id;

        if(isNaN(id)) return res.status(400).json({error: 'Id argument is not number'})

        //const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findFirst({
            where: { id: id }
        });

        todo ? res.json(todo) : res.status(404).json({error: `TODO with ${id} not found`})
    }

    public createTodo = async (req: Request, res:Response) => {
        const { text } = req.body;
        if(!text) res.status(400).json({error: 'Text property is required'});

        const todo = await prisma.todo.create({
            data: {text}
        });

        res.json(todo);
    }

    public updateTodo = async (req:Request, res:Response) => {
        const id = +req.params.id;

        if(isNaN(id)) return res.status(400).json({error: 'Id argument is not number'});

        const {text, completedAt } = req.body
        if(!text) res.status(400).json({error: 'Text property is required'});

        const todo = await prisma.todo.findFirst({
            where: { id: id }
        });

        if(!todo) return res.status(400).json({error: `Todo with id ${id} not found`})

        const newText = todo.text = text || todo.text;

        const updateTodo = await prisma.todo.update({
            where: {
                 id: +req.params.id
            },
            data: {
                text: newText,
                completedAt: (completedAt) ? new Date(completedAt): null
            }
        });

        res.json(todo)
    }

    public deleteTodo = async (req:Request, res:Response) => {

        const id = +req.params.id;

        if(isNaN(id)) return res.status(400).json({error: 'Id argument is not number'});

        const todo = await prisma.todo.findFirst({
            where: {
                 id: id
            }
        });

        if(!todo) return res.status(404).json({error: `TODO with ${id} not found`})

        const deleted = await prisma.todo.delete({
            where: {id: id}
        });

        (deleted)
         ? res.json(deleted)
         : res.status(400).json({error: `Todo with id ${id} not found`})
    }
}