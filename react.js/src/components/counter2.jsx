import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import rectangle from './rectangle';


class Counter extends Component {

    constructor(props){
        super(props)
        
    this.state = {

        count : 1,
        /*imageUrl : "https://image.geo.de/30042248/t/5d/v3/w960/r0/-/loewe-gross-jpg--17148-.jpg",*/
        imageUrl : "https://th.bing.com/th/id/OIP.qgURzPzxSIrplEZeHR1t7wHaJ4?pid=ImgDet&rs=1",
        width : "200px",
        height : "200px",
        x : "0px",
        y : "0px",
        offsetx : "0",
        offsety : "0",
        marginL : "50%",
        /*transform : "translate(-50%, -50%)",*/
        pressed : "false",
        currentWidth : "200",
        currentHeight : "200",
        imageWidth : "0",
        imageHeight : "0",

        };
    }

    handleEvent = (event) => {
        if (event.type === "click") {
               this.setState({
                    
                    count: "2",
                    x : event.nativeEvent.pageX - parseInt(this.state.width, 10)/2 + "px",
                    
                    y : event.nativeEvent.offsetY - parseInt(this.state.height, 10)/2 + "px",
                   
                    marginL : "0%",
                    /*Obere, Linke des Rechtecks*/
                    offsetx : event.nativeEvent.offsetX-parseInt(this.state.width, 10)/2,
                    offsety : event.nativeEvent.offsetY-parseInt(this.state.height, 10)/2,
                    width: document.getElementById("box").offsetWidth,
                    height: document.getElementById("box").offsetHeight,
                    imageHeight: document.getElementById("image").offsetHeight,
                    imageWidth : document.getElementById("image").offsetWidth,
            
            
            
            });
           } else {
               this.setState({ 
                   count: "3",
            
            });
           }
       }


       handlerEventGetCurrentWidthAndHeight = (event) => {
        if(event.type ==="mousedown" && parseInt(event.nativeEvent.offsetX,10)<parseInt(this.state.width,10)-30
        && parseInt(event.nativeEvent.offsetY,10)<parseInt(this.state.height,10)-30
        ){
            this.setState({
                pressed : "true",
            })
        }



    }

       handlerEventClickInBox = (event) => {
           if(event.type === "mouseup"){
               if(this.state.currentHeight == document.getElementById("box").offsetHeight
               && this.state.currentWidth == document.getElementById("box").offsetWidth){
                    this.setState({
                        
                        x : parseInt(this.state.x,10) + event.nativeEvent.offsetX-parseInt(this.state.width,10)/2 +"px",
                        
                        y : parseInt(this.state.y, 10) + event.nativeEvent.offsetY - parseInt(this.state.height,10)/2+"px",
                        offsety : this.state.offsety + event.nativeEvent.offsetY - parseInt(this.state.height,10)/2,
                        offsetx : this.state.offsetx + event.nativeEvent.offsetX - parseInt(this.state.width,10)/2,
                        width: document.getElementById("box").offsetWidth,
                        height: document.getElementById("box").offsetHeight,
                        pressed : "false",
                        
                    })
                }
                if(this.state.currentHeight != document.getElementById("box").offsetHeight || 
                this.state.currentWidth != document.getElementById("box").offsetWidth){
                    this.setState({
                        width: document.getElementById("box").offsetWidth,
                        currentWidth : document.getElementById("box").offsetWidth,
                        height: document.getElementById("box").offsetHeight,
                        currentHeight : document.getElementById("box").offsetHeight,
                        pressed : "false",
                    })
                }
           }
           else{
               this.setState({

        
                
               })
           }


       }



       handlerEventMouseMove = (event) => {
           if(event.type === "mousemove" && this.state.pressed == "true" ){
               this.setState({
                x : parseInt(this.state.x,10) + event.nativeEvent.offsetX-parseInt(this.state.width,10)/2 +"px",
                        
                y : parseInt(this.state.y, 10) + event.nativeEvent.offsetY - parseInt(this.state.height,10)/2+"px",
                offsety : this.state.offsety + event.nativeEvent.offsetY - parseInt(this.state.height,10)/2,
                offsetx : this.state.offsetx + event.nativeEvent.offsetX - parseInt(this.state.width,10)/2,
                width: document.getElementById("box").offsetWidth,
                height: document.getElementById("box").offsetHeight,
               
               })

           }
       }




    render() { 

        const box = {
           
            width : this.state.width,
            height : this.state.height,
            border:"4px solid #000000",
            position: "absolute",
            top: this.state.y,
            left: this.state.x,
            transform: this.state.transform,
            /*padding: "12px 24px",*/
            borderRadius: "2px",
            marginLeft : this.state.marginL,
            display: "",
            resize: "both",
            overflow: "auto",
            cursor: "pointer",
            
            
        }
        
        const container = {
            position: "absolute",
            width: "50%",
            height: "100%",
        }

        const imgStyle = {
            border: "2px solid black",
            width: "100%",
            height: "100%",
            top: "100%",
            marginLeft: "50%",
            cursor:"pointer",
        }


        return(
            

            <div>
                <form>
                    <input id ="input" type="text"></input>
                    <submit type="button" className="btn">Submit</submit>
                </form>
                
                <div style = {container}>
                <img id = "image" onClick = {this.handleEvent} 
                    /*onMouseUp = {this.handleEvent}*/ src={this.state.imageUrl} alt = "" style = {imgStyle}/>

                    <div id = "box" onMouseDown = {this.handlerEventGetCurrentWidthAndHeight} onMouseUp = {this.handlerEventClickInBox}  
                    onMouseMove = {this.handlerEventMouseMove} style={box}></div>
                    
                </div>
                
                <span>{this.formatCount()}</span>
                <h1>x: {this.state.offsetx}</h1>
                <h1>y: {this.state.offsety}</h1>
                <h3>Rechteck Breite: {this.state.width}</h3>
                <h3>Image Breite {this.state.imageWidth}</h3>
                <h3>Image Höhe {this.state.imageHeight}</h3>
                <h3>{this.state.pressed}</h3>
                <button className="btn btn-secondary">Increment</button>
            </div>

        );
    }

    formatCount(){
        const count = this.state.count;
        return count == 0 ? "ZERO" : count;
    }
}
 
export default Counter;