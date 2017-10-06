
var TIME_PER_PX = 0;
var currentIdex=-1;
var maxIndex=9;
document.onkeydown = handleKeyEvents;

function handleKeyEvents(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
        // left arrow
        if(currentIdex > 0){
            centerSelectedThumbnail(currentIdex-1);
        }
        else
            centerSelectedThumbnail(currentIdex + maxIndex);
    }
    else if (e.keyCode == '39') {
        // right arrow
        if(currentIdex<maxIndex){
            centerSelectedThumbnail(currentIdex+1);
        }
        else
            centerSelectedThumbnail(currentIdex - maxIndex);
    }

}

function moveRight()
{
    console.log('right');
    console.log(currentIdex);
    console.log(currentIdex+1);

    if(currentIdex < maxIndex)
    {
        centerSelectedThumbnail(parseInt(currentIdex)+1);
    }
    else
        centerSelectedThumbnail(currentIdex - maxIndex);
}
function moveLeft()
{
    console.log("Left: ");
    console.log( currentIdex);
    console.log( currentIdex-1);

    if(currentIdex > 0)
    {
        centerSelectedThumbnail(parseInt(currentIdex)-1);
    }
    else
        centerSelectedThumbnail(currentIdex + maxIndex);
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

function animateThumnails(p1,p2){

    if (p2 < p1) {

        (function Loop(i) {
            setTimeout(function () {
                document.getElementById("sliderdiv").style.left = i + "px";
                --i;
                if (p2 < --i) {
                    Loop(i);
                }
            }, TIME_PER_PX);
        })(p1);

    }
    else if (p1 < p2) {

        (function Loop(i) {
            setTimeout(function () {

                document.getElementById("sliderdiv").style.left = i + "px";
                ++i;
                if (++i < p2) {
                    Loop(i);
                }
            }, TIME_PER_PX);
        })(p1);

    }
}
