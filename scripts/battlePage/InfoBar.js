import * as React from '../../node_modules/react';
import * as ReactBootstrap from '../../node_modules/react-bootstrap';
import { Socket } from './Socket';
import { ProgressBar } from '../../node_modules/react-bootstrap';

export class InfoBar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            
             'character' : 'character',
             'link' : 'link',
             'health' : 'health',
             'opCharacter' : 'opCharacter',
             'opHealth' : 'opHealth',
             'opLink' : 'opLink' 
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        
    }
    
    componentDidMount(){
        Socket.emit('updateInfo')
        // Allows moves to be dynamically updated.
        Socket.on('updatePokemon', (data) =>{
            this.setState({
                'character'  : data['name'],
                'health': data['health'],
                'link' : data['link'],
                'opCharacter'  : data['opName'],
                'opHealth': data['opHealth'],
                'opLink' : data['opLink']
            })
        })
        
        
        // Allows moves to be dynamically updated.
        Socket.on('updateOpPokemon', (data) =>{
            this.setState({
                'opCharacter'  : data['name'],
                'opHealth': data['health'],
                'opLink' : data['link']
            });
            this.forceUpdate();
        })
        
        Socket.on('updateSpectator', (data) =>{
            this.setState({
                'health' : data['healthP1'],
                'opHealth' : data['healthP2'],
                'character' : data['nameP1'],
                'opCharacter' : data['nameP2'],
                'link' : data['linkP1'],
                'opLink' : data['linkP2']
            })
        })
        
        Socket.on('battleUpdate', (data) =>{
            this.setState({
                'health' : data['curHealth'],
                'opHealth' : data['opHealth']
            });
            this.forceUpdate();
        })
    }
    render() {
        let character = this.state.character;
        let link = this.state.link;
        var health = this.state.health;
               
        let opCharacter = this.state.opCharacter;
        var opHealth = this.state.opHealth;
        let opLink = this.state.opLink;
        
        health = parseFloat(health).toFixed(2);
        opHealth = parseFloat(opHealth).toFixed(2);
            
        // sorry i hard coded the indexes and passed both individually.
        // Its a little wierd with the opp charaters until both users are online. 
        return (
            <div id = 'HealthLog'>
            
                <h3 id="pokemonInfoHeader">Active Pokemon</h3>
                <div id = 'ourPokemon'>
                    <img className="images" src={link}/> 
                    <p>{character}</p>
                    <ProgressBar>
                        <ProgressBar bsStyle="success" now={health*100} label={`${Math.floor(health*100)}%`} key={1} />
                        <ProgressBar bsStyle="danger" now={100 - (health*100)} key={2} />
                    </ProgressBar>
                </div>
                
                <div id='theirPokemon'>
                    <img className="images" src={opLink}/> 
                    <p >{opCharacter}</p>
                    <ProgressBar>
                        <ProgressBar bsStyle="success" now={opHealth*100} label={`${Math.floor(opHealth*100)}%`} key={1} />
                        <ProgressBar bsStyle="danger" now={100 - (opHealth*100)} key={2} />
                    </ProgressBar>
                </div>
                
            </div>
        );
    }
}