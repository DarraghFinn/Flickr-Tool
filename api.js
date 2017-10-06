
srcArray=[];

function handleButtonClick(){
    document.getElementById('mainimage').src="";
    document.getElementById('btnFindImage').value= "Searching..";
    setmapfunc();
    var searchtag="tags="+document.getElementById('tag').value.replace(" ","+");

    var e = document.getElementById("locationlist");
    var locationtag="lat="+Number(locationArray[e.selectedIndex].lat).toString()+"&lon="+Number(locationArray[e.selectedIndex].long).toString();
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0ccb8c76bb2a5c6a0d84393f0c2452f6&extras=tags&safe_search=1&per_page=10&"+searchtag+"&"+locationtag;
    var src;
    function appendImages(data){

        var data= JSON.parse(data.srcElement.response.replace('jsonFlickrApi(','').replace('})','}'));
        //function resetPage
        var slider = document.getElementById('sliderdiv');
        while(slider.firstChild)
        {
            slider.removeChild(slider.firstChild);
        }

        srcArray=[];
        document.getElementById("sliderdiv").style.left =  "0px";
        if(data.stat == 'ok')
        {

            data.photos.photo.forEach(function(item,i){
                console.log(item);
                src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret ;

                srcArray.push(src);
                console.log(srcArray.length);
                maxIndex=srcArray.length-1;

                var x = document.createElement("IMG");
                x.setAttribute("id", ""+i+"");
                x.setAttribute("class", "thubnails inactive_thumnails slider-height");
                x.setAttribute("src", src+"_t.jpg");
                x.setAttribute("onclick", "centerSelectedThumbnail(this.id)");
                document.getElementById('sliderdiv').appendChild(x);

                if ( i == 100 ) return false;
            });
            if(srcArray.length>0)
            {
                centerSelectedThumbnail(0);
            }
            else
                document.getElementById('mainimage').classList.remove('loading');


            document.getElementById('btnFindImage').value="Find Images";
        }else if (data.stat =='fail')
        {
            alert('Not Found');
            document.getElementById('btnFindImage').value="Find Images";

        }
    }

    var request = new XMLHttpRequest();

    request.onload = appendImages;
    request.open("get", url + "&format=json&jsoncallback=?", true);
    request.send();

    currentIdex=-1;

};
locationArray = [{name: "Cork, Ireland", lat: 51.8969, long:  -8.4863}
    ,{name: "Dublin, Ireland", lat: 53.3498 , long: -6.2603}
    ,{name: "Galway, Ireland", lat: 53.2707 , long: -9.0568}
    ,{name: "London, UK", lat: 51.505 , long: -0.09}
    ,{name: "New York, USA", lat: 40.7128, long: -74.0059}
    ,{name: "Rio de Janeiro, Brazil", lat:-22.9068, long: -43.1729}
    ,{name: "Paris, France", lat: 48.8566 , long: 2.3522}
    ,{name: "Tokyo, Japan", lat: 35.6895, long:  139.6917}
    ,{name: "Sydney, Australia", lat: -33.8688 , long: 151.2093}
    ,{name: "Johannesburg, South Africa", lat: -26.2041 , long: 28.0473}];


var loclist = document.getElementById("locationlist");
for(var i = 0; i < locationArray.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = locationArray[i].name;
    opt.value = locationArray[i].lat+","+locationArray[0].long;
    loclist.appendChild(opt);
}

var mymap = L.map('mapid').setView([51.8969, -8.4863], 5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors ',
    id: 'mapbox.streets'
}).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);


function setmapfunc()
{
    var e = document.getElementById("locationlist");

    mymap.setView([Number(locationArray[e.selectedIndex].lat), Number(locationArray[e.selectedIndex].long)], 5);


    L.marker([Number(locationArray[e.selectedIndex].lat), Number(locationArray[e.selectedIndex].long)])
        .addTo(mymap).bindPopup(locationArray[e.selectedIndex].name).openPopup();

}

function centerSelectedThumbnail(index) {
    document.getElementById('mainimage').classList.add('loading');
    document.getElementById('mainimage').src = '';
    var thumbnailImage=document.getElementById(index);
    var innerLeftOffset = thumbnailImage.offsetLeft;
    var halfOuterW = document.getElementById("outerdiv").offsetWidth / 2;
    var halfImageW = document.getElementById(index).offsetWidth / 2;
    var outerLeftOffset = halfOuterW - halfImageW;
    var LeftPos = outerLeftOffset - innerLeftOffset;
    ;
    if(currentIdex!=-1){
        document.getElementById( currentIdex).classList.toggle('inactive_thumnails');
    }
    currentIdex=index;

    var p1 = document.getElementById("sliderdiv").offsetLeft;
    var p2 = LeftPos;
    animateThumnails(p1,p2)
    thumbnailImage.classList.toggle('inactive_thumnails');
    document.getElementById('mainimage').src=srcArray[index]+"_h.jpg";
}