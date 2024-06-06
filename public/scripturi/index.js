
function schimba_cul(element)
{
    let ceva = Math.random() * 10;
    let idk = Math.round(ceva);
    let aux = parseInt(idk) + ""
    element.style.border = aux + "px solid";
    localStorage.setItem("nrclickrev",  parseInt(localStorage.getItem('nrclickrev')) + 1);
    if ( localStorage.getItem('nrclickrev') > 20 )
        element.remove()
}

function main()
{
    localStorage.setItem("nrclickrev", 0);
    let putin = 50 
    let mediu = 125 
    let mare = 200 
    let rev1 = document.getElementById('card1');
    let rev2 = document.getElementById('card2');
    let rev3 = document.getElementById('card3');
    let rev4 = document.getElementById('card4');

    rev1.onclick = function(){schimba_cul(rev1)}
    rev2.onclick = function(){schimba_cul(rev2)}
    rev3.onclick =  function(){schimba_cul(rev3)}
    rev4.onclick =  function(){schimba_cul(rev4)}

}

window.onload = main