//http://bgrins.github.io/ExpandingTextareas/

var SHOW_COUNTS = true;

function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

var word_count = function(id){

    // Split and slugify
    var words = $("#countbox").val()
    var slugs = slugify(words).split('-');
    
    // Histogram slugs
	  var counts = {}; 
	  for (var i=0; i<slugs.length; i++) {
        w = slugs[i];
        if(w) {
		        counts[w] = counts[w] || 0;
		        counts[w]++;
        };
	  }

    // Build an object to return
    var arr = []; 
	  for (w in counts) {
		    arr.push({
			      word: w,
			      frequency: counts[w]
		    });
	  }

    return arr.sort(function(a,b){
		    return (a.frequency > b.frequency) ? -1 : 
            ((a.frequency < b.frequency) ? 1 : 0);
	  });
    
};



$(document).ready(function() {

    var box = $('#countbox');

    box.on('input', update_box);
    box.change(update_box);
    box.load(update_box);
    box.on("active", update_box);
    box.on("focus", update_box);
    box.on("propertychange", update_box);
    
    $("#clear_button").click(function() {
        box.val("");
        update_box("#countbox");
    });

    $("#hide_button").click(function() {
        SHOW_COUNTS = !SHOW_COUNTS;
        update_box("#countbox");
    });

    $("#hipster_button").click(function() {
        box.attr("placeholder", "Shhh. Loading hipster ipsum. Don't tell anyone. You'll ruin it.");

        var payload = {paras:"2",
                       html:"false"};
        box.val("");

        $.getJSON('http://hipsterjesus.com/api/', payload, function(data) {
            box.val( data.text );
        }); 
        update_box("#countbox");

    });

});

var update_box = function() {
    console.log("RUNNING");

    var box = $("#result");
    var A = word_count('countbox');

    box.empty();

    for(pair in A) {
        w = A[pair].word;
        f = A[pair].frequency;

        var result = $("<div>", {class: "result"});
        var div_w = $("<div>", {class: "word"}).text(w);
        var div_f = $("<div>", {class: "frequency"}).text(f);

        result.append(div_w);
        
        if(SHOW_COUNTS){ 
            result.append(div_f); };

        box.append(result);  
    }
};

