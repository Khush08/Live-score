document.addEventListener('DOMContentLoaded', () => {

    const request = new XMLHttpRequest();
    const title = document.title;
    request.open('POST', '/fixtures')

    request.onload = () => {
        
        const data = JSON.parse(request.responseText);
        if(data.success){
            console.log(data.resultlast);
            console.log(data.resultnext);
            var ulist = document.getElementById('myUl');
            const lastfixtures = data.resultlast.api.fixtures;
            const nextfixtures = data.resultnext.api.fixtures;
            
            lastfixtures.reverse().forEach(fixture => {
                
                var li = document.createElement('li');
                li.className = "list-group-item";
                var wrapper = document.createElement('div');
                wrapper.className="wrapper";
                var box1 = document.createElement('div');
                box1.className="box1";
                var box2 = document.createElement('div');
                box2.className="box2";
                var box3 = document.createElement('div');
                box3.className="box3";
                var box4 = document.createElement('div');
                box4.className="box4";
                var box5 = document.createElement('div');
                box5.className="box5";
                var box6 = document.createElement('div');
                box6.className="box6";
                var box7 = document.createElement('div');
                box7.className="box7";

                var eventStr = fixture.event_date.toString();
                var event = eventStr.split("T");
                box1.innerHTML=event[0];
                box2.innerHTML=event[1];
                box3.innerHTML=fixture.venue;

                var homeImg = document.createElement('img');
                homeImg.src = fixture.homeTeam.logo;
                homeImg.width = "64";
                homeImg.height = "64";
                var homeName = document.createElement('h3');
                homeName.appendChild(document.createTextNode(fixture.homeTeam.team_name));
                box4.appendChild(homeImg);
                box4.appendChild(homeName);

                var awayImg = document.createElement('img');
                awayImg.src = fixture.awayTeam.logo;
                awayImg.width = "64";
                awayImg.height = "64";
                var awayName = document.createElement('h3');
                awayName.appendChild(document.createTextNode(fixture.awayTeam.team_name));
                box5.appendChild(awayImg);
                box5.appendChild(awayName);

                var score = fixture.goalsHomeTeam + "-" + fixture.goalsAwayTeam;
                box6.appendChild(document.createTextNode(score));

                box7.innerHTML=fixture.status;

               // var timePassed = document.createElement('h3');
               // timePassed.appendChild(document.createTextNode(fixture.elapsed));

               wrapper.appendChild(box1);
               wrapper.appendChild(box2);
               wrapper.appendChild(box3);
               wrapper.appendChild(box4);
               wrapper.appendChild(box5);
               wrapper.appendChild(box6);
               wrapper.appendChild(box7);

               li.appendChild(wrapper);
               ulist.appendChild(li);
            });
            nextfixtures.forEach(fixture => {
                
                var li = document.createElement('li');
                li.className = "list-group-item";
                var wrapper = document.createElement('div');
                wrapper.className="wrapper";
                var box1 = document.createElement('div');
                box1.className="box1";
                var box2 = document.createElement('div');
                box2.className="box2";
                var box3 = document.createElement('div');
                box3.className="box3";
                var box4 = document.createElement('div');
                box4.className="box4";
                var box5 = document.createElement('div');
                box5.className="box5";
                var box6 = document.createElement('div');
                box6.className="box6";
                var box7 = document.createElement('div');
                box7.className="box7";

                var eventStr = fixture.event_date.toString();
                var event = eventStr.split("T");
                box1.innerHTML=event[0];
                box2.innerHTML=event[1];
                box3.innerHTML=fixture.venue;

                var homeImg = document.createElement('img');
                homeImg.src = fixture.homeTeam.logo;
                homeImg.width = "64";
                homeImg.height = "64";
                var homeName = document.createElement('h3');
                homeName.appendChild(document.createTextNode(fixture.homeTeam.team_name));
                box4.appendChild(homeImg);
                box4.appendChild(homeName);

                var awayImg = document.createElement('img');
                awayImg.src = fixture.awayTeam.logo;
                awayImg.width = "64";
                awayImg.height = "64";
                var awayName = document.createElement('h3');
                awayName.appendChild(document.createTextNode(fixture.awayTeam.team_name));
                box5.appendChild(awayImg);
                box5.appendChild(awayName);

                var score = fixture.goalsHomeTeam + "-" + fixture.goalsAwayTeam;
                box6.appendChild(document.createTextNode(score));

                box7.innerHTML=fixture.status;

               // var timePassed = document.createElement('h3');
               // timePassed.appendChild(document.createTextNode(fixture.elapsed));

               wrapper.appendChild(box1);
               wrapper.appendChild(box2);
               wrapper.appendChild(box3);
               wrapper.appendChild(box4);
               wrapper.appendChild(box5);
               wrapper.appendChild(box6);
               wrapper.appendChild(box7);

               li.appendChild(wrapper);
               ulist.appendChild(li);
            });
        }else{
            console.log(data.message);
            console.log(data.leag);
            console.log(data.league);
            console.log(data.url);
        }

    };

    const data = new FormData();
    data.append('league', title)
    request.send(data)
    
    return false;
});