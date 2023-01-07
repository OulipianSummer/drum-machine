import React from "react";
import * as ReactDOM from 'react-dom';
import {Button, ButtonGroup, Container, Col, Row, Card} from "react-bootstrap";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentKey: "Press the keys on you keyboard!",
    };
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }
  
  componentDidMount(){
    
    // Add event listeners for keypstrokes. Activates this.handleButtonPress via the .click() method
    document.addEventListener('keypress',(event)=>{
      const key = event.key.toUpperCase();
      event.preventDefault();
      const button = document.querySelector(`button[data-key="${key}"]`);
      if(button){
        button.click();
      }
    })
  }
  
  // An object for mapping buttons, their associated audio objects, events, and triggering keys
  rows = [
      { key: "Q", src: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Korg%20ER-1/10[kb]er1-hhcl.wav.mp3", name: 'Hi-Hat Clap', row: 'first' },
      { key: "W", src: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Korg%20ER-1/71[kb]er1-hhop.wav.mp3", name: 'Hi-Hat Hit', row:'first' },
      { key: "E", src: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Korg%20ER-1/166[kb]er1-cymbnoiz.wav.mp3", name: 'Cymbol Crash', row:'first' },
      { key: "A", src: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Korg%20ER-1/32[kb]er1-tabla.wav.mp3", name: 'Small Tom', row:'second' },
      { key: "S", src: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Korg%20ER-1/18[kb]er1-tom2.wav.mp3', name: 'Medium Tom', row:'second' },
      { key: "D", src: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Korg%20ER-1/104[kb]er1-bd1.wav.mp3", name: 'Bass Drum', row: 'second' },
      { key: "Z", src: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Korg%20ER-1/37[kb]er1-ping.wav.mp3", name: 'Ping', row: 'third' },
      { key: "X", src: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Korg%20ER-1/39[kb]er1-snare.wav.mp3", name: 'Snare', row: 'third' },
      { key: "C", src: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Korg%20ER-1/15[kb]er1-pong.wav.mp3", name: 'Pong', row: 'third' }
    ];
  
  // A handler that handles the audio playback
 async handleButtonPress(event){
    event.preventDefault();
    let targetID = event.target.innerText;
    
    let recentKey = targetID;
    let row;
    this.rows.forEach(ele => {
      if(ele.key === recentKey){
        this.setState({recentKey: ele.name});
      }
    });
    
   // Audio files will not play on top of one another unless you clone the node, so this block allows multi layered audio channesls
    let audio = document.getElementById(targetID);
    if(audio.duration > 0 && !audio.paused){
      audio.cloneNode(true).play();
      return;
    }
    
   // If no audio is playing from the current block, start it.
    try{
      await audio.play();
      } catch (e){
       if(!event.key){console.log(event)}
       return console.log(event.key + ' is not a valid key!');
      }
    
  }
  
  render() {
   
    const render_rows = {
      first: [],
      second: [],
      third: []
    };
    for(let i = 0; i < this.rows.length; i++){
      
      let button = <Button
            data-key={this.rows[i].key}
            id={this.rows[i].name.toLowerCase().replace(/ /g, '_')}
            className='drum-pad'
            key={`${this.rows[i]}_button`}
            onClick={(event)=>(this.handleButtonPress(event))}
           >
           <audio preload="auto" className="clip" id={this.rows[i].key} src={this.rows[i].src}>
              Your browser does not support the audio
              element.
            </audio>
            <span   
              id={`${this.rows[i].key}_span`} 
              name={this.rows[i].name}
              value={this.rows[i].key} 
              className='display-4'>{this.rows[i].key}
            </span>
          </Button>;
        
        if(i >= 0 && i <= 2){
          console.log(this.rows[i]);
          render_rows.first.push(button);
        } else if(i >= 3 && i <= 5){
          render_rows.second.push(button);
        } else if (i >= 6 && i <= 9){
          render_rows.third.push(button);
        }
      }
    
    return (
      <Row>
        <Col>
          <Container>
            <Card>
              <Card.Header>
                <h1 className="text-center">Korg ER-1 Drum Machine</h1>
              </Card.Header>
              <Card.Body>
                <Container className='py-5 px-5'>
                  <Row>
                    <Row id="drum-machine">
                      <Col>
                        <Row>
                          <Col>
                            <ButtonGroup size="lg">
                              {render_rows.first}
                            </ButtonGroup>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col>
                            <ButtonGroup size="lg">
                              {render_rows.second}
                            </ButtonGroup>
                           </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col>
                              <ButtonGroup size="lg">
                                {render_rows.third}
                              </ButtonGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Col >
                      <Container className="w-100">
                        <Row>
                          <Col>
                            <div
                              id="display"
                              className="display-4 text-center align-middle"
                              style={{
                                paddingTop: "25%",
                                paddingBottom: "25%"
                              }}
                            >
                              {this.state.recentKey}
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
              <Card.Footer><p className='text-center mt-2'>*If the buttons don't work at first, wait for a little while and let the audio resources load!</p></Card.Footer>
            </Card>
          </Container>
        </Col>
      </Row>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));