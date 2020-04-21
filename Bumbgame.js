var tbody = document.querySelector('#table tbody')
var dataset = []
var 중단플래그 = false;
var 열은칸 = 0;
document.querySelector('#btn').addEventListener('click',function(){
    중단플래그 = false;
    열은칸=0;
    dataset=[];
    tbody.innerHTML = "";
    var hor = parseInt(document.querySelector('#가로').value);
    var ver = parseInt(document.querySelector('#세로').value);
    var mine = parseInt(document.querySelector('#mine').value);
    var 후보군 = Array(hor*ver-mine)
    .fill()
    .map(function(요소,인덱스){
        return 인덱스
    });
    var 셔플 = [];
    while (후보군.length>80){
        var 이동값 = 후보군.splice(Math.floor(Math.random()*후보군.length),1)[0];
        셔플.push(이동값);
        }
    console.log(셔플)    
    for(var i=0; i<ver; i+=1){
        var Arr = [];
        dataset.push(Arr);
        var tr = document.createElement('tr');
        for(var j=0; j<hor; j+=1){
            Arr.push(0)
            var td = document.createElement('td');
            td.addEventListener('click',function(e){
                if(중단플래그){
                    return;
                }
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 가로칸 = Array.prototype.indexOf.call(부모tr.children,e.currentTarget)
                var 세로줄 = Array.prototype.indexOf.call(부모tbody.children,부모tr)
                if(dataset[세로줄][가로칸] === 1){
                    return;
                }
                e.currentTarget.classList.add('opened');
                열은칸+=1;
                if(dataset[세로줄][가로칸] === 'X'){
                    e.currentTarget.textContent = '펑'
                    중단플래그 = true;
                }else{
                    var 지뢰갯수 = [
                        dataset[세로줄][가로칸-1],dataset[세로줄][가로칸+1],
                    ]
                    if(dataset[세로줄-1]){
                            지뢰갯수 = 지뢰갯수.concat([
                                dataset[세로줄-1][가로칸-1],
                                dataset[세로줄-1][가로칸],
                                dataset[세로줄-1][가로칸+1],
                            ])
                    };
                    if(dataset[세로줄+1]){
                            지뢰갯수 = 지뢰갯수.concat([
                                dataset[세로줄+1][가로칸-1],
                                dataset[세로줄+1][가로칸],
                                dataset[세로줄+1][가로칸+1],
                            ])
                    };
                    var 주변폭탄 = 지뢰갯수.filter(function(v){
                         return v==='X'
                         }).length;
                    e.currentTarget.textContent = 주변폭탄 || "";
                    dataset[세로줄][가로칸] = 1;
                    if(주변폭탄 === 0){
                        var 주변칸 = [];
                        if(tbody.children[세로줄-1]){
                            주변칸 = 주변칸.concat([
                                tbody.children[세로줄-1].children[가로칸-1],
                                tbody.children[세로줄-1].children[가로칸],
                                tbody.children[세로줄-1].children[가로칸+1],
                            ])
                        };
                        주변칸 = 주변칸.concat([
                                tbody.children[세로줄].children[가로칸-1],
                                tbody.children[세로줄].children[가로칸+1],                            
                        ]);
                        if(tbody.children[세로줄+1]){
                            주변칸 = 주변칸.concat([
                                tbody.children[세로줄+1].children[가로칸-1],
                                tbody.children[세로줄+1].children[가로칸],
                                tbody.children[세로줄+1].children[가로칸+1],             
                           ])
                        };
                        주변칸.filter(function(v){
                            return !!v
                        }).forEach(function(옆칸){
                            var 부모tr = 옆칸.parentNode;
                            var 부모tbody = 옆칸.parentNode.parentNode;
                            var 옆칸칸 = Array.prototype.indexOf.call(부모tr.children,옆칸)
                            var 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children,부모tr)
                            if( dataset[옆칸줄][옆칸칸] !== 1){
                            옆칸.click();
                            }
                        });
                    }
                };
                console.log(열은칸, hor*ver-mine)
                if(열은칸 === hor*ver-mine){
                    중단플래그 = true;
                    console.log('승리');
                }
            })
            td.addEventListener('contextmenu',function(e){
                e.preventDefault();
                if(중단플래그){
                    return
                }                
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 세로줄 = Array.prototype.indexOf.call(부모tr.children,e.currentTarget)
                var 가로칸 = Array.prototype.indexOf.call(부모tbody.children,부모tr)               
                if(e.currentTarget.textContent === ''|| e.currentTarget.textContent === 'X'){
                e.currentTarget.textContent='!'
                }else if(e.currentTarget.textContent=== '!'){
                    e.currentTarget.textContent = '?'
                }else if(e.currentTarget.textContent === '?'){
                    if( dataset[가로칸][세로줄]=== 1){
                    e.currentTarget.textContent = ''
                    }else if(dataset[가로칸][세로줄] === 'X'){
                    e.currentTarget.textContent = 'X'
                    }
                }
            })
            tr.appendChild(td);
        };
        tbody.appendChild(tr);        
    };    
    console.log(dataset);
    for(var k=0; k<셔플.length; k++){
        var 가로 = 셔플[k] % 10;
        var 세로 = Math.floor(셔플[k] / 10);
        tbody.children[세로].children[가로].textContent='X';
        dataset[세로][가로] = 'X';
    };    
})