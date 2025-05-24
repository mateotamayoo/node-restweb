import express, { response, Router } from 'express';
import path from 'path';
import { text } from 'stream/consumers';

interface Options {
    port: number;
    public_path?: string;
    routes:Router;
}

export class Server {

    private app = express();

    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes:Router;

    constructor(options: Options) {
        const { port, routes ,public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {

        //*Middlewares
        //* Hay que indicar a express explicitamente funciones para parsear la informacion 

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true})); //x-www-urlencoded
        this.app.use(compression())

        //* Routes
        this.app.use(this.routes)

        //* Public Folder
        this.app.use(express.static(this.publicPath));

        //* SPA
        this.app.get('*', (req,res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;
        })

        this.app.listen(this.port, () => {
            console.log('server running on port 3001');
        })
    }
}

function compression(): any {
    throw new Error('Function not implemented.');
}
