//my last fm api key
//this allows for me to gather the last fm api methods
//needs to be chained in gathering urls
var api_key = '7654440140861f790c50ea93d9db5b98';

//my personal lastfm username for testing and gathering
var my_username = 'maxwellmoffat';

//checking change event on display option radio buttons
$('input[type=radio][name=displayOption]').change(function(){
  if(this.value == 'list'){
    //console.log('list was selected');
    $("#display-count-grid").css("display", "none");
    $("#display-count-list").css("display", "inline-block");
  }
  else if(this.value == 'grid'){
    $("#display-count-list").css("display", "none");
    $("#display-count-grid").css("display", "inline-block");
  }
});

//on click event to place username variable into base url
function processUser(){

  $('#display-option-error').css('display', 'none');
  $('#username-error').css('display', 'none');
	$('#results-list').html('');
  $('#results-grid').html('');

	var username = document.getElementById('username-input').value;
	var period = document.getElementById('period').value;
  var displayOption = $('input[name=displayOption]:checked').val();

  //console.log(displayOption);

  if(username === ''){
    $("#username-error").css("display", "block");
    $("input#username-input").css("margin-bottom", "0");
  }

  //display list function
  if(displayOption === 'list'){
    $(function(){
      var limit = $('select#display-count-list option:selected').val();
  		var user_url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user='+username+'&period='+period+'&api_key='+api_key+'&limit='+limit+'&format=json';
  		$.getJSON(user_url, function(data){

        //logging fetched data
  			console.log(data.topalbums.album);

  			$.each(data.topalbums.album, function(key, val){
  				$('#results-list').append($('<li>').html(''+val.name+' - '+val.artist['name']+'<br/><img style="margin-top:10px;" src='+val.image[2]["#text"]+'/>'));
  			});

  		});
  	});
  }

  //display grid function
  else if(displayOption === 'grid'){
    $(function(){
      var limit = $('select#display-count-grid option:selected').val();
      var user_url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user='+username+'&period='+period+'&api_key='+api_key+'&limit='+limit+'&format=json';
  		$.getJSON(user_url, function(data){

        //logging fetched data
        console.log(data.topalbums.album);

  			$.each(data.topalbums.album, function(key, val){
  				$('#results-grid').append($('<div>').html('<span id="album-name">'+val.name+' / <br />'+val.artist['name']+' /<br />'+val.playcount+'</span><img src='+val.image[3]["#text"]+'/>'));
          console.log(val.playcount);
      	});

  		});
    })
  } else{
    $('#display-option-error').css('display', 'block');
  }


};
