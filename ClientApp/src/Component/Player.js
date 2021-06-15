import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Badge,Row,Col
  } from 'reactstrap';
function Player({player,setPlayer}) {
    return (
        <div>
      <Card>
        <CardImg top width="100%" src={player.img_url} alt="Card image cap" />
        <CardBody>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{player.f_name}</CardSubtitle>
          <CardTitle tag="h5">{player.l_name}</CardTitle>
          <Row>
        <Col>
        <Badge href="#" color="info">RANK</Badge>
        <h3>
        { player.rank }
        </h3>
        </Col>
      </Row>
          <Row>
        <Col>
        <Badge href="#" color="primary">AGE</Badge>
        <h3>
        { player.age }
        </h3>
        </Col>
        <Col>
        <Badge href="#" color="primary">WEIGHT</Badge>
        <h3>
        { player.weight }
        </h3>
        </Col>
        <Col>
        <Badge href="#" color="primary">HEIGHT</Badge>
        <h3>
        { player.height }
        </h3>
        </Col>
      </Row>
      <Row>
      <Col>
        <Badge href="#" color="success">TITLES</Badge>
        <h3>
        { player.titles }
        </h3>
        </Col>
      <Col>
        <Badge href="#" color="success">W-L</Badge>
        <h3>
        { player["W-L"] }
        </h3>
        </Col>
      </Row>
          <Button color="warning" onClick={()=>setPlayer(0)}>remove</Button>
        </CardBody>
      </Card>
    </div>
    )
}

export default Player
