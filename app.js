const fs = require('fs');
const http = require('http');
const readline = require('readline');
const url = require('url');

const html = fs.readFileSync('./template/index.html','utf-8');
let products = JSON.parse(fs.readFileSync('./data/products.json','utf-8'));
let productListHtml = fs.readFileSync('./template/product-list.html','utf-8');
let productDetailtHtml = fs.readFileSync('./template/product-details.html','utf-8');


function replaceHtml (template,product) {
        let output = template.replace('{{%IMAGE%}}',product.productImage);
        output= output.replace('{{%NAME%}}',product.name);
        output= output.replace('{{%MODELNAME%}}',product.modeName);
        output= output.replace('{{%MODELNO%}}',product.modelNumber);
        output= output.replace('{{%SIZE%}}',product.size);
        output= output.replace('{{%CAMERA%}}',product.camera);
        output= output.replace('{{%PRICES%}}',product.price);
        output= output.replace('{{%COLOR%}}',product.color);
        output= output.replace('{{%ID%}}',product.id);
        output= output.replace('{{%ROM%}}',product.ROM);
        output= output.replace('{{%DESC%}}',product.Description);
    
        return output;
}

const server = http.createServer((request,response) => {
    let {query,pathname: path} = url.parse(request.url,true);
    
    // console.log(x);
    // let path = request.url;

    if(path === '/' || path.toLowerCase()==='/home'){
        response.writeHead(200,{
            "Content-type":"text/html",
            "my-header":"hellow-world"
        });
        response.end(html.replace('{{%CONTENT%}}','You are in home page'));
    }else if(path.toLowerCase() === '/contact') {
        response.writeHead(200,{
            "Content-type":"text/html",
            "my-header":"hellow-world"
        });
        response.end(html.replace('{{%CONTENT%}}','You are in contact page'));
    }else if (path.toLowerCase()==='/about') {
        response.writeHead(200,{
            "Content-type":"text/html",
            "my-header":"hellow-world"
        });
        response.end(html.replace('{{%CONTENT%}}','you are in about page'));
    }else if(path.toLowerCase()==='/products') {
        if(!query.id) {
            let productHtmlArray = products.map((prod) => {
                return replaceHtml(productListHtml,prod);
            });
            let productResponseHtml= html.replace('{{%CONTENT%}}',productHtmlArray.join(','));
        response.writeHead(200,{'Contents-type':'text/html'});
        response.end(productResponseHtml);
        }else{
            let prod =products[query.id];
            let productDetailtResponseHtml = replaceHtml(productDetailtHtml,prod) ;
            response.end(html.replace('{{%CONTENT%}}',productDetailtResponseHtml));
        }
    }else{
        response.writeHead(404,{
            "Content-type":"text/html",
            "my-header":"hellow-world"
        });
        response.end('Error 404 the page not found');
    }
});

server.listen(3003, () =>{ 
    console.log("server is listening");
});