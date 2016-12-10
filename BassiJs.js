/**
 * Created by Hassan on 10/12/2016.
 */
;((w => {
    const document = window.document;
    Bassi=selector => new Bassi.init(selector)
    Bassi.init=function (selector) {
        let element;
        if(selector == null) return null;
        if(typeof selector == "string"){
            element=document.querySelectorAll(selector);
            this["elements"]=element;
        } else{
            if(selector.length){
                this["elements"]=selector
            }else{
                this["elements"]=[];
                this["elements"].push(selector);
            }
        }
        this.n=this.elements.length;
        this.pos=0;

    }
    Bassi.init.prototype.hide=function(){
        this.elements.forEach(e => {
            e.style.display="none";
        });
    }
    Bassi.init.prototype.show=function () {
        this.elements.forEach(e => {
            e.style.display="";
        });
    }
    Bassi.init.prototype.remove=function () {
        const element=this.elements[0].parentElement.removeChild(this.elements[0]);
        return element;
    }
    Bassi.init.prototype.html=function (text) {
        this.elements.forEach(e => {
            e.innerHTML=text;
        })
    }
    Bassi.init.prototype.append=function(node){
        this.elements.forEach(e => {
            if(typeof  node == "string"){
                e.innerHTML+=node;
            }else{
                e.appendChild(node);
            }
        })
    }
    Bassi.init.prototype.prepend=function(node){
        this.elements.forEach(e => {
            if(typeof node == "string"){
                node+=e.innerHTML;
                e.innerHTML=node;
            }else{
                e.prepend(node);
            }
        })
    }

    Bassi.init.prototype.click=function(callback){
        var callback=callback.bind(this);
        if(this.elements.length !=0){
            this.elements.forEach(e => {
                e.addEventListener("click",e => {
                    callback(e)});
            });
        }
        return this;
    }
    Bassi.init.prototype.each=function (callback) {
        this.elements.forEach((e, i) => {
            callback(new Bassi.init(e),i);
        });
        return this;
    }
    Bassi.init.prototype.addClass=function (...ClassName) {
        this.elements.forEach(e => {
            e.classList.add(...ClassName);
        })
        return this;
    }
    Bassi.init.prototype.hasClass=(elt, ClassName) => elt.classList.contains(ClassName);
    Bassi.init.prototype.removeClass=function(...ClassName){
        this.elements.forEach(e => {
            e.classList.remove(...ClassName);
        });
        return this;
    }
    Bassi.init.prototype.toggleClass=function(ClassName,elt){
        if(elt === undefined){
            this.elements.forEach(e => {
                e.classList.toggle(ClassName);
            })
        }else {
            elt.classList.toggle(ClassName);
        }
        return this;
    }
    Bassi.init.prototype.get=function(url,configuration,callback){
        let params="";
        const http = new XMLHttpRequest();
        if(configuration instanceof Object){
            if(configuration.hasOwnProperty("params")){
                const object = configuration.params;
                for (const property in object) {
                    if (object.hasOwnProperty(property)) {
                        params+=`${property}=${object[property]}&`;
                    }
                }
                params=params.substr(0,params.length-1);
            }
        }
        url+= params.length ? "?":"";
        http.open("GET",url,true);// true async
        http.onreadystatechange = () => {
            if(http.readyState == 4 && http.status == 200) {
                callback();
            }
        }
        http.send(null);
        return this;
    }
    Bassi.init.prototype.nextSibling=function(){
        const next=this.elements[0].nextElementSibling;
        return new Bassi.init(next);
    }
    Bassi.init.prototype.previousSibling=function(){
        const prev = this.elements[0].previousElementSibling;
        return new Bassi.init(prev);
    }
    Bassi.init.prototype.nextSiblings=function () {
        const elements=[];
        let next=null;
        next=this.elements[0].nextElementSibling;
        do{
            if(next != null) {
                elements.push(next);
                next=next.nextElementSibling;
            }
        }while(next !=null);
        return new Bassi.init(elements);
    }
    Bassi.init.prototype.prevSiblings=function () {
        const elements=[];
        const prev=null;
        next=this.elements[0].previousElementSibling;
        do{
            if(next != null) {
                elements.push(next);
                next=next.previousElementSibling;
            }
        }while(next !=null);
        return new Bassi.init(elements);
    }
    Bassi.init.prototype.first=function () {
        return new Bassi.init(this.elements[this.pos]);
    }
    Bassi.init.prototype.last=function () {
        return new Bassi.init(this.elements[this.n-1]);
    }
    Bassi.init.prototype.eq=function (i) {
        if(this.elements[i]!=undefined){
            return new Bassi.init(this.elements[i]);
        }
        return null
    }
    w.Bassi=w.B=Bassi;
}))(window);