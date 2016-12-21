
 //.........variable declaration ...........................//
var countryIndex=0;
var saltIndex=0;
var sugarIndex=0;
var fatIndex=0;
var protienIndex=0;
var carbohydrateIndex=0;

var countries=['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
var sugarArray=[];
var saltArray=[];
var countArray=[];

var north=['United Kingdom', 'Denmark', 'Sweden and Norway'];
var central=['France', 'Belgium', 'Germany', 'Switzerland and Netherlands'];
var south=['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia and Albania'];
var fats=[];
var protien=[];
var carbohydrate=[];
var count=[];

var head=0;

var re=/,(?=(?:(?:[^"]*"){2})*[^"]*$)/ ;


for(var i=0; i<countries.length; i++)
{
  sugarArray[i]=0;
  saltArray[i]=0;
  countArray[i]=0;
  
}

for(var i=0; i<3; i++)
{
  fats[i]=0;
  protien[i]=0;
  carbohydrate[i]=0;
  count[i]=0;
}


//........................................................//
 


function toJson(csvData) {

  
  var lines = csvData.split("\n");

  var header = lines[0].split(re);
  countryIndex=header.indexOf("countries_en");
  saltIndex=header.indexOf("salt_100g");
  sugarIndex=header.indexOf("sugars_100g");
  


  var records=[]; //array to store filtered data as objects 

  for(var i = 1; i < lines.length; i++) 
  {
    
    var rowArray = lines[i].split(re);
    if(countries.includes(rowArray[countryIndex]))
    {
        var index=countries.indexOf(rowArray[countryIndex]);
        
    }

    else
        continue;

    var salt=rowArray[saltIndex];
    var sugar=rowArray[sugarIndex];
    sugarArray[index]+= Number(sugar);
    saltArray[index]+=Number(salt);
    countArray[index]++;
    
  }
  


  
  for(var j=0; j<countries.length; j++)
  {
      var obj={};
      obj["country"] = countries[j];
      obj["salt"] = saltArray[j]/countArray[j];
      obj["sugar"]= sugarArray[j]/countArray[j];
      records.push(obj);
    
  }
  
  return records;
}


//......Function for second requirement(regions).....//

function toJsonRegions(csvData){
  
  var lines = csvData.split("\n");
  var header = lines[0].split(re);
  
  fatIndex=header.indexOf("fat_100g");
  protienIndex=header.indexOf("proteins_100g");
  carbohydrateIndex=header.indexOf("carbohydrates_100g");

  var records=[]; //array to store filtered data as objects 

  for(var i = 1; i < lines.length; i++) 
  {
    var fats_val=0;
    var protien_val=0;
    var carbohydrate_val=0;

   var rowArray = lines[i].split(re);

    if(!(rowArray[fatIndex]==""))  //if the values are not null then assign the same otherwise they are 0
    {
       fats_val=rowArray[fatIndex];
    }
    
     if(!(rowArray[protienIndex]==""))
    {
       protien_val=rowArray[protienIndex];
    }

     if(!(rowArray[carbohydrateIndex]==""))
    {
       carbohydrate_val=rowArray[carbohydrateIndex];
    }

    

    //var fats_val=rowArray[fatIndex].replace("",0);
    //var protien_val=rowArray[protienIndex].replace("",0);
    //var carbohydrate_val=rowArray[carbohydrateIndex].replace("",0);

    if(north.includes(rowArray[countryIndex]))
    {
        fats[0]+= Number(fats_val) ;
        protien[0]+= Number(protien_val);
        carbohydrate[0]+=Number(carbohydrate_val);
        count[0]++;
    }

    else if(central.includes(rowArray[countryIndex]))
    {   fats[1]+= Number(fats_val) ;
        protien[1]+= Number(protien_val);
        carbohydrate[1]+=Number(carbohydrate_val);
        count[1]++;
    }

    else if (south.includes(rowArray[countryIndex]))
    {
        fats[2]+= Number(fats_val) ;
        protien[2]+= Number(protien_val);
        carbohydrate[2]+=Number(carbohydrate_val);
        count[2]++;
    }

    else
        continue;
    
  } //end of for loop


  var obj={}; 
  obj["region"]="north";
  obj["fat"]=fats[0]/count[0];
  obj["protien"]= protien[0]/count[0];
  obj["carbohydrate"]=carbohydrate[0]/count[0];
  records.push(obj);

  var obj={}; 
  obj["region"]="central";
  obj["fat"]=fats[1]/count[1];
  obj["protien"]= protien[1]/count[1];
  obj["carbohydrate"]=carbohydrate[1]/count[1];
  records.push(obj);
  


  
  var obj={}; 
  obj["region"]="south";
  obj["fat"]=fats[2]/count[2];
  obj["protien"]= protien[2]/count[2];
  obj["carbohydrate"]=carbohydrate[2]/count[2];
  records.push(obj);

  
  return records;

  
} //end of function

var fs=require('fs');

var data=fs.readFileSync('../csv_json/FoodFacts.csv', 'utf8');

json=toJson(data);


var d=fs.writeFile('../csv_json/FFacts.json', JSON.stringify(json,null,"\n\t"),'utf8', function(error){
 	if(error){
 		throw error;
 	}
 } );


jsonRegions=toJsonRegions(data);
var dt=fs.writeFile('../csv_json/FFactsRegions.json', JSON.stringify(jsonRegions,null,"\n\t"),'utf8', function(error){
  if(error){
    throw error;
  }
 } );


console.log(JSON.stringify(json));