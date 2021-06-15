import React, { useContext, useEffect, useState } from 'react';
import { ListGroup, Badge ,Media,Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { MyContext } from '../App';
import { getData } from '../fetch';
export default function Store() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const {token,setToken} = useContext(MyContext);
    const [modal, setModal] = useState(false);

    const [Name, setName] = useState("")
    const [Size, setSize] = useState()
    const [Image, setImage] = useState("")
    const [Version, setVersion] = useState("")
    const [Price, setPrice] = useState(0)
    const [update, setUpdate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const toggle = () => setModal(!modal);
    const toggleEdit = () => setModalEdit(!modalEdit);
    const updt = () => setUpdate(!update);
    const [itemEdit, setItemEdit] = useState(null)

    useEffect(() => {
        getApps();
      }, [update])
      const getApps = () => {
        getData('https://localhost:5001/api/applications/own?token='+token)
          .then(data =>  data.length > 0 && setData(data)  )
      }
    const newApp=()=>{
        fetch('https://localhost:5001/api/applications/token/'+token, {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({Name,Size,Image,Version,Price})
}).then(res => res.json())
  .then(res => getApps());
  toggle();
  getApps();

  updt()
    }
    const remove =(id)=>{

        fetch('https://localhost:5001/api/applications/'+id+'/token/'+token, {
  method: 'delete',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({Name,Size,Image,Version,Price})
}).then(res => res.json())
  .then(res => getApps());
  getApps()
  updt()

    }
    const edit = (item)=>{
        console.log(itemEdit)
        setItemEdit({...item})
        toggleEdit()
    }
    const updateItem = ()=>{
        fetch('https://localhost:5001/api/applications/'+itemEdit.id+'/token/'+token, {
            method: 'put',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({...itemEdit})
          }).then(res => res.json())
            .then(res => getApps());
            toggleEdit()
            getApps()
            updt()
    }
      return (
        <div>
          <div class="form-inline justify-content-center ">
          <Button color="success" onClick={toggle}>Add new App</Button>
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
                      <Button color="info" onClick={()=>edit({...item})}>edit</Button>{' '}
                      <Button color="danger" onClick={()=>remove(item.id)}>delete</Button>{' '}
                </li>
              ))
            }
    
    
          </ul>
          <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>new application</ModalHeader>
        <ModalBody>
            <Form>
            <FormGroup>
        <Label for="exampleName">Name</Label>
        <Input type="Name" name="Name" id="exampleName" placeholder="Name" value={Name} onChange={e => setName(e.target.value)}/>
      </FormGroup>  
            <FormGroup>
        <Label for="exampleName">size</Label>
        <Input type="number" name="Size" id="exampleSize" placeholder="size of app in mb"  value={Size} onChange={e => setSize(e.target.value)}/>
      </FormGroup>  
            <FormGroup>
        <Label for="exampleName">Price</Label>
        <Input type="number" name="Price" id="examplePrice" placeholder="Price" value={Price} onChange={e => setPrice(e.target.value)}/>
      </FormGroup>  
            <FormGroup>
        <Label for="exampleName">Image</Label>
        <Input type="Name" name="Image" id="exampleImage" placeholder="Image" value={Image} onChange={e => setImage(e.target.value)} />
      </FormGroup>  
            <FormGroup>
        <Label for="exampleName">Version</Label>
        <Input type="Name" name="Version" id="exampleVersion" placeholder="Version of app" value={Version} onChange={e => setVersion(e.target.value)}/>
      </FormGroup> 

            </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={newApp}>add</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalEdit} toggle={toggleEdit} >
        <ModalHeader toggle={toggleEdit}>update application</ModalHeader>
        <ModalBody>
            <Form>
            <FormGroup>
        <Label for="exampleName">Name</Label>
        <Input type="Name" name="Name" id="exampleName" placeholder="Name" value={itemEdit?.name} onChange={e => setItemEdit({...itemEdit,name:e.target.value})}/>
      </FormGroup>  
            <FormGroup>
        <Label for="exampleName">size</Label>
        <Input type="number" name="Size" id="exampleSize" placeholder="size of app in mb"  value={itemEdit?.size} onChange={e => setItemEdit({...itemEdit,size:e.target.value})}/>
      </FormGroup>  
            <FormGroup>
        <Label for="exampleName">Price</Label>
        <Input type="number" name="Price" id="examplePrice" placeholder="Price" value={itemEdit?.price} onChange={e => setItemEdit({...itemEdit,price:e.target.value})}/>
      </FormGroup>  
            <FormGroup>
        <Label for="exampleName">Image</Label>
        <Input type="Name" name="Image" id="exampleImage" placeholder="Image" value={itemEdit?.image} onChange={e => setItemEdit({...itemEdit,image:e.target.value})} />
      </FormGroup>  
            <FormGroup>
        <Label for="exampleName">Version</Label>
        <Input type="Name" name="Version" id="exampleVersion" placeholder="Version of app" value={itemEdit?.version} onChange={e => setItemEdit({...itemEdit,version:e.target.value})}/>
      </FormGroup> 

            </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateItem}>update</Button>{' '}
          <Button color="secondary" onClick={toggleEdit}>Cancel</Button>
        </ModalFooter>
      </Modal>
        </div>
      );
}

