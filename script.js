//First graph variables
var div = document.createElement("div");
var canva = document.createElement("canvas");
var targ = document.getElementById("Crimes_et_d.C3.A9lits_enregistr.C3.A9s_par_les_services_de_police");
targ.appendChild(div);
div.appendChild(canva);
canva.id = "myChart";
canva.style.paddingTop = "30px";
canva.setAttribute("aria-label", "graphique table 1");

const ctx = document.getElementById('myChart');

//Second graph variables
var div2 = document.createElement("div");
var canva2 = document.createElement("canvas");
var targ2 = document.getElementById("Homicides");
targ2.appendChild(div2);
div2.appendChild(canva2);
canva2.id = "myChart2";
canva2.style.paddingTop = "30px";
canva2.style.maxHeight = "600px";
canva2.setAttribute("aria-label", "graphique table 2");

const ctx2 = document.getElementById('myChart2');

//Third graph variables
var title = document.getElementById("firstHeading");
var div3 = document.createElement("div3");
var canva3 = document.createElement("canvas");
title.appendChild(div3);
div3.appendChild(canva3);
canva3.id = "myChart3";
canva3.style.width = "800px";
canva3.style.padding = "20px";
canva3.setAttribute("aria-label", "graphique");

const ctx3 = document.getElementById('myChart3');


//Functions
/**
 * Array of pays without undefined
 * @param {array of string} tdTable 
 * @param {array of string} pays 
 */
function pays(tdTable, pays){
    for(let x in tdTable){
        if(tdTable[x].innerHTML !== undefined){
        pays.push(tdTable[x].innerHTML);
        }
    };
};

/**
 * Array of years 
 * @param {array of int} thTable 
 * @param {array of int} years 
 */
function years(thTable, years){
    for(x=2; x<thTable.length; x++){
        years.push(thTable[x].innerHTML);
    };
};

/**
 * Get data from the table
 * @param {array of string} dataT 
 * @param {array of string} dataTable 
 */
function getData(dataT, dataTable){
    for(let x in dataT){
        dataTable.push(dataT[x].innerHTML);
    };
};

/**
 * Transform number string in number decimal and delete undefined
 * @param {array of string} array 
 * @param {array of string and decimal} newArray 
 */
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
    };
};


//First graph
var tdTable1 = document.querySelectorAll("#table1 tr td:first-of-type");
var labelPays1 = [];
pays(tdTable1, labelPays1);


var thTable1 = document.querySelectorAll("#table1 tbody tr:first-of-type th");
var labelYears=[];
years(thTable1, labelYears);


var data1 = document.querySelectorAll("#table1 td");
var dataTable1=[];
getData(data1, dataTable1);

var data1Number=[];
toNumber(dataTable1, data1Number);

var data1Array =[];
var x = 1;
var y = 12;
for(i=0; i<(data1Number.length/12); i++){
    data1Array[i]=data1Number.slice(x, y);
    x+=12;
    y+=12;
};

/**
 * Object
 * @param {string} label 
 * @param {decimal} data 
 * @param {string} backgroundColor 
 * @param {string} borderColor 
 */
function dataset(label, data, backgroundColor, borderColor){
    this.label = label;
    this.data = data;   
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
};


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
        pointHoverBorderWidth: 10,
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
       },   
       layout: {
        autopadding : true,
       },  
       scales: {
            y: {
                beginAtZero: true,
                },
        }
    }
});

//Second table
var tdTable2 = document.querySelectorAll("#table2 tr td:first-of-type");
var labelPays2Prov = [];
pays(tdTable2, labelPays2Prov);

//Remove br and spaces 
var labelPays2 = [];
for(x=0; x<labelPays2Prov.length; x++){
    if(labelPays2Prov[x].includes("<br>")){ 
     labelPays2[x] = labelPays2Prov[x].replace(/^\s+|\s+$/gm,'');
     labelPays2[x] = labelPays2[x].replace("<br>","");
    }
    else{
        labelPays2[x] = labelPays2Prov[x];
    }
};

var thTable2 = document.querySelectorAll("#table2 thead tr:first-of-type th");
var labelYears2=[];
years(thTable2, labelYears2);


var data2 = document.querySelectorAll("#table2 td");
var dataTable2=[];
getData(data2, dataTable2);

var data2Number = [];
toNumber(dataTable2, data2Number);

var data2Array =[];
var x = 1;
var y = 3;
for(i=0; i<(data2Number.length/3); i++){
    data2Array[i]=data2Number.slice(x, y);
    x+=3;
    y+=3;
};


data2Column1 = [];
for(x=0; x<data2Array.length; x++){
    data2Column1.push(data2Array[x][0]);
};

data2Column2 = [];
for(x=0; x<data2Array.length; x++){
    data2Column2.push(data2Array[x][1]);
};

const dataCanva2 = {
    labels: labelPays2,
    datasets: [
        {
        label: 'Table 2007/09',
        data: data2Column2,
        backgroundColor : backgroundColor,
        hoverOffset: 30,
        },
        {
        label: 'Table 2010/12',
        data: data2Column1,
        backgroundColor : backgroundColor,
        hoverOffset: 30,
        }   
    ]
};

const myChart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: dataCanva2,
    options :{
        cutout: "30%",
        responsive: true,
        layout: {
        autopadding : true,
        },  
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

var config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: "Data",
                data: [],
                backgroundColor : "black",
                borderColor : "red",
            }
        ]                 
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
            display: false,
            },
        },  
        scales: {
            y: {
                suggestedMin: -10,
                suggestedMax: 30,
                }
        }
    },
    
 };

const myChart3= new Chart(ctx3, config);

/**
 * Update data in chart
 * @param {chart} chart 
 * @param {int} label 
 * @param {int} data 
 */
function addData(chart,label, data) {
        chart.data.labels = label;
        chart.data.datasets.forEach((dataset) => {
            dataset.data = data;
        });
        chart.update();
};



var inter = setInterval(fetchF, 1000);
var label3 = [];

/**
 * interval to fetch url 
 */
function fetchF(){

    fetch("https://canvasjs.com/services/data/datapoints.php", {cache: "reload"})
    .then(response=> response.json())
    .then(datapoints => {

        for(x=0; x<datapoints.length; x++){
            label3[x] = datapoints[x][0];
        };
       
        addData(myChart3, label3, datapoints);
  
    });
    
};
