import React, { Component } from 'react';
import "./ImageAnnotation.css"


class ImageAnnotation extends Component {

    constructor(props){
        super(props)
        
    this.state = {

        count : 1,
        imageUrl : "https://th.bing.com/th/id/OIP.qgURzPzxSIrplEZeHR1t7wHaJ4?pid=ImgDet&rs=1",
        width : "200px",
        height : "200px",
        x : "0px",
        y : "0px",
        offsetx : "0",
        offsety : "0",
        pressed : "false",
        pressedResize : "false",
        firstGrapX : "0",
        firstGrapY : "0",
        };
    }

    //Erweiterung - Statt nur einer Box können bis zu 50 Boxen erstellt werden.
    createNewBox =  Array(50).fill(0);
    BoxXPositions = Array(50).fill("0px"); 
    BoxYPositions = Array(50).fill("0px"); 
    BoxWidth = Array(50).fill("80px");
    BoxHeight = Array(50).fill("80px");
    mWidth = Array(50).fill("200px");
    mHeight = Array(50).fill("200px");
    mapArray = [...Array(50).keys()];

    pressed = Array(50).fill("false");
    setZIndex = Array(50).fill(1000);
    inputValues = Array(50).fill("");






       
       //Box mit Click auf Löschen entfernen und Standardwerte wiederherstellen
       deleteBox = (event, id) => {
           
           var idNumber = parseInt(id, 10);
           if (event.keyCode === 46){
               this.createNewBox[idNumber] =  0;
               this.BoxWidth[idNumber] = "80px";
               this.BoxHeight[idNumber] = "80px";
               this.inputValues[idNumber] = 0;
               
               
           }
           //ein setstate hinzufügen, damit die App direkt gerendert wird. Andererseits wird die Box nicht sofort gelöscht
           this.setState({
               
           })
              
           
       }


       handlerEventPressedBox = (event, id) => {
            var idNumber = parseInt(id,10);
            var boxLeft = document.getElementById(id).offsetLeft;
            var boxTop = document.getElementById(id).offsetTop;
            var boxX = document.getElementById(id).offsetWidth;
            var boxY = document.getElementById(id).offsetHeight;

       
           
        if(event.type ==="mousedown" && (parseInt(event.pageX,10) < parseInt(boxLeft + boxX - 20,10) ||
        parseInt(event.pageY,10) < parseInt(boxTop + boxY - 20,10))
        ){
            this.setState({
                pressedResize: "false",
                firstGrapX : event.nativeEvent.pageX,
                firstGrapY : event.nativeEvent.pageY,
            })
            this.pressed[idNumber] = "true";
            //Damit bei Click das zuletzt angeklickte Element höher liegt als die vorigen
            //In der Reihenfolge wie sie erschienen und geklickt wurden
            this.setZIndex[idNumber] = 1001;
            for (var i = 0; i < this.setZIndex.length; i++){
                this.setZIndex[i] = this.setZIndex[i] - 1;
            }
        }
        else if (event.type === "mousedown" && (parseInt(event.pageX,10) > parseInt(boxLeft + boxX -20,10) &&
        parseInt(event.pageY,10) > parseInt(boxTop + boxY - 20,10))){
            this.setState({
                pressedResize: "true",
                firstGrapX : event.nativeEvent.pageX,
                firstGrapY : event.nativeEvent.pageY,
            })
            this.pressed[idNumber] = "false";
           
        }
        



    }
        //Rechteck auf Bild verschiebbar machen und dafür sorgen, dass Rechteck nicht über Rand hinausbewegt wird

       handlerEventMouseMove = (event, id) => {
            var idNumber = parseInt(id,10);
            var pos1 = this.state.firstGrapX - event.pageX;
            var pos2 = this.state.firstGrapY - event.pageY;
            //Auf allen Seiten um das Bild ist ein 2px großer Rand,
            // offsetLeftgibt die Position des Images inkl. dem Rand an, das eigentliche Bild kommt erst nach dem Rand
            // deshalb muss man 2 px aufaddieren, bzw. bei der Weite (offsetWidth) muss man 4 px abziehen, da die Weite 
            // auch die 2 px Rand auf beiden Seiten enthält
            var imageLeft = document.getElementById("image").offsetLeft+2;
            var imageTop = document.getElementById("image").offsetTop+2;
            var imageX = document.getElementById("image").offsetWidth-4;
            var imageY = document.getElementById("image").offsetHeight-4;
            var boxLeft = document.getElementById(id).offsetLeft;
            var boxTop = document.getElementById(id).offsetTop;
            var boxX = document.getElementById(id).offsetWidth;
            var boxY = document.getElementById(id).offsetHeight;
            this.mWidth[idNumber] = imageX + imageLeft - boxLeft;
            this.mHeight[idNumber] = imageY + imageTop - boxTop;

           if((event.type === "mousemove") && this.pressed[idNumber] == "true"){//this.state.pressed == "true"){

                //Damit Rechteck nicht über linken Bildrand herausbewegt werden kann:
                if(boxLeft - pos1 < imageLeft){
                    this.setState({
                        firstGrapX : event.nativeEvent.pageX,
                        firstGrapY : event.nativeEvent.pageY,
                        offsetx: parseInt(this.BoxXPositions[idNumber], 10) - imageLeft,
                        offsety: parseInt(this.BoxYPositions[idNumber], 10) - imageTop,
                    })
                        this.BoxXPositions[idNumber] =  boxLeft + "px";

                    if(boxTop - pos2 < imageTop || boxTop + boxY - pos2 > imageTop + imageY ){
                        this.setState({
                        })
                        this.BoxYPositions[idNumber] = boxTop + "px";
                    }
                    else{
                        this.setState({
                        })
                        this.BoxYPositions[idNumber] = boxTop - pos2 + "px";
                    }

                }

                //Damit Rechteck nicht über oberen Bildrand herausbewegt werden kann:
                else if(boxTop - pos2 < imageTop){
                    this.setState({
                        
                        firstGrapX : event.nativeEvent.pageX,
                        firstGrapY : event.nativeEvent.pageY,
                        offsetx: parseInt(this.BoxXPositions[idNumber], 10) - imageLeft,
                        offsety: parseInt(this.BoxYPositions[idNumber], 10) - imageTop,
                    })
                    this.BoxYPositions[idNumber] = boxTop + "px";

                    if(boxLeft - pos1 < imageLeft || boxLeft + boxX - pos1 > imageLeft + imageX ){
                        this.setState({
                        })
                        this.BoxXPositions[idNumber] = boxLeft + "px";
                    }
                    else{
                        this.setState({
                        })
                        this.BoxXPositions[idNumber] = boxLeft - pos1 + "px";
                    }

                }

                //Damit Rechteck nicht über rechten Bildrand herausbewegt werden kann:
                else if(boxLeft + boxX - pos1 > imageLeft + imageX){
                    this.setState({
                        
                        firstGrapX : event.nativeEvent.pageX,
                        firstGrapY : event.nativeEvent.pageY,
                        offsetx: parseInt(this.BoxXPositions[idNumber], 10) - imageLeft,
                        offsety: parseInt(this.BoxYPositions[idNumber], 10) - imageTop,
                    })
                    this.BoxXPositions[idNumber] = boxLeft + "px";

                    if(boxTop - pos2 < imageTop || boxTop + boxY - pos2 > imageTop + imageY ){
                        this.setState({
                        })
                        this.BoxYPositions[idNumber] = boxTop + "px";
                    }
                    else{
                        this.setState({
                        })
                        this.BoxYPositions[idNumber] = boxTop - pos2 + "px";
                    }

                }
                
                //Damit Rechteck nicht über unteren Bildrand herausbewegt werden kann:
                else if(boxTop + boxY - pos2 > imageTop + imageY){
                    this.setState({
                        firstGrapX : event.nativeEvent.pageX,
                        firstGrapY : event.nativeEvent.pageY,
                        offsetx: parseInt(this.BoxXPositions[idNumber], 10) - imageLeft,
                        offsety: parseInt(this.BoxYPositions[idNumber], 10) - imageTop,
                    })
                    this.BoxYPositions[idNumber] = boxTop +"px";

                    if(boxLeft - pos1 < imageLeft || boxLeft + boxX - pos1 > imageLeft + imageX ){
                        this.setState({

                        })
                        this.BoxXPositions[idNumber] = boxLeft + "px";
                    }
                    else{
                        this.setState({
                        })
                        this.BoxXPositions[idNumber] = boxLeft - pos1 + "px";
                    }

                }
                




                else{
                    this.setState({
                            firstGrapX : event.nativeEvent.pageX,
                            firstGrapY : event.nativeEvent.pageY,
                            offsetx: parseInt(this.BoxXPositions[idNumber], 10) - imageLeft,
                            offsety: parseInt(this.BoxYPositions[idNumber], 10) - imageTop,
                        })
                        this.BoxXPositions[idNumber] = boxLeft - pos1 + "px";
                        this.BoxYPositions[idNumber] = boxTop - pos2 + "px";
            }
        }


        if(event.type === "mousemove" && this.state.pressedResize == "true"){
            this.BoxWidth[idNumber] = boxX+"px";
            this.setState({
                width : imageLeft + imageX - boxLeft,
                height : imageTop + imageY - boxTop,
            }) 
            if(boxX + boxLeft> imageX+imageLeft){
                this.setState({
                    
                })
                this.BoxWidth[idNumber] = boxX-pos1+"px";
            }
            
        }


        if (event.type === "mouseup"){
            this.setState({
             
                pressedResize : "false",
            })
            this.pressed[idNumber] = "false";
            
        }

        if (event.type === "mouseleave"){
            this.setState({
                pressed : "false",
                pressedResize : "false",
            })
            this.pressed[idNumber] = "false";
        }

        /* Ist für den Benutzer nicht angenehm:
        if (event.type === "mouseout"){
            this.setState({
                pressed : "false",
                pressedResize : "false",
            })
            this.pressed[idNumber] = "false";
        }
        */

       }

       //Eingegeben Link übeprüfen ob es sich um ein Bild handelt (z.B. .jpg/.png/.jpeg)
       //und dann ggfs. laden. Falls es sich um ein Bild handelt: Alle Rechtecke zurücksetzen

       handleLinkInput = (event) => {
           if (event.keyCode == "13" || event.type=="click"){
            var name = event.target.name;
            var value = document.getElementById("inputLink").value;
            var regex = new RegExp("\.jpg$|\.jpeg$|\.png$|\.webp$|img|Img");
            var match = regex.exec(value);
            if(match){
                document.getElementById("image").height = document.getElementById("image").naturalHeight;
                this.setState({
                    imageUrl : value,
                })
                var i = 0;
                while(i<50){
                    this.createNewBox[i] = 0;
                    this.BoxHeight[i] = "80px";
                    this.BoxWidth[i] = "80px";
                    i = i+1;
                }

            }
        }

       }

       // Box mit Klick auf Bild erstellen, von der das Zentrum der Mauszeiger ist
       // Ausnahmefälle behandeln, falls Maus zu nah an einem Rand ist

       //document.getElementById("image").offsetWidth , offsetTop etc.
       handleEventonImage = (event) => {
        var imageLeft = document.getElementById("image").offsetLeft+2;
        var imageTop = document.getElementById("image").offsetTop+2;
        var imageX = document.getElementById("image").offsetWidth-4;
        var imageY = document.getElementById("image").offsetHeight-4;
        var left = event.pageX - document.getElementById("leftCol").offsetWidth;
        var i = 0;
        while(this.createNewBox[i]){
            i = i + 1;
        }
        console.log("s", left, "box", left, "offset", parseInt(event.nativeEvent.offsetX,10))
        this.BoxXPositions[i] = event.pageX -document.getElementById("leftCol").offsetWidth - 40 + "px";//parseInt(event.nativeEvent.offsetX,10)-40 + "px";//
        //this.BoxXPositions[i] = parseInt(event.nativeEvent.offsetX,10) + "px";
        this.BoxYPositions[i] = event.pageY - 40 + "px";
        if(left<parseInt(this.BoxWidth[i],10)){
            
            this.BoxWidth[i] = left + "px" ;
            this.BoxXPositions[i] = imageLeft;
            
        }

        if(event.pageY < imageTop+40){
            this.BoxHeight[i] = event.pageY-imageTop + "px";
            this.BoxYPositions[i] = imageTop + "px";
        }
        if(event.pageY<this.BoxHeight){
            this.BoxHeight[i] = event.pageY + "px";
        }
            if(event.type === "mousedown" ){//&& event.pageX>imageLeft+100 && event.pageX<imageLeft+imageX-100
            //&&event.pageY > imageTop+100 && event.pageY < imageTop + imageY -100){
                
                
                var i = 0;
                while(this.createNewBox[i]){
                    i = i + 1;
                }
                this.createNewBox[i] = "true";
                
           this.setState({
                offsetx : parseInt(this.BoxXPositions[i],10) - imageLeft,
                offsety : parseInt(this.BoxYPositions[i],10), 
           })}



       }

       //Den Listenelementen auf der linken Seite beim Hovern und Focus CSS Klassen zuordnen
        handleGutterClick (event, id) {
            if(event.type==="focus"){
            document.getElementById(id+"").classList.add('focused');}
            if(event.type==="blur"){
                document.getElementById(id+"").classList.remove('focused');
            }
            if(event.type==="mouseover"){
                document.getElementById(id+"").classList.add('hovered');
            }
            if(event.type==="mouseout"){
                document.getElementById(id+"").classList.remove('hovered');
            }
        }

            //Damit der Input vom Listenelement auch auf der passenden Box angezeigt wird
        setInputText(event, id){
            document.getElementById(id+"labelPicture").value=document.getElementById("GutterInput"+id).value;
            this.inputValues[id] = document.getElementById("GutterInput"+id).value;
        }

        //Damit der Input von der Box auch auf dem Listenelement angezeigt wird
        setGutterText(event, id){
            document.getElementById("GutterInput"+id).value = document.getElementById(id+"labelPicture").value;
            this.inputValues[id] = document.getElementById(id+"labelPicture").value
        }

        //Nach Klick auf save die Daten in eine .json Datei speichern

        saveData = () =>{
            //Vorschau Bild und Echtes Bild haben unterschiedliche Größen
            //Es muss also mit einem Faktor die Box Positionen zuerst umgerechnet werden
            //Alternativ könnte man auch relative  % Werte nehmen, dann muss man die absolute Pixelzahl nicht umrechnen
            var FaktorX = document.getElementById("image").naturalWidth/(document.getElementById("image").offsetWidth-4);
            var FaktorY = document.getElementById("image").naturalHeight/(document.getElementById("image").offsetHeight-4);
            var x2 = [];
            var y2 = [];
            var result = [];
            result[0] = {"link" : this.state.imageUrl};
            for(var i = 0; i<50; i++){
                if(this.createNewBox[i]){
                    console.log("W",parseInt(this.BoxXPositions[i],10));
                    //img hat 2 px Rand, dieser muss abgezogen werden, da er momentan zur X und Y Position dazuzählt
                    this.BoxXPositions[i] = (parseInt(this.BoxXPositions[i],10)-17)*FaktorX;
                    this.BoxYPositions[i] = (parseInt(this.BoxYPositions[i],10)-2)*FaktorY;
                    this.BoxWidth[i] = document.getElementById(i+"").offsetWidth*FaktorX;
                    this.BoxHeight[i] = document.getElementById(i+"").offsetHeight*FaktorY;
                    x2[i] = this.BoxXPositions[i]+this.BoxWidth[i];
                    y2[i] = this.BoxYPositions[i]+this.BoxHeight[i];
                    result[i+1] = {"x1":this.BoxXPositions[i]+"",
                                    "x2":x2[i]+"",
                                    "y1":this.BoxYPositions[i]+"",
                                    "y2":y2[i]+"",
                                    "value": this.inputValues[i]+""}
                }                
            }
            console.log(result);
            fetch('http://localhost:3000/x', {
               
                method: "post",
                headers: {Accept: 'application/json', "Content-Type" : "application/json"},
                body: JSON.stringify(result),
                
                
            }
            )
            alert("Daten gespeichert")

        
        }


    render() { 

        const box = {
           
            width : this.state.width,
            height : this.state.height,
            
            
        }
        
        return(
            

            <div>
                <div className ="container-fluid">
                
                    
                
                <div className="row">

                    <div className="col-4" id="leftCol" >
                    <h1>x: {this.state.offsetx}</h1>
                        
                        <h1>y: {this.state.offsety}</h1>
                        
                        <h3> Box erstellen mit Klick auf Bild</h3>
                        <h3>Zum Löschen einer Box auf "entf" klicken</h3>   
                    {this.mapArray.map(i => { return this.createNewBox[i] ? 
                        <div onFocus ={(e) => {this.handleGutterClick(e,i)} } onBlur ={(e) => {this.handleGutterClick(e,i)}}
                        onMouseOver = {(e) => {this.handleGutterClick(e,i)}} onMouseOut = {(e) => {this.handleGutterClick(e,i)}}

                        tabIndex ="0" id= {i+"c"} class="p-3 border bg-light">Box{i+1}    
                        <input type="text" className ="form-control GutterInput"id={"GutterInput"+i} onChange = {(e) => this.setInputText(e,i)}></input> 
                        
                        
                        </div> : false})}
                    </div>
                    <div className="col">
                        
                        <img id = "image" onMouseDown = {this.handleEventonImage} onMouseUp = {this.handleEventonImage}
                            src={this.state.imageUrl} alt = "" className="imgStyle"
                        /> 
                        {this.mapArray.map(i => { return this.createNewBox[i] ? 
                        <div className = "box" tabIndex="0" id = {i+""} 
                            onKeyDown = {(e)=>{this.deleteBox(e, i)}}
                            onMouseDown = {(e) => {this.handlerEventPressedBox(e, i)}} 
                            onMouseUp = {(e) => {this.handlerEventMouseMove(e, i)}}  
                            onMouseMove = {(e) => {this.handlerEventMouseMove(e, i)}} 
                            onMouseLeave = {(e) => {this.handlerEventMouseMove(e, i)}}
                            onMouseOut = {(e) => {this.handlerEventMouseMove(e, i)}} 
                            style={{ zIndex: this.setZIndex[i], left:this.BoxXPositions[i], top:this.BoxYPositions[i],
                            width: this.BoxWidth[i], height: this.BoxHeight[i], maxWidth: this.mWidth[i], 
                            maxHeight: this.mHeight[i]}}>
                            <input onChange = {(e) => {this.setGutterText(e,i)}} 
                            id={i+"labelPicture"} className = "labelInput form-control" type="text" >
                            </input>
                            </div> : false })}
                            <div id="inputDiv" >
                        
                            <div className = "input-group mb-3">
                                <input id = "inputLink" 
                                placeholder="https://th.bing.com/th/id/OIP.qgURzPzxSIrplEZeHR1t7wHaJ4?pid=ImgDet&rs=1" 
                                className = "form-control" type="text" 
                                onKeyDown = {(e) => this.handleLinkInput(e)} />
                                
                                <label class="form-label" for="inputLink"></label>
                            
                            
                           <submit type="button" className="btn btn-md btn-outline-secondary" onClick = {(e) => this.handleLinkInput(e)}>Bild laden</submit>
                           </div>
                           
                        <submit type="button" className="btn btn-md btn-info" onClick={this.saveData}>Save</submit> 
                    </div> 
                   </div>
                    
                        </div>
                        </div>

                        
                        
                     
 
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col">
                    
                    </div>
                    </div>
                


            </div>
            </div>

        );
    }
}
 
export default ImageAnnotation;
