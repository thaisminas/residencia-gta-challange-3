
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')


async function url (){
    const api = axios.get('https://g1.globo.com/')
    return api
}

async function writeFileJson (dados) {
    const result = JSON.stringify(dados, null, 2);
        
    fs.writeFile('results.json', result, 'utf-8', (err) => {
        if(err) {
            throw err;
        }
        console.log('Arquivo JSON gerado com sucesso!!!')
    })
}


async function search () {
    const html = await url()
    const $ = cheerio.load(html.data)
    const data = [];

    $('._evt').each(function () {
        $(this).find('.feed-post-body').each(function () {  
            data.push({
                titulo: $(this).find('.feed-post-link').text(),
                linkMateria: $(this).find('.feed-post-link').attr('href'),
                urlImage: $(this).find('.bstn-fd-picture-image').attr('src'),
                subtitulo: $(this).find('.feed-post-header').text(),
            })
                    
        })
        
    });

    return writeFileJson(data)
} 




search()
