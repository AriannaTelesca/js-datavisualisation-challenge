var div = document.createElement("div");
var canva = document.createElement("canvas");
var targ = document.getElementById("Crimes_et_d.C3.A9lits_enregistr.C3.A9s_par_les_services_de_police");
targ.appendChild(div);
div.appendChild(canva);
canva.id = "myChart";

const ctx = document.getElementById('myChart');
canva.setAttribute("aria-label", "graphique table 1");


var tdTable1 = document.querySelectorAll("#table1 tr td:first-of-type");
var labelPays1 = [];
for(let x in tdTable1){
    if(tdTable1[x].innerHTML !== undefined){
    labelPays1.push(tdTable1[x].innerHTML);
    }
}

var thTable1 = document.querySelectorAll("#table1 tbody tr:first-of-type th");
var labelYears=[];
for(x=2; x<thTable1.length; x++){
  labelYears.push(thTable1[x].innerHTML);
}

var data1 = document.querySelectorAll("#table1 td");
var dataTable1=[];
for(let x in data1){
    dataTable1.push(data1[x].innerHTML)
}

function toNumber(array, newArray){
    for(i=0; i<array.length; i++){
        if(array[i] == undefined){
        }    
        else if(array[i].includes(",")){
        newArray[i] = array[i].replaceAll(",",".");
        }
        else{
        newArray[i] = array[i];
        }
    }
}

var data1Number=[];
toNumber(dataTable1, data1Number);

var data1Array =[];
var x = 1;
var y = 12;
for(i=0; i<(data1Number.length/12); i++){
    data1Array[i]=data1Number.slice(x, y);
    x+=12;
    y+=12;
}


function dataset(label, data, backgroundColor, borderColor){
this.label = label;
this.data = data;
this.backgroundColor = backgroundColor;
this.borderColor = borderColor;
}


var backgroundColor=[];
for(x=0; x<labelPays1.length; x++){
   backgroundColor[x]= "#"+Math.floor(Math.random() * 16777215).toString(16);
}
var borderColor = backgroundColor;

const dataset1 = [];
for(x=0; x<labelPays1.length; x++){
    dataset1[x] = new dataset(labelPays1[x], data1Array[x], backgroundColor[x],borderColor[x]);
};


const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labelYears,
        datasets: dataset1,                 
    },
    options: {
        responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      
    },        
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

//Second table
var div2 = document.createElement("div");
var canva2 = document.createElement("canvas");
var targ2 = document.getElementById("Homicides");
targ2.appendChild(div2);
div2.appendChild(canva2);
canva2.id = "myChart2";


const ctx2 = document.getElementById('myChart2');
canva2.setAttribute("aria-label", "graphique table 2");

var tdTable2 = document.querySelectorAll("#table2 tr td:first-of-type");
var labelPays2Prov = [];
for(let x in tdTable2){
    if(tdTable1[x].innerHTML !== undefined){
    labelPays2Prov.push(tdTable2[x].innerHTML);
    }
}

var labelPays2 = [];
for(x=0; x<labelPays2Prov.length; x++){
    if(labelPays2Prov[x].includes("<br>")){ 
     labelPays2[x] = labelPays2Prov[x].replace(/^\s+|\s+$/gm,'');
     labelPays2[x] = labelPays2[x].replace("<br>","");
    }
    else{
        labelPays2[x] = labelPays2Prov[x];
    }
}



var thTable2 = document.querySelectorAll("#table2 thead tr:first-of-type th");
var labelYears2=[];
for(x=2; x<thTable2.length; x++){
  labelYears2.push(thTable2[x].innerHTML);
}

var data2 = document.querySelectorAll("#table2 td");
var dataTable2=[];
for(let x in data2){
    dataTable2.push(data2[x].innerHTML)
}

var data2Number = [];
toNumber(dataTable2, data2Number);

var data2Array =[];
var x = 1;
var y = 3;
for(i=0; i<(data2Number.length/3); i++){
    data2Array[i]=data2Number.slice(x, y);
    x+=3;
    y+=3;
}


data2Column1 = [];
for(x=0; x<data2Array.length; x++){
    data2Column1.push(data2Array[x][0]);
}

data2Column2 = [];
for(x=0; x<data2Array.length; x++){
    data2Column2.push(data2Array[x][1]);
}


// function dataset2(data, backgroundColor){
//     this.data = data;
//     this.backgroundColor = backgroundColor;
// }


const dataCanva2 = {
labels: labelPays2,
datasets: [
    {
label: 'Table 2007/09',
data: data2Column2,
backgroundColor : backgroundColor,
hoverOffset: 4
},
{
label: 'Table 2010/12',
data: data2Column1,
backgroundColor : backgroundColor,
hoverOffset: 4
}
]
};

const myChart2 = new Chart(ctx2, {
    type: 'pie',
    data: dataCanva2,
    options :{
        responsive: true,
           plugins: {
             legend: {
               position: 'top',
         },
         title:{
         display: true,
         text: 'Homicide 2007-09/2010-12',
         }
        }
       },
});


//Table h1

var title = document.getElementById("firstHeading");
var div3 = document.createElement("div3");
var canva3 = document.createElement("canvas");
title.appendChild(div3);
div3.appendChild(canva3);
canva3.id = "myChart3";
canva3.style.width = "800px";

const ctx3 = document.getElementById('myChart3');
canva3.setAttribute("aria-label", "graphique");

var config = {
    type: 'line',
    data: {
        labels: [0, 1, 2, 3, 4, 6, 7, 8, 9],
        datasets: [
            {
                label: "Data",
                data: [],
                backgroundColor : "red",
                borderColor : "black",
            }
        ]                 
    },
     options: {
        responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      
    },        
        scales: {
            y: {
                min: -20,
                max: 40,
            }
        }
    },
    
 };

 const myChart3= new Chart(ctx3, config);


function addData(chart, data) {
        chart.data.datasets.forEach((dataset) => {
            dataset.data = data;
        });
        chart.update();
};



var inter = setInterval(fetchF, 1000);


function fetchF(){

    fetch("https://canvasjs.com/services/data/datapoints.php", {cache: "reload"})
    .then(response=> response.json())
    .then(datapoints => {
        
        addData(myChart3, datapoints);
  
    });

};













