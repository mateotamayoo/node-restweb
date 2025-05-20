import { Request, Response } from "express"

const todos = [
    {id: 1, text: 'buy gsxr', completedAt: new Date()},
    {id: 2, text: 'buy gsxr', completedAt: null},
    {id: 3, text: 'buy gsxr', completedAt: new Date()},

];

export class TodosController {
    //* DI
    constructor() {

    }

    public getTodos = (req: Request,res: Response) => {
        return res.json(todos);
    }

    public getTodoById = (req:Request, res:Response) => {
        //* El mas hace la conversion para que no salga un string y poder buscar como num en el array
        const id = +req.params.id;

        if(isNaN(id)) return res.status(400).json({error: 'Id argument is not number'})

        const todo = todos.find(todo => todo.id === id);
        //* Si existe lo mando en json sino mando error con status
        todo ? res.json(todo) : res.status(404).json({error: `TODO with ${id} not found`})
    }

    public createTodo = (req: Request, res:Response) => {
        const {text} = req.body;

        if(!text) res.status(400).json({error: 'Text property is required'});

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        };

        todos.push(newTodo);

        res.json(newTodo);
    }

    public updateTodo = (req:Request, res:Response) => {
        const id = +req.params.id;

        if(isNaN(id)) return res.status(400).json({error: 'Id argument is not number'})

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(400).json({error: `Todo with id ${id} not found`})

        const {text, completedAt } = req.body
        if(!text) res.status(400).json({error: 'Text property is required'});

        //* igual al text si viene valor, sino va a seguir igual al que tenia antes
        todo.text = text || todo.text;

        (completedAt === null)
        ? todo.completedAt = null
        : todo.completedAt = new Date(completedAt || todo.completedAt);
        //! OJO, referencia

        res.json(todo)
    }

    public deleteTodo = (req:Request, res:Response) => {
        //* mi codigo
        // const id = +req.params.id;

        // if(isNaN(id)) return res.status(400).json({error: 'Id argument is not number'})

        // const index = todos.findIndex(todo => todo.id === id);
        // if(index === - 1) return res.status(400).json({error: `Todo with id ${id} not found`});

        // const todo = todos[index];

        // todos.splice(index, 1);

        // res.json(todo)

        //* su codigo
        const id = +req.params.id;

        if(isNaN(id)) return res.status(400).json({error: 'Id argument is not number'})

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(400).json({error: `Todo with id ${id} not found`})

        todos.splice(todos.indexOf(todo), 1);
        res.json(todo);
    }
}