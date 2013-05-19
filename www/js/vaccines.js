 
 	var sd= "";
 	var vac = "";
 	var loc = "";
 	var not =  "";
 	var idNumber  = 0;
 	var display = false;

    document.addEventListener("deviceready", onDeviceReady, false);

    // Populate the database 
    //
    function populateDB(tx) {
       // tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, vaccine, location, sd, notes)');
        //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }

    function insertDB(tx){
    	tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, vacccine, location, sd, notes)');
    	tx.executeSql('INSERT INTO DEMO (id, vaccine, location, sd, notes) VALUES ('+(idNumber+1)+', "'+vac+'", "'+loc+'", "'+sd+'", "'+not+'")');
       // tx.executeSql('INSERT INTO DEMO (id, vaccine, location, sd, notes) VALUES (2, "d", "d", "df", "d")');

    }
    // Query the database
    //
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM DEMO ORDER BY sd', [], querySuccess, errorCB);
    }



    // Query the success callback
    //
    function querySuccess(tx, results) {
        var len = results.rows.length;
        idNumber = len;
        console.log("DEMO table: " + len + " rows found.");

       // if(display){
	        var list  = document.getElementById("listToEvents");
            while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
	        for (var i=0; i<len; i++){
	        	
	        	var elem = document.createElement("li");
	        	var anchor = document.createElement("a");
	        	anchor.setAttribute('href', '#');
	        	anchor.setAttribute('data-rel', 'popup');
	        	anchor.setAttribute('data-transition', 'slideup');

	        	var content = document.createTextNode("Date: "+results.rows.item(i).sd+"   "+results.rows.item(i).vaccine +"  Location:  "+results.rows.item(i).location);
				anchor.appendChild(content);
				elem.appendChild(anchor);
				list.appendChild(elem);

	            console.log("Row = " + i + " ID = " + results.rows.item(i).vaccine + " Data =  " + results.rows.item(i).location +" "+results.rows.item(i).sd);
	        }
            try {
                $('#listToEvents').listview('refresh');
            } catch(e) {
                // $('#listToEvents').listview();
            }
	        
    	//}	
    }

    // Transaction error callback
    //
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCB() {
        console.log("success creating the table");
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(queryDB, errorCB);
    }

    // Cordova is ready
    //
    function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(populateDB, errorCB, successCB);
        onCartillas();
    }

    // inserting a new event
    function insert(d, t, l, n){
    	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
    	sd = d;
    	vac = t;
    	loc = l;
    	not = n;
        db.transaction(insertDB, errorCB, successCB);
    }

    // Getting all the vaccines
    function getVaccines(){
    	display  =true;
    	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(queryDB, errorCB, successCB);
    }


    /*

    <div data-role="controlgroup" data-type="vertical">
        <div class="ui-grid-a">
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
        </div>
    </div>

    */


