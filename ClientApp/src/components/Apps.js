import React, { useContext, useEffect, useState } from 'react';
import { ListGroup, Badge ,Media,Button} from 'reactstrap';
import { MyContext } from '../App';
import { getData } from '../fetch';
export default function Apps() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const {token,setToken} = useContext(MyContext);
    useEffect(() => {
        getApps();
      }, [])
      const getApps = () => {
        getData('https://localhost:5001/api/ApplicationUser')
          .then(data => data.length > 0 && setData(data) )
      }
    const update = (item) => {
      item.version = item.application.version;
      fetch('https://localhost:5001/api/ApplicationUser/'+item.id+'/token/'+token, {
        method: 'put',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...item})
      }).then(res => res.json())
        .then(res => getApps());
        getApps()
       
    }
      return (
        <div>
          <div class="form-inline justify-content-center ">
          </div>
          <ul class="list-group">
            {
    
              data.map((item) =>
              (
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  {
                    item.application.image ?
                    (
                      <img  width="80" height="80" src={item.application.image} class="rounded" alt=""/>
    
                    )
                    :
                    (
                      <img  width="100" height="100" src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/04/attachment_82290822-e1492536097660.png?auto=format&q=60&fit=max&w=930" class="rounded" alt=""/>
                    )
                  }
                  {item.application.name}
                  <Badge>
                    {item.application.size}mb
                  </Badge>
                  {
                    item.application.version != item.version
                    ?
                    (
                      <Badge color="danger">
                      {item.application.version}
                    </Badge>
                    )
                    :
                    (
                      <Badge>
                      {item.application.version}
                    </Badge>
                    )
                  }
                 
                  {
                    item.application.price ?
                      (
                        <span class="badge badge-primary badge-pill">{item.application.price}DH</span>
    
                      )
                      :
                      (
                        <span class="badge badge-success badge-pill">free</span>
    
                      )
                  }
                   {
                    item.application.version != item.version
                    ?
                    (
                      <Button color="primary" onClick={()=>update(item)}>update</Button>
                    )
                    :
                    (
                      <Badge>
                      up to date
                    </Badge>
                    )
                  }
                  
                </li>
              ))
            }
    
    
          </ul>
        </div>
      );
}

