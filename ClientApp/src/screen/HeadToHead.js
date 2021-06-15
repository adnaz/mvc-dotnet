import React,{useState} from 'react'
import Background from '../Component/Background'
import Player from '../Component/Player'
import { Container, Row, Col } from 'reactstrap';
import Search from '../Component/Search';
const HeadToHead = () => {
    let playerOneInit = {
        id: 1,
        f_name: "Roger",
            l_name: "Federer",
            img_url: "http://www.atpworldtour.com/-/media/images/news/2017/08/11/20/44/federer-montreal-2017-friday.jpg",
            national_flag: "https://lipis.github.io/flag-icon-css/flags/4x3/ch.svg",
            nation:"SUI",
            rank: 3,
            age: 36,
            weight: 85,
            height: 185,
            titles: 5,
            "W-L": "35-3",
        point: 0,
        set: [],
        got_set: [],
        server: true,
    }
    
    let playerTwoInit = {
        id: 2,
        f_name: "Rafael",
        l_name: "Nadal",
        img_url: "http://www.atpworldtour.com/-/media/images/news/2017/07/10/21/54/nadal-wimbledon-2017-monday-2.jpg",
        national_flag: "https://lipis.github.io/flag-icon-css/flags/4x3/es.svg",
        nation:"ESP",
        rank: 2,
        age: 31,
        weight: 85,
        height: 185,
        titles: 4,
        "W-L": "47-8",
        point: 0,
        set: [],
        got_set: [],
        server: false,
    }
  const [playerOne, setPlayerOne] = useState(playerOneInit)
  const [playerTwo, setPlayerTwo] = useState(playerTwoInit)
    return (
        <Row>
        <Col>
        {
            playerOne ? 
            (
                <Player player={playerOne} setPlayer={setPlayerOne}/>
            )
            :
            (
               <Search setPlayer={setPlayerOne}/>
            )
        }
        
        
        </Col>
        
        <Col>
        {
            playerTwo 
            ? 
            (
                <Player player={playerTwo} setPlayer={setPlayerTwo}/>
            )
            :
            (
                <Search setPlayer={setPlayerTwo}/>
                )
        }
        </Col>
      </Row>
           
    )
}

export default HeadToHead
