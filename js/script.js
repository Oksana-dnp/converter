

/* fetch('./rule.json')
    .then((response) => response.json())
    .then((json) =>  createRulls(json)); */

    fetch('./rule.json')
    .then((response) => response.json())
    .then((json) => {
        //получаем массив объекто  с правилом для каждой меры длины
        //в массиве обэектов каждая мера длины сводиться к ее значению в метрах
        let arrMetric = json;
        fetch('./data.json')
            .then((response) => response.json())
            .then((json) => {
                let data = json;                
                console.log(data.convertTo);
                console.log(data.distance.unit);
                arrMetric.forEach(item=>{
                    // в примере у нас данніе в метрах, найдем в обїкте rule.json нашу меру 
                    if(item.unit === data.distance.unit){
                        let unit  = data.convertTo;  
                //теперь возьмем умножим значение в метрах из data.distance.value на соостветсвуещее занчение в фунтах для одного метра                 
                        let value = Math.round(data.distance.value*item.convertTo[data.convertTo]*100)/100;
                        let result = new ConvertObj(unit, value);
                        //Вихідні дані: Об'єкт у форматі JSON
                        console.log('result', JSON.stringify(result))
                    } 
                })

            });
    });

//class to create obj  чтоб легко создать новый однотипный объект
    class ConvertObj{
        constructor(unit, value) {
          this.unit = unit;
          this.value = value;
        }
      }





//{"distance": {"unit": "m", "value": 0.5}, "convertTo": "ft"}

//{"unit": "ft", "value": 1.64}

/*     
await function getData(url) {
        let fetchData = fetch(url)
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log('error')
            });
        let result = await fetchData
        renderTestCases(result);
    }
  getData('./data.json') */
