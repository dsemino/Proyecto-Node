import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import  {argv } from 'process';

const [, , comando, parametro1, parametro2, parametro3, parametro4] = process.argv;

let product;
let partes;
let id;
let url;

switch(comando) {
    case 'GET':
        //console.log(`Toma un dato`);
		// En esta caso si solo ingresan en comando GET sin argumento devuelve todos los productos
        if (!parametro1){
            fetch('https://fakestoreapi.com/products')
            
            .then(response => response.json())
            .then(data => console.log(data));
        }
        else{
			//En esta caso devuelve el producto seleccionado si se ingreso o 
            // todos en caso que no se indique id de producto
            partes = parametro1.split("products");
			// partes[1] toma la parte que sigue a products = "/id"
            id = partes[1]; 
            url = "https://fakestoreapi.com/products" + id;
            fetch(url)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.log(error));
        }
        break;
    case 'POST':
        //console.log(`Recibimos ${parametro} satisfactoriamente`);
        product = { title: parametro2, price: parametro3, category: parametro4 };
        fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
            })
        .then(response => response.json())
        .then(data => console.log(data));
        break;
    case 'DELETE':
        //console.log(`El item con id : ${parametro} se eliminó con exito`);
        partes = parametro1.split("products");
		// partes[1] toma la parte que sigue a products = "/id"
        id = partes[1]; 
        url = "https://fakestoreapi.com/products" + id;
        console.log(url);
        fetch(url,{
            method: 'DELETE'
            })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.log(error));
        break;

}
