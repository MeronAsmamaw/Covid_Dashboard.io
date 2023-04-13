
var input = document.querySelector("#input");

var totalConfirmed = 0;
var totalDeath = 0;
var totalRecoverd = 0;

var obj;


  // Set the API endpoint URL
  var myurl = "https://api.covid19api.com/countries";
  var countryInputElement = document.getElementById("input");
  var countryListElement = document.getElementById("country-list");

// filter
 fetch(myurl)
     .then(response => response.json())
     .then(data => {
         // Use the API data to populate the datalist
         for (var i = 0; i < data.length; i++) {
             var countryName = data[i].Country;
             var countryCode = data[i].ISO2;
             var countrySlug = data[i].Slug;

             var newOptionElement = document.createElement("option");
             newOptionElement.value = countryName + " (" + countryCode + ")";
             newOptionElement.setAttribute("data-slug", countrySlug);
             countryListElement.appendChild(newOptionElement);
         }


      })
     .catch(error => {
         console.error("Error fetching data from API:", error);
     });
// });

  var url=`https://api.covid19api.com/summary`
fetch(`https://api.covid19api.com/summary`)
    .then(response => response.json())
    .then(data => {
        obj = JSON.stringify(data);
        localStorage.setItem("obj", obj);
        let myObj = localStorage.getItem("obj");
        let object = JSON.parse(myObj);
        cards(object.Global);
    }).catch(error => console.error(error))


     async function search() {
     let objects;
    await fetch(`https://api.covid19api.com/summary`)
    .then(response => response.json())
    .then(data => {
        obj = JSON.stringify(data);
        localStorage.setItem("obj", obj);
        let myObj = localStorage.getItem("obj");
        objects = JSON.parse(myObj);
    }).catch(error => console.error(error))

  var l;
  var l2;
  var l3;
  //console.log(objects.Countries);
    for (i = 0; i < objects.Countries.length; i++) {
        if (objects.Countries[i].Country == input.value) {
           l = objects.Countries[i].TotalConfirmed;
           l2 = objects.Countries[i].TotalDeaths;
           l3 = objects.Countries[i].TotalRecovered 
        }   
    }
    
    draw(l,l2,l3);
    draw1(l,l2,l3);
    draw2(l,l2,l3);
    draw3(l,l2,l3);
    draw4(l,l2,l3);
    console.log(l);
    console.log(l2);
    console.log(l3);

}
//================================================================================================//
// async function cards(info){
//     const c1 = document.getElementById('total').innerHTML;
//     const c2 = document.getElementById('death').innerHTML;
//     const c3 = document.getElementById('recover').innerHTML;
//    c1 = info.TotalConfirmed;
//    c2 = info.TotalDeaths;
//    c3 = info.TotalRecovered;
// }


// chart 1
async function draw(data,data1,data2) {
    Highcharts.chart('t1', {
        title: {
            text: 'Countries covid status',
            align: 'left'
        },
        xAxis: {
            categories: ['Total Confirmed', 'Total Death', 'Total Recovery']
        },
        yAxis: {
            title: {
                text: 'Total amount'
            }
        },
        
        series: [{
            type: 'column',
            name: '2023-3',
            data: [parseFloat(data),parseFloat(data1),parseFloat(data2)]
        }]
    });
}
draw();
// chart 2
async function draw4(data13,data14,data15){
Highcharts.chart('t2', {
    chart: {
        type: 'area'
    },
    accessibility: {
        description: 'Image description: An area chart compares the covid status of  Kenya and USA  2023-3 based on total confirmed,death and recovery.'
    },
    title: {
        text: ' covid status'
    },
    xAxis: {
        categories: ['Total Confirmed', 'Total Death', 'Total Recovery']
    },
    yAxis: {
        title: {
            text: 'total number'
        },
        labels: {
            formatter: function () {
                return this.value / 1000 + 'k';
            }
        }
    },
    series: [{
        name: '2023-3',
        data: [
            parseFloat(data13), parseFloat(data14), parseFloat(data15)
        ]
    }, 
]
});
}
draw4();
//chart 3
async function draw1(data4,data5,data6){
    Highcharts.chart('t3', {

        title: {
            text: 'Covid staus of a country'
        },
    
        xAxis: {
            categories: ['Total Confirmed', 'Total Death', 'Total Recovery']

        },
    
        yAxis: {
            title:'Total amount',
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
    
     
    
        series: [{
            name: '2023-3',
            data: [parseFloat(data4),parseFloat(data5),parseFloat(data6)],
           
        }]
    });
}
draw1();
// chart 4
async function draw2(data7,data8,data9){
    Highcharts.chart('t4', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'covid status'
        },
       
        xAxis: {
            categories: ['Total Confirmed', 'Total Death', 'Total Recovery'],
            accessibility: {
                description: '2023-3'
            }
        },
        yAxis: {
            title: {
                text: 'Total Amount'
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: '2023-3',
            marker: {
                symbol: 'square'
            },
            data: [parseFloat(data7),parseFloat(data8),parseFloat(data9),{
              
            }]
    
        },]
    });
    
}
draw2();
// chart 5
async function draw3(data10,data11,data12){
    Highcharts.chart('t5', {

        chart: {
            type: 'column'
        },
    
        title: {
            text: 'covid status, grouped by continent',
            align: 'left'
        },
    
        xAxis: {
            categories: ['Total Confirmed', 'Total Death', 'Total Recovered']
        },
    
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'count total'
            }
        },
    
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
    
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
    
        series: [{
            name: 'Algeria',
            // 271496, 6881, 0
            data: [parseFloat(data10),parseFloat(data11),parseFloat(data12)],
            stack: 'Africa'
        }, {
            name: 'Angola',
            // 105288, 1933, 0
            data: [parseFloat(data10),parseFloat(data11),parseFloat(data12)],
            stack: 'Africa'
        }, {
            name: 'Bangladesh',
            // 2037871, 29445, 0
            data: [parseFloat(data10),parseFloat(data11),parseFloat(data12)],
            stack: 'Asia'
        }, {
            name: 'Indias',
            // 44690738, 530779, 0
            data: [parseFloat(data10),parseFloat(data11),parseFloat(data12)],
            stack: 'Asia'
        }]
    });
    
}
draw3();