var rules=[[0,0,'t'],[0,0,'a'],[0,0,'c'],[0,0,'e'],[0,0,'h'],[0,0,'u'],[0,0,'m'],[0,0,'i'],[0,0,'d'],[0,0,'b'],[0,0,'w'],[0,0,'l'],[0,0,'s'],[1,1,'r'],[2,1,'o']];
//[0,l]
//[1,p,l]
//[2,p,l]
var words=(new Array(all_words))[0];

function compute(){
    
    for(var i in words){
        if(check(words[i],rules)){
            console.log(words[i]);
        }
    }
}



function check(word,rules){
    for(var i in rules){
        var i2=rules[i];
        var v=i2[0];
        var n=i2[1];
        var letter=i2[2];
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