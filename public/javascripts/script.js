
function sendRequest( keyword ){
	console.log("Inside send request");
	if(!keyword || keyword.length < 1) {
		alert("cannot send request, try once again");
		return;
	}
	// var keywordArray = [];
	// var headers = {
    //         'Content-Type': 'application/json',
    //         'api-key': 'de7bd3d0-2a1f-11e8-9172-3ff24e827f76'
    //     }
    // var data = {
    // 	"body" : keyword
    // }
	axios.post('http://localhost:3000/filter', {"body" : keyword})
		.then((response) => {
			console.log(response);
		})
		.catch((err) => {
			console.log(err);
		});
	let url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDo_FttfQSwU-g_hc0R5zQ5GazplE0Ir9c&cx=006296329646981707706:4r1ah8y64go&q="+ keyword;
	axios.get(url)
	.then(function(response) {
		console.log(response.data);
		var itemList = '<ul>';
		for(var i=0 ; i<response.data.items.length;i++) {
			itemList = itemList + '<li>'+response.data.items[i].pagemap.metatags[0]["og:description"] + '</li>';
		}
		itemList = itemList + '</ul>';
		console.log(document.getElementById("show-list"));
		document.getElementById("show-list").innerHTML = itemList ;
	})
	.catch(function (err) {
		console.log(err);
	});
    // axios.post('http://api.cortical.io/rest/text/keywords?retina_name=en_associative', data, headers)
    //     .then((response) => {
    //         console.log(response);
    //         for(var k=0;k<response.data.length;k++){
    //         	keywordArray.push(response.data[k]);
    //         }
    //          console.log(keywordArray);
	// 		    var keyword = keywordArray[0];
	// 			// var keyword = keyword.replace(/ /g, "%20");
	// 			console.log(keyword);
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
}

//AIzaSyDo_FttfQSwU-g_hc0R5zQ5GazplE0Ir9c
