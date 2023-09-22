 const jsonA = document.querySelector('#jsonArea');
 const csvA = document.querySelector('#csvArea');
 const btn_convertir = document.querySelector('#btn_convertir');

 btn_convertir.addEventListener('click', (e)=>{
    converitJSONaCSV();
 });

 function converitJSONaCSV(){

    let json;
    let claves = [];
    let valores = [];

    try {
        json = JSON.parse(jsonA.value);

    }catch(error){
        console.log('formato incorrecoto JSON', error);
        alert('FORMATO INCORRECTO');
        return;
    }

    if(Array.isArray(json)){

        json.forEach(obj=>{
            const nuemroClaves = Object.keys(obj);

            if(claves.length === 0){
                claves = [...nuemroClaves];
            }else{
                if(nuemroClaves.length != claves.length){
                    throw new Error('El numero de Claves es Diferente')
                }else{
                    console.log("OK", nuemroClaves);
                }
            }

            const filas = claves.map(clav => {
                return obj[clav];
            });

            valores.push([...filas]);
        });

        console.log(claves, valores);
        valores.unshift(claves);
        const text = valores.map((v) => v.join(",")).join("\n");
        csvA.value = text;

    }else{

        alert('No se un arreglo de objetos');
    }
 }

//JSON DE PRUEBA
/** 
[
 {
  "id":0,
  "nombre": "Lean",
  "edad":15
 },{
  "id":1,
  "nombre": "Roberto",
  "edad":11
 },{
  "id":2,
  "nombre": "Juan",
  "edad":40
 },{
  "id":3,
  "nombre": "Pepe",
  "edad":16
 }
]
*/