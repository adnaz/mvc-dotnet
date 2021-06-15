import React, { useContext, useEffect, useState } from 'react';
import { ListGroup, Badge ,Media,Button, ListGroupItem } from 'reactstrap';
import { MyContext } from '../App';
import { getData } from '../fetch';
import { Bracket, RoundProps } from 'react-brackets';
export const Home = () => {
  const {token,setToken} = useContext(MyContext);
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")


  const rounds= [
    {
      title: 'Round one',
      seeds: [
        {
          id: 1,
        //   date: new Date().toDateString(),
          teams: [{ name: 'Novak Djokovic' }, { name: 'Daniil Medvedev' }],
        },
        {
          id: 2,
        //   date: new Date().toDateString(),
          teams: [{ name: 'Rafael Nadal' }, { name: 'Roger Federer' }],
        },
      ],
    },
    {
      title: 'Round two',
      seeds: [
        {
          id: 3,
        //   date: new Date().toDateString(),
          teams: [{ name: 'Roger Federer' }, { name: 'Novak Djokovic' }],
        },
      ],
    },
  ];
  const rounds2= [
    {
      title: 'Round one',
      seeds: [
        {
          id: 1,
        //   date: new Date().toDateString(),
          teams: [{ name: 'max verstapen' }, { name: 'andi' }],
        },
        {
          id: 2,
        //   date: new Date().toDateString(),
          teams: [{ name: 'morad' }, { name: 'ali' }],
        },
      ],
    },
    {
      title: 'Round two',
      seeds: [
        {
          id: 3,
        //   date: new Date().toDateString(),
          teams: [{ name: 'andi' }, { name: 'ali' }],
        },
      ],
    },
  ];
  const rounds3= [
    {
      title: 'Round one',
      seeds: [
        {
          id: 1,
        //   date: new Date().toDateString(),
          teams: [{ name: 'philip tsonga' }, { name: 'alan prost' }],
        },
        {
          id: 2,
        //   date: new Date().toDateString(),
          teams: [{ name: 'gael monfils' }, { name: 'lewis hamilton' }],
        },
      ],
    },
    {
      title: 'Round two',
      seeds: [
        {
          id: 3,
        //   date: new Date().toDateString(),
          teams: [{ name: 'gael monfils' }, { name: 'philip tsonga' }],
        },
      ],
    },
  ];



  useEffect(() => {
    getApps();
  }, [])
  const getApps = () => {
    getData('https://localhost:5001/api/applications')
      .then(data => setData(data))
  }
  const find = () => {
    if(search){
      getData('https://localhost:5001/api/applications/search?search='+search)
    .then(data => setData(data))
    }else{
      getApps();
    }
  }
  const add=(id)=>{
    fetch('https://localhost:5001/api/ApplicationUser/token/'+token, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ApplicationId:id})
    }).then(res => res.json())
      .then(res => console.log(res));

  }
  return (
    <div>
      <div class="form-inline justify-content-center ">
        <input class="form-control mr-sm-2" value={search} onChange={e => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success my-2 my-sm-0" onClick={find}>Search</button>
      </div>
      <ul class="list-group">
        {

          data.map((item) =>
          (
            <li class="list-group-item d-flex justify-content-between align-items-center">
              {
                item.image ?
                (
                  <img  width="80" height="80" src={item.image} class="rounded" alt=""/>

                )
                :
                (
                  <img  width="100" height="100" src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/04/attachment_82290822-e1492536097660.png?auto=format&q=60&fit=max&w=930" class="rounded" alt=""/>
                )
              }
              {item.name}
              <Badge>
                {item.size}mb
              </Badge>
              <Badge>
                {item.version}
              </Badge>
              {
                item.price ?
                  (
                    <span class="badge badge-primary badge-pill">{item.price}DH</span>

                  )
                  :
                  (
                    <span class="badge badge-success badge-pill">free</span>

                  )
              }
              <Button color="primary" onClick={()=>add(item.id)}>Add</Button>
            </li>
          ))
        }


      </ul>
      <h1>Tournaments:</h1>
        <ListGroup>
          <ListGroupItem tag="a" href="#">The French Open</ListGroupItem>
          <Bracket rounds={rounds} />
          <ListGroupItem tag="a" href="#">Wimbledon</ListGroupItem>
          <Bracket rounds={rounds2} />
          <ListGroupItem tag="a" href="#">US Open </ListGroupItem>
          <Bracket rounds={rounds3} />
        </ListGroup>
    </div>
  );
}
