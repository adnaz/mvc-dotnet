import React, { useState, useContext, useEffect } from 'react'
import { Table, ListGroup, Badge, Media, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { MyContext } from '../App';
import { getData } from '../fetch';
import DatePicker from "react-datepicker";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import "react-datepicker/dist/react-datepicker.css";
const Players = () => {
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const { token, setToken } = useContext(MyContext);
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
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


  const [first, setFirst] = useState("")
  const [last, setLast] = useState("")
  const [rank, setRank] = useState()
  const [dateTime, setDateTime] = useState()
  const [weight, setWeight] = useState()
  const [height, setHeight] = useState()
  const [titles, setTitles] = useState()
  const [wins, setWins] = useState()
  const [losses, setLosses] = useState()

  useEffect(() => {
    getPlayer();
  }, [])

  const newPlayer = () => {

    fetch('https://localhost:5001/api/players', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ first, last, rank, dateTime, weight, height, titles, wins, losses })
    }).then(res => { console.log(res.json()) })
      .then(res => getPlayer());
      toggle();
  }
  const getPlayer = () => {
    getData('https://localhost:5001/api/players')
      .then(data => data.length > 0 && setData(data))
  }

  const updateItem = () => {
    fetch('https://localhost:5001/api/players/'+itemEdit.id ,{
            method: 'put',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({...itemEdit})
          }).then(res => res.json())
            .then(res => getPlayer());
            toggleEdit()
            getPlayer()
  }
  const remove = (id) => {

    confirmAlert({
      title: 'Confirm to delete the player',
      message: 'Are you sure tyou wanna delete this player.',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>{
            fetch('https://localhost:5001/api/players/' + id , {
              method: 'delete',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            }).then(res => res.json())
              .then(res => getPlayer());
          }
        },
        {
          label: 'No',
          // onClick: () => alert('Click No')
        }
      ]
    });
  
      getPlayer()
  }
  const edit = (item) => {
    setItemEdit({...item})
    toggleEdit()
  }
  return (
    <div>
      <Button onClick={toggle}>
        add new player
      </Button>
      <Table bordered>

        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>#rank</th>
            <th>born</th>
            <th>weight</th>
            <th>height</th>
            <th>titles</th>
            <th>wins</th>
            <th>losses</th>



          </tr>
        </thead>
        {
          data.map((item) => (
            <tbody>
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.first}</td>
                <td>{item.last}</td>
                <td>{item.rank}</td>
                <td>{item.dateTime} </td>
                <td>{item.weight} </td>
                <td>{item.height} </td>
                <td>{item.titles} </td>
                <td>{item.wins} </td>
                <td>{item.losses} </td>
                <th>
                  <Button color="info" onClick={() => edit({ ...item })}>edit</Button>{' '}
                  <Button color="danger" onClick={() => remove(item.id)}>delete</Button>{' '}
                </th>
              </tr>
            </tbody>
          ))
        }
      </Table>


      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>new user</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleName">first name</Label>
              <Input type="Name" name="Name" id="exampleName" placeholder="first name" value={first} onChange={e => setFirst(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">last name</Label>
              <Input type="Name" name="Name" id="exampleName" placeholder="last name" value={last} onChange={e => setLast(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Rank</Label>
              <Input type="number" name="Size" id="exampleSize" placeholder="rank" value={rank} onChange={e => setRank(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">date</Label>
              <DatePicker selected={dateTime} onChange={(date) => setDateTime(date)} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Weight</Label>
              <Input type="number" name="Price" id="examplePrice" placeholder="Weight" value={weight} onChange={e => setWeight(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Height</Label>
              <Input type="number" name="Price" id="examplePrice" placeholder="Height" value={height} onChange={e => setHeight(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Titles</Label>
              <Input type="Name" name="Image" id="exampleImage" placeholder="Titles" value={titles} onChange={e => setTitles(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Wins</Label>
              <Input type="Name" name="Version" id="exampleVersion" placeholder="Wins" value={wins} onChange={e => setWins(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">losses</Label>
              <Input type="Name" name="Version" id="exampleVersion" placeholder="Losses" value={losses} onChange={e => setLosses(e.target.value)} />
            </FormGroup>

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={newPlayer}>add</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalEdit} toggle={toggleEdit} >
        <ModalHeader toggle={toggleEdit}>update application</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup>
              <Label for="exampleName">first name</Label>
              <Input type="Name" name="Name" id="exampleName" placeholder="first name" value={itemEdit?.first} onChange={e => setItemEdit({...itemEdit,first:e.target.value})} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">last name</Label>
              <Input type="Name" name="Name" id="exampleName" placeholder="last name" value={itemEdit?.last} onChange={e => setItemEdit({...itemEdit,last:e.target.value})} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Rank</Label>
              <Input type="number" name="Size" id="exampleSize" placeholder="rank" value={itemEdit?.rank} onChange={e => setItemEdit({...itemEdit,rank:e.target.value})} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">date</Label>
              <DatePicker selected={dateTime} onChange={(date) => setDateTime(date)} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Weight</Label>
              <Input type="number" name="Price" id="examplePrice" placeholder="Weight" value={itemEdit?.weight} onChange={e => setItemEdit({...itemEdit,weight:e.target.value})} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Height</Label>
              <Input type="number" name="Price" id="examplePrice" placeholder="Height" value={itemEdit?.height} onChange={e => setItemEdit({...itemEdit,height:e.target.value})} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Titles</Label>
              <Input type="Name" name="Image" id="exampleImage" placeholder="Titles" value={itemEdit?.titles} onChange={e => setItemEdit({...itemEdit,titles:e.target.value})} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Wins</Label>
              <Input type="number" name="Version" id="exampleVersion" placeholder="Wins" value={itemEdit?.wins} onChange={e => setItemEdit({...itemEdit,wins:e.target.value})} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">losses</Label>
              <Input type="number" name="Version" id="exampleVersion" placeholder="Losses" value={itemEdit?.losses} onChange={e => setItemEdit({...itemEdit,losses:e.target.value})} />
            </FormGroup>

          </Form>
         </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateItem}>update</Button>{' '}
          <Button color="secondary" onClick={toggleEdit}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Players
