
function sendRequest( keyword ){
	console.log("Inside send request");
	if(!keyword || keyword.length < 1) {
		alert("cannot send request, try once again");
		return;
	}
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
		var itemList = '';
		for(var i=0 ; i<response.data.items.length;i++) {
			if(response.data.items[i].pagemap.metatags[0]["og:description"] === undefined){
				continue;
			}
			let link = response.data.items[i].link;
			itemList = itemList + '<div class="make-card z-depth-3 child-divs">'+response.data.items[i].pagemap.metatags[0]["og:description"] + '<br> <a class="learn-more-links" href="'+ link + '">Learn More</a><br>' + '<span><i class="fa fa-thumbs-up"></i></span>&nbsp;&nbsp;<span><i class="fa fa-thumbs-down"></i></span><br /></div>';
		}
		itemList = itemList + '</ul>';
		console.log(document.getElementById("show-list"));
		document.getElementById("show-list").innerHTML = itemList ;
	})
	.catch(function (err) {
		console.log(err);
	});
}

//AIzaSyDo_FttfQSwU-g_hc0R5zQ5GazplE0Ir9c
