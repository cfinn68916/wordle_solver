var rule_ind=0;
var words=(new Array(all_words))[0];
var rules=new Map();//[[0,[0,0,'t']],[1,[0,0,'a']],])

function compute(){
    var res=[];
    for(var i in words){
        if(check(words[i],rules)){
            res.push(words[i]);
        }
    }
    return res;
}

function select_type(event){
    var base_id=parseInt(event.srcElement.id.split('_')[2]);
    console.log(base_id)
    document.getElementById(event.srcElement.id).style.border='solid';
    if(event.srcElement.id.slice(0,4)=='grey'){
        var tmp=0;
        document.getElementById('yellow_square_'+base_id).style.border='none';
        document.getElementById('green_square_'+base_id).style.border='none';
    }else if(event.srcElement.id.slice(0,6)=='yellow'){
        var tmp=1;
        document.getElementById('grey_square_'+base_id).style.border='none';
        document.getElementById('green_square_'+base_id).style.border='none';
    }else if(event.srcElement.id.slice(0,5)=='green'){
        var tmp=2;
        document.getElementById('grey_square_'+base_id).style.border='none';
        
        document.getElementById('yellow_square_'+base_id).style.border='none';
    }
    rules.set(base_id,[tmp,rules.get(base_id)[1],rules.get(base_id)[2]])
}

function rm(event){
    var base_id=parseInt(event.srcElement.id.split('_')[1]);
    rules.delete(base_id)
    document.getElementById('rule_'+base_id).remove()
}

function new_rule(){
    createE('div','rule_'+rule_ind,['rule'],document.querySelector('#rules>div'),null,null,null,null,null,null);
    createE('div','grey_square_'+rule_ind,['grey_square'],document.getElementById('rule_'+rule_ind),null,null,null,null,select_type,null)
    createE('div','yellow_square_'+rule_ind,['yellow_square'],document.getElementById('rule_'+rule_ind),null,null,null,null,select_type,null)
    createE('div','green_square_'+rule_ind,['green_square'],document.getElementById('rule_'+rule_ind),null,null,null,null,select_type,null)
    createE('input','ind_'+rule_ind,['ind'],document.getElementById('rule_'+rule_ind),'number',null,null,null,null,null)
    createE('input','letter_'+rule_ind,['letter'],document.getElementById('rule_'+rule_ind),'text',null,null,null,null,null)
    createE('input','remove_'+rule_ind,['remove'],document.getElementById('rule_'+rule_ind),'button',null,null,'remove',rm,null)
    rules.set(rule_ind,[-1,-1,'0']);
    rule_ind+=1;
}

function check(word,rules){
    for(var i of rules.entries()){
        var i2=i[1];
        var v=i2[0];
        var n=i2[1];
        var letter=i2[2];
        if(v==-1){
            continue;
        }
        if(v==0){
            if (word.includes(letter)){
                return false;
            }
        }
        if (v==1){
            if (word[n]==letter){
                return false;
            }
            if (!word.includes(letter)){
                return false;
            }
        }
        if (v==2){
            if (word[n]!=letter){
                return false;
            }
        }
    }
    return true;
}

function createE(ElementType,id,classlist,ParentElement,type,src,href,value,onclick,innerHTML){
    const ele=document.createElement(ElementType);
    ele.setAttribute("id",id);
    if(type!=null){
        ele.setAttribute("type",type);
    }
    if(src!=null){
        ele.setAttribute("src",src);
    }
    if(href!=null){
        ele.setAttribute("href",href);
    }
    if(value!=null){
        ele.setAttribute("value",value);
    }
    if(innerHTML!=null){
        ele.innerHTML=innerHTML;
    }
    if(onclick!=null){
        ele.onclick=onclick;
    }
    if(classlist!=null){
        ele.classList=classlist;
    }
    ParentElement.appendChild(ele);
}

function update(){
    for(var i of rules.entries()){
        rules.set(i[0],[i[1][0],parseInt(document.getElementById('ind_'+i[0]).value),document.getElementById('letter_'+i[0]).value]);
    }
    let tmp=compute();
    if(tmp.length>500){
        document.getElementById('words').innerHTML=tmp.length+' words are possible'
    }else{
        document.getElementById('words').innerHTML=compute().join('<br>');
    }
}

onload=function(){
    setInterval(update,1000);
}