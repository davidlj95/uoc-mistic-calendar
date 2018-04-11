/** when ready, load table **/
$( document ).ready(function() {
    $("table").tablesorter({sortList: [[3,0]]});
    load_table();
});

function load_table() {
    // get events
    $.get("events.csv", null, loaded_events)
}

function loaded_events(data, status, jqxhr) {
    data = data.split("\n");
    csv = []
    // transform each row into an array
    for (i = 0; i < data.length; i++) {
        csv.push(data[i].split(","))
    }
    // remove invalid columns
    for (i = 0; i < csv.length; i++) {
        if(csv[i].length < 5) {
            csv.splice(i, 1)
        }
    }
    // remove header
    csv.splice(0, 1)
    // add to table
    add_data(csv);
}

function add_data(data) {
    // find table
    table = $("table");
    table_body = table.find("tbody")
    data.forEach(function(el){
        row = $("<tr class='addedRows'>")
        // add info
	for(i=0;i<el.length-1;i++) {
		row.append($("<td>").append(el[i]))
	}
        // add duration
        start_date = Date.parse(el[2]);
        end_date = Date.parse(el[3]);
        duration = new TimeSpan(end_date - start_date);
        row.append($("<td>").append(duration.days + " dies"))
	// check if done
	if(el[4] == "1") {
		row.css("background-color", "GreenYellow")
	}
        // add row
        table_body.append(row)
    })
    var config = $( 'table' )[ 0 ].config,
      $rows = $( 'tr.addedRows' ), // jQuery selector of newly appended row(s)
      // applies or reapplies a sort to the table; use false to not update the sort
      resort = true, // or [ [0,0], [1,0] ] etc
      callback = function( table ) {
        // do something
      };
      $.tablesorter.addRows( config, $rows, resort, callback );
}
