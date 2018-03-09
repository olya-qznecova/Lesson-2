var pokemonListRequest = new XMLHttpRequest();
var pokemonListInfo;
pokemonListRequest.open('GET', 'https://pokeapi.co/api/v2/pokemon/?limit=151', true);
pokemonListRequest.timeout = 20000;
pokemonListRequest.ontimeout = function(){
    console.log("Time's up");
}

pokemonListRequest.send();

pokemonListRequest.onreadystatechange = function(){
    if(pokemonListRequest.readyState === XMLHttpRequest.DONE){
        if(pokemonListRequest.status === 200){
            pokemonListInfo = JSON.parse(pokemonListRequest.responseText);
            
            //Создаю экземпляр списка покемонов
            
            var pokemonList = new PokemonList(pokemonListInfo.results);
            
            //Вызываем метод render()
            document.body.appendChild(pokemonList.render());
            
        }
    }
}


// для хранения информации класс PokemonList

var PokemonList = (function(){
    function PokemonList (pokemonArray){
        var _pokemonArray = pokemonArray;
        
        // метод, при помощи которого можно получить покемона по индексу
        this.getPokemonUnit = function (index){
            return _pokemonArray[index];
        }
        

    }
    
    
    // приватный метод, на основании переданной в него ссылки выдает индекс покемона
    function extractID(urlString){
        var lastIndex = urlString.lastIndexOf('/');
        var prelastIndex = urlString.lastIndexOf('/', lastIndex - 1);
        return parseInt(urlString.substr(prelastIndex+1,lastIndex-prelastIndex-1));
        
    }
    
    //главный метод - готовит таблицу
    PokemonList.prototype.render = function(){
        var table = document.createElement("table");
        
        //th1 и th2 - шапка таблицы
        var th0 = document.createElement("th");
        var th1 = document.createElement("th");
        var tr0 = document.createElement("tr");
        tr0.appendChild(th0);
        tr0.appendChild(th1);
        table.appendChild(tr0);
        

        for(var i = 0; i < this.getPokemonListLength(); i++){
            

            var tr = document.createElement("tr");
            var td0 = document.createElement("td");
            var td1 = document.createElement("td");
            var img = document.createElement("img");
            
            //получаем id покемона и по нему вкладываем в ячейки первого столбца картинку
            var id = extractID(this.getPokemonUnit(i).url);
            img.src = "..pic/pokemonSprites/" + id + ".png";
            td0.appendChild(img);
            

            //вкладываем элементы друг в друга, чтобы получить целостную таблицу, готовую к выводу.
            tr.appendChild(td0);
            tr.appendChild(td1);
            table.appendChild(tr);
        }
        return table;
    }
    
    
    return PokemonList;
})();







