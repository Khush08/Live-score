document.addEventListener('DOMContentLoaded', () => {    
    const request = new XMLHttpRequest();
    const title = document.title;
    console.log(title);
    request.open('POST', '/standings');
    var table = document.getElementById("myTable");
    request.onload = () => {
        const data = JSON.parse(request.responseText);
        if(data.success){
            var tbody = document.createElement('tbody');
            var res = data.result.api.standings;
            var stands = res[0];
            stands.forEach(standing => {
                var row = document.createElement('tr');
                var team = [standing.rank, standing.logo, standing.teamName, standing.all.matchsPlayed, standing.all.win, standing.all.draw, standing.all.lose, standing.points, standing.description];
                for(let i=0; i < team.length ; i++){
                    var td = document.createElement('td');
                    if( i != 1){
                        td.appendChild(document.createTextNode(team[i]));
                    }else{
                        var img = document.createElement('img');
                        img.src = team[i]
                        img.width="30";
                        img.height="30";
                        td.appendChild(img);
                    }
                    row.appendChild(td);                   
                }
                tbody.appendChild(row);                
            });
            table.appendChild(tbody);
        }else{
            console.log(data.message);
            console.log(data.leag);
            console.log(data.league);
            console.log(data.url);
        }
    };
    const data = new FormData();
    data.append('league', title);
    request.send(data);
    return false;
});