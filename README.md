# ES6 Classes
## Object oriented programming in JS

## What we will learn
1. Classes for the regular business object
2. Classes which can be extended
3. Data service class
4. User interface classes
5. Class to hold an entire web application

## Preq
- Fundamental JS development

## What's in the course
0. Introduction
1. Classes
2. Inheritance
3. Data service
4. User interface classes
5. Building an application

## 1. Introduction
In this module we will start by setting up of our environment. For setting up of our environment we need to clone 'Javascript-starter-kit'. Remove .git file and create a new git repo with this application in mind. Then setup git according to git instructions. We will start by creating starter kit more generic so that it could be used in other type of application like this.

1. Change name of the project in package.json file along with description.
2. Now run npm install to install packages required.
3. Lets take a look of the files that could be used generically. Lets examine inside the buildscripts folder

## 1. Classes
### 1.1 Defining classes

Lets assume we are coding an application for a company that has fleet of Drone and self driving cars combined vehicles.

The 'Drone' is a real entity and but we have to code it into our application and we know it will contain variables like flightTimeLeft, numberOfRotors, batteryPower, Speed etc, for that purpose we need Objects. Objects are also referred as 

- Representation - as it represents the real object
- Abstraction 
- Model
- Thing 
- Entity
- Business Object
- Object
	
We will be referring it as Object

### 1.2 Classes
Classes could be referred as blueprints for creating Drone objects or instances of Drones

There could be thousands or millions of this kind of objects. When to use classes is bit confusing in case of JavaScript as classes do not behave same to other class oriented programming languages. Keep in mind this difference and some thumb rules for using classes 

Lets assume an example 

Case 1

```
class Auth {
  login(req, res) {...}
  signup(req, res) {...}
}

module.exports = new Auth();

// index.js
const auth = require('auth');
```

Case 2

```
// auth.js
class Auth {
  login(req, res) {...}
  signup(req, res) {...}
}

module.exports = Auth;

// index.js
const Auth = require('auth');
const auth = new Auth();
```

Case 3

```
// auth.js
module.exports = {
  login: (req, res) => {...},
  signup: (req, res) => {...}
};

// index.js
const auth = require('auth');
```

Class Example 1:

- You can not create more than 1 object. Because a module is only executed once. So, on every import you will get the same object. Something similar to singleton. (Correct me here if I misunderstood it)
- You will not be able to access the static methods of the class because you are only exporting the object of the class.

Class Example 2:

- If you have a class that contains nothing but helper methods and the object does not have any state, It makes no sense creating object of this class all the time. So, in case of helper classes, this should not be used.

Object Literal Example:

- You can not do inheritance.
- Same object will be passed around on every require. 

Lets start by creating a actual class

```
class Drone{
}

let drone = new Drone();

console.log(typeof Drone);
console.log(typeof drone);
console.log(drone instanceof Drone);

```
The answer will be 

- typeof Drone - function, this shows class is just a manifestation of constructor function in ES5. 
- typeof drone - object, cool thats the work of class
- drone instanceof Drone - true because it is created out of Drone class

Lets focus on how we can initialize information for class instance 

**Constructor** - We initialize some information to be used by object after its creation. Like in example below we are just logging some output at object creation

```
class Drone{
 constructor(){
 	console.log('Inside Drone construction function');
 	}
}

let drone = new Drone();
```

This will log 'Inside Drone constructor function'

Lets pass some information to constructor function

```
class Drone{
	constructor(id){
		console.log('Id: '+ id);
		}
	}
	
	let drone = new Drone('A123');
```
Here it will print 'Id: A123'. 

In general we don't want to put some heavy processing code inside the constructor as will make delay in creation of object which indirectly will effect the application performance.

### Class Properties

In general we use constructors to create instance variables. Instance variables could be used by the object after creation. 

```
class Drone{
	constructor(id, name){
		this.id = id;
		this.name = name;
		}
	}
	
	let drone = new Drone('A123', 'Flyer');
	console.log(drone.id + ' ' +drone.name);
	//console.log(drone[id] + ' ' +drone[name]);
```

This will output 'A123 Flyer'
Look at commented console statement - can also access instance properties by bracket notation

Lets create two instance variables out of the Drone class 

```
let drone1 = new Drone('A123', 'Flyer');
let drone2 = new Drone('B246', 'Tornado');

console.log(drone1.name +' '+ drone2.name);

```
From above example it is clear that every instance has its own set of properties.

In the above part we learned about the **instance property**. These were the properties that is available to object of the class.

We could also add property to the class itself that property is **static property**. It is defined same way as before in ES5 by dot notation or brackets notation.

```
Drone.maxHeight = 2000;

//try to get this value 

console.log(Drone.maxHeight) // 2000

//try to get the maxHeight property from instance variable

console.log(drone.maxHeight) // undefined

```

you cannot access static properties via instance of class (object).

## Methods
 
The methods are similar to function available to instances of class (objects)

Lets declare a method inside the 'Drone' class that will help it fly 

```

class Drone{
	constructor(id, name){
		this.id = id; 
		this.name = name;
	}
	
	fly(){
		console.log( this.id + ' is taking off'); // 'this' keyword is required. 
		}
}
```	

to call this method 

```
drone1.fly(); // A123 is taking off
drone2.fly(); // B246 is taking off
```
The above type of methods are called **instance methods**

#### Static methods
Like properties we could also define methods on the class. 

```
class Drone{

...constructor code

static getCompany(){
	console.log('Getting company info...');
	}

... fly function code	

}
```
The syntax is simple just a 'static' keyword before function name. To access this static method we need to call it from 'Drone' class and it will return undefined when called from 'drone' object. 

```
Drone.getCompany();
drone1.getCompany(); // error method not defined
```
this will print 'Getting company info...' in console

Like the instance could not access static method, the Class could not access the instance properties.

```
static getCompany(){
	console.log(this.id)
	}
```

This will result in undefined as static method could not access instance variables or you could think like they do not exist for him. 

Now we are moving towards one of the most important feature of a object oriented programming language 

#### Getters and Setters

Getters and Setters are primarily used to create dynamic instance property. 

Lets assume we want to create id variable private. To achieve that we will use `this._id = id` 

Now no outside function could access it without knowing it contain any variable named _id.

```
class Drone{
	constructor(id, name){
		this._id = id;
		this.name = name;
		}
	get id(){
		console.log('in id getter');
		return this._id + 'TEMPORARY';
		}
}

let drone = new Drone('A123');
console.log(drone.id); 

```
Here it will return 'in id getter', 'A123 TEMPORARY' as the output as this time we are getting from the getter not directly from instance variable.

We can also set this private member by using **Setter**

```
...till getter code

set id(value){
		 this._id = id;
		 }
```
to set value 

```
drone.set('B124');
console.log(drone.id); // B124
```
Set function is used to override the value private variable.

## Inheritance 

- Extending a class
- Inheriting constructors
- Inheriting properties
- Inheriting methods
- Organizing class

Lets assume we have two classes of 'Vehicles' like 'Car' and 'Drone', we call them 'Vehicle' because they must be having some similarties thats from where inheritance comes into picture. We take common properties of 'Car' and 'Drone' and make a abstract class names 'Vehicle'. It helps in better arrangement of data and better scope of usage. And as we are working in JS this Vehicle class will inherit from the Object class, it helps us in accessing the functions like `toString`. 

Lets write some code 

### Extending the Class

We extend the class using 'extend' keyword 

```
class Vehicle{
}

class Drone extends Vehicle{
}

class Car extends Vehicle{
}

let c = new Car();

console.log(c instanceof Car); //obviously true
console.log(c instanceof Vehicle); //true
console.log(c intanceof Object); //true
```

So the car is inheriting from both vehicle and object.

### inheriting constructors

 1. The parent class has a constructor 
 
 	```
 	class Vehicle{
 		constructor(){
 			console.log('Constructing vehicle');
 		}
 	}
 	
 	class Car extends Vehicle{
 }
 
 let c = new Car();
 ```
 
 This will give output of 'constructing vehicles' 
 
 2. Lets assume our Car class also has a constructor 
 
 ```
 class Vehicle{
 	constructor(){
 		console.log('constructing vehicles');
 		}
 	}
 
 class Car{
 	constructor(){
 		//super();
 		console.log('constructing car');
 		}
 	}
 	
 let c = new Car();
 ```
 For most of the languages its perfectly okay to do this. But when you run it in JS it will throw error. To call the parent constructor we use `super()` we can also pass value by using `super('value')`
 
 This time uncomment `super()` from the Car constructor, the code will run fine
 
 3. Let's assume you are not declaring any constructor in the 'Vehicle' (parent) class.

 If you remove super from the child constructor it will throw an error as even if it do not have constructor, it has implied constructor. JS simply creates it for you. 
 
 ### Inheriting properties
 Just like the constructor the properties could be inherited and overridden in Classes. Let's try with example. 
 
 ```
 class Vehicle {
 	constructor(){
 		this.gpsEnabled = true;
 		}
 	}
 	
 	Class Car extends Vehicle {
 		constructor(){
 		super();
 		}
	}
	
	let c = new Car();
	console.log(c.gpsEnabled);
 ```
 
 Now override it by defining `this.gpsEnabled = false` inside the 'Car' constructor after `super();`. The 'this' keyword must come after super thats a rule with Constructors. 
 
 ### Inheriting methods
 
 Lets create a method getCompany inside the 'Vehicle' constructor
 
 ```
 getCompanyName(){
  console.log('My company');
  }
  ```
  now call it using the car object
  
  ```
  let car = new Car();
  car.getCompanyName(); //my comapny
  ```
  Objects of the class could access methods declared on the parent class
  
  Now lets override it in Car class. For overriding it we need to declare it with same name inside 'Car' class
  
  ```
  getCompanyName(){
  	console.log('My other car company');
  	}
  ```
  
  now call it similarly to previous step it will give output 'My other car company'. If you want your parent method to be called inside the child overriding method use 'super' keyword to get access to parent members from child. 
  
  ```
  getCompanyName(){
  	super.getCompanyName() // 'my company'
  	console.log('My other car company');
  	}
  	
 ```
 here the order of super does not matter it could go to any place inside the child method.
 
 Now create a static member on 'Vehicle' class 
 
 ```
 static getPowerStatus(){
 	console.log('low');
 }	 
 ```
 
 lets call this static method from 'Car' class
 
 ```
 console.log(Car.getPowerStatus()); 
 ```
 This will give output 'low'. Static members are inherited from parent class declaration to Child class declaration but no objects could access it. Overriding static methods is similar to the instance methods just use the same nahi. Calling the parent static method is also similar by using keyword 'super'. 
 
 ### Organising class into files
 In this part we will put every class into its own file. Create a folder Classes inside the 'src' folder. Remove all code from 'index.js'. Create files 'vehicle.js', 'drone.js' and 'car.js' inside the 'classes' folder.
 
 Now write all these files 
 
 **vehicle.js**
 
 ```
 export class Vehicle{
 	constructor(){
 		console.log('inside vehicle class');
 }
 }
 ```
 
 **drone.js**
 
 ```
 import {Vehicle} from './vehicle.js';
 
 expoort class Drone extends Vehicle{
 	constructor(){
 		super();
 		console.log('inside drone class');
 		}
 }
 ```
 
 **car.js**
 
 ```
 import {Vehicle} from './vehicle';
 
 export class Car extends Vehicle{
 	constructor(){
 		super();
 		console.log('inside car class');
 		}
	}
 ```
 Now import these files into index.js and instantiate them
 
 **index.js**
 
 ```
	import {Drone} from './classes/drone.js';
	import {Car} from './classes/car.js';
	
	let c = new Car();
	let d = new Drone();
```
This will result into calling of constructor of each class. Note that we need not to import 'Vehicle' class inside the 'index.js' file unless we want it explicitly.

Thats end of this module in the next module we will create a 'Data service class'

## 2 Data Service Class

- Create a data service class
- Loading data
- Creating constructors
- Instantiating Objects
- Handling errors
- Validating data
- Querying and sorting data
- Filtering data

Lets create a class to populate data to 'Car' and 'Drone' objects 

create a folder 'services' inside the 'src' folder and create a file 'fleet-data-service.js' inside it

```
import {Car} from '../classes/car.js';
import {Drone} from '../classes/drone.js';

export class FleetDataService{
	constructor(){
		this.cars = [];
		this.drones = [];
		}
	}
``` 	
### Loading data

Lets create a 'fleet.js' inside the src folder with following content

```
export let fleet = [{
    license: 'ABC123',
    type: 'drone',
    model: 'Amazon 1250',
    airTimeHours: '6050',
    base: 'New York',
    latLong: '40.775596 -73.974615'
},
{
    license: 'XYZ456',
    type: 'drone',
    model: 'Amazon 1550',
    airTimeHours: '2100',
    base: 'New York',
    latLong: '40.771956 -73.978531'
},
{
    license: 'QRS678',
    type: 'drone',
    model: 'Google 3800',
    airTimeHours: '300',
    base: 'New York',
    latLong: '40.779423 -73.969411'
},
{
    license: 'AT9900',
    type: 'car',
    make: 'Tesla',
    model: 'Quick Transport',
    miles: '15600',
    latLong: '40.773272 -73.968875'
},
{
    license: 'AT2000',
    type: 'car',
    make: 'Uber',
    model: 'Auto Taxi Plus',
    miles: '400',
    latLong: '40.778878 -73.968435'
},
{
    license: 'AT2020',
    type: 'car',
    make: 'Uber',
    model: 'Zip Trip',
    miles: '12200',
    latLong: '40.778984 -73.962266'
},
{
    license: 'AT4000',
    type: 'car',
    make: 'Lyft',
    model: 'Pick U Up',
    miles: '400',
    latLong: '40.774036 -73.967319'
},
{
    license: 'BT8909',
    type: 'truck',
    make: 'Tesla',
    model: 'Heavy duty',
    miles: '800',
    latLong: '38,43'
}
];
```
This content will be used feed the fleet data 

Now get this data from the 'fleet-data-service.js' class by adding a function 'loadData(fleet)' 

```

  loadData(fleet) {
    for (let data of fleet) {
      switch (data.type) {
        case "drone":
          this.drones.push(data);
          break;
        case "car":
          this.cars.push(data);
          break;
      }
    }
  }
```

now load and get this data by adding this code to 'index.js' file 

```
import {fleet} from './fleet';
import {FleetDataService} from './services/fleet-data-service.js';

let fleetDataService = new FleetDataService();
fleetDataService.loadData(fleet);

console.log(fleetDataService.cars);
```
This will print the fleet data with only cars as field

### Creating core classes

Create 'Vehicle.js' class to accomodate properties common to both 'Drone' class and 'Car' class. 

```
/*eslint-disable no-console */

export class Vehicle {
  constructor(licence, model, latLong) {
    this.licence = licence;
    this.model = model;
    this.latLong = latLong;
  }
}
```

Create 'drone.js' class with data unique to drones like airTimeHours, base

```
import { Vehicle } from "./vehicle";
/*eslint-disable no-console*/

export class Drone extends Vehicle {
  constructor(licence, model, latLong) {
    super(licence, model, latLong);
    this.airTimeHours = null;
    this.base = null;
  }
}
```

Create 'car.js' class with data unique to cars like make, miles

```
import { Vehicle } from "./vehicle";

/*eslint-disable no-console*/

// car -  make, miles; vehicle- licence, type, model, latLong; drone: airTimeHours, base;
export class Car extends Vehicle {
  constructor(licence, model, latLong) {
    super(licence, model, latLong);
    this.make = null;
    this.miles = null;
  }
}
```

Now time to use it in 'FleetDataService' class by rewriting 'loadData' code

```
  loadData(fleet) {
    for (let data of fleet) {
      switch (data.type) {
        case "drone":
          let drone = this.loadVehicleData(data);
          this.drones.push(drone);
          break;
        case "car":
          let car = this.loadVehicleData(data);
          this.cars.push(car);
          break;
      }
    }
  }

  loadVehicleData(data) {
    switch (data.type) {
      case "drone":
        let d = new Drone(data.licence, data.model, data.latLong);
        d.airTimeHours = data.airTimeHours;
        d.base = data.base;
        return d;
        break;
      case "car":
        let c = new Car(data.licence, data.model, data.latLong);
        c.make = data.make;
        c.miles = data.miles;
        return c;
        break;
    }
  }
  
```

Now use it in 'index.js' file 

```

let cars = fleetDataService.cars;
for (let car of cars) {
  console.log(car.make);
}
```

It will let you the unique property to car that is make. 

### Handling data errors
We cannot be 100% sure regarding the data coming from the server. Any data error could break the application so in this section we will store the data errors we could get while loading of the data. Lets start by creating a simple 'data-error.js' file in 'services' folder. This class will contain  'message'  and 'data' property. First will store the message that we want to generate for error and second store the data on which the error has occured.

data-error.js

```
export class DataError {
  constructor(message, data) {
    this.message = message;
    this.data = data;
  }
}
```

create a new variable error in the constructor of the 'FleetDataService' class 

```
this.errors = [ ];
```

Now let's think about the potential error cases. First the vehicle type do not match and we are not using any default statement

```
default: 
let e = new DataError('vehicle not identified or allowed ', data);
this.errors.push(e);
break;
```
Second the error could occur with the property of the data. Hence we will enclose the complete switch statement of 'loadVehicleData' function and in catch we will call DataError class to create an object of error

```
catch(e){
	this.errors.push(new DataError('some error ' , data);
	return null;
	}
```

This will throw any uncaught error regarding the properties

now in 'index.js' print error instead of cars

```
let errors = fleetDataService.errors;

for(let error of errors){
	console.log(error);
	}
	
```
This will throw vehicle not identified error as our dataset contains one 'truck' from 'tesla'

### Validating data

	  





	


	