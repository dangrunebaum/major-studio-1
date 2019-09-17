
// load data in preload 
// in setup, loop through Culture column and sort by value e.g. "Chinese"
// count how many for each value
// only keep rows with top 10 value for Culture column  
// create data structure with only Culture and Object End Date values: {culture: Chinese, years: [1204, 1245, 1324, etc.]}
// Deal with BC (indicated with a -) and AD dates
// save earliest and last dates for X axis
// draw lines and fills for each Culture object
// draw X and Y axes, marks, labels, key and title/subtitle  
//let colorArray;
let table; 
// capture counts for unique culture names 
const o_cultures = {};

function preload() {

  table = loadTable("./metobjects-sorted.csv", "csv", "header");
  //console.log(table);
  
}

function setup() {

// capture all culture strings in an array 
 var a_cultures = table.getColumn('Culture');

// data for transforming single values to other values 
const nameMap = {
		Japan: "Japanese", 
		India: "Indian"
	};
// process every culture string 	
a_cultures.forEach(e => {

	if(e !== "" //cannot contain empty strings 
		&& e.indexOf("?") === -1 //cannot contain question mark 
		&& e.indexOf(" or ") === -1 //cannot contain or
		&& e.indexOf(" and ") === -1)//cannot contain and
		{ 
			let comma = e.indexOf(","); //truncate string at comma
			if(comma !== -1){
				e=e.substring(0, comma);
			}
			let semi = e.indexOf(";"); //truncate string at semicolon 
			if(semi !== -1){
				e=e.substring(0, semi);
			};
			
			let open = e.indexOf(" (");//truncate string at " ("  
			if(open !== -1){
				e=e.substring(0, open);
			};
	
			if(nameMap[e]){ //transform single values to other values 
				e = nameMap[e];
			}

// if not empty create entry 
			if (!o_cultures[e]) {
				o_cultures[e] = 0; //initialize to 0
			}
			o_cultures[e]++; //add 1
		}

});
const counts = //create array of cultures and counts 
Object.keys(o_cultures).map(
	(key)=>[key, o_cultures[key]]
		);

counts.sort(byCultureCount); //sort array descending 
function byCultureCount(a, b){
	return b[1]-a[1];
}
console.log(counts);

  createCanvas(2000, 1200)
  background(0)
  var x = 125
  var y = 125

for (var i = 0; i < 10; i++){
  var colorArray = ["CornflowerBlue", "green", "yellow", "orange", "red", "brown", "PaleVioletRed", "purple", "violet", "white"];	
  fill(colorArray[i]);
  rect(x, y, counts[i][1]*0.03, 20);
  textFont("Arial");
  textStyle(BOLD);
  textAlign(RIGHT);
  textSize(16);
  text(counts[i][0], x - 10, y + 15);
  let val = counts[i][1];
  text(val, 1100, y + 15);

  y +=25

  textStyle(NORMAL);
  textAlign(LEFT);
  textSize(30);
  text("The Met: Top 10 Cultures by Object", 125, 70);

};

}



// function draw(){
//   ellipse(0,0,100,100);
// }
 
   
//  createCanvas(windowWidth, windowHeight);
