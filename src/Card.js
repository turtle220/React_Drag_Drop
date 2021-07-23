import React from 'react'
import { ReactSortable } from 'react-sortablejs'
import './styles.css'

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      on: true,
      openCard: true,
      elementValue: "",
      title: "",
      data: [
        {
          title: 'Card1',
          id: 1,
          slist: [
            { name: 'Element1', id: '1' },
            { name: 'Element2', id: '2' },
            { name: 'Element3', id: '3' },
            { name: 'Element4', id: '4' },
            { name: 'Element5', id: '5' },
            { name: 'Element6', id: '6' }
          ]
        },
        {
          title: 'Card2',
          id: 2,
          slist: [
            {
              name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
              id: '7'
            },
            { name: 'Element7', id: '8' },
            { name: 'Element8', id: '9' },
            { name: 'Element9', id: '10' },
            { name: 'Element10', id: '11' },
            { name: 'Element11', id: '12' }
          ]
        },
        {
          title: 'Card3',
          id: 3,
          slist: [
            { name: 'Element12', id: '13' },
            { name: 'Element13', id: '14' },
            { name: 'Element14', id: '15' },
            { name: 'Element15', id: '16' },
            { name: 'Element16', id: '17' },
            { name: 'Element17', id: '18' }
          ]
        },
        {
          title: 'Card4',
          id: 4,
          slist: [
            { name: 'Element18', id: '19' },
            { name: 'Element19', id: '20' },
            { name: 'Element20', id: '21' },
            { name: 'Element21', id: '22' },
            { name: 'Element22', id: '23' },
            { name: 'Element23', id: '24' }
          ]
        },
        {
          title: 'Card5',
          id: 5,
          slist: [
            { name: 'Element24', id: '25' },
            { name: 'Element25', id: '26' },
            { name: 'Element26', id: '27' },
            { name: 'Element27', id: '28' },
            { name: 'Element28', id: '29' },
            { name: 'Element29', id: '30' }
          ]
        }
      ]
    };
  }

  listToggle = () => {
    this.setState({on: !this.state.on})
  }
  addList = () => {
    const listTitle = document.getElementById("list-title").value;
    const id = this.state.data.length + 1
    this.setState({title: listTitle})
    this.state.data.push({title: listTitle, id: id, slist:[]})
  }
  addCard = (e, index) => {
    const cardID = document.getElementById(index);
    cardID.classList.remove("card-h")
    cardID.classList.add("card-s")
    e.stopPropagation();
  }
  addCardElement = (e, index, itemID) => {
    this.state.data[index].slist.push({name: this.state.elementValue, id:""})
    this.setState({openCard: false})
    e.stopPropagation();
  }
  removeCard = (e, index) => {
    const cardID = document.getElementById(index);
    cardID.classList.remove("card-s")
    cardID.classList.add("card-h")
    e.stopPropagation();
  }
  
  render() {
    return (
      <div className='wrap'>
        <div className="add-list-card" >
          <div className="list-wrapper">
            <div className="item">
              <div className="item-header" onClick={this.listToggle}>
                + Add another list
              </div>
              {this.state.on &&
                <div className="list-cards" style={{paddingBottom: '4%'}}>
                  <div className="s-list">
                    <div className="s-item">
                      <input
                        id="list-title"
                        style={{outline: 'none', paddingLeft: '3%', width: '95%', height:'40px', paddingLeft:'3%'}} 
                        placeholder="Enter a list title"
                      ></input>
                    </div>
                  </div>
                  <button className="add-list-button" onClick={this.addList}>Add list</button>
                </div>
              }
            </div>
          </div>
        </div>
        <ReactSortable
          list={this.state.data}
          animation={300}
          delay={0}
          group={{ name: 's', pull: true }}
          className='list'
          setList={(newList) => {
            this.setState({ data: newList })
          }}>
          <>
          {this.state.data.map((item, index) => (
            <div className='list-wrapper'>
              <div className='item' key={item.id}>
                <div className='item-header'>{item.title}</div>
                <div className='list-cards'>
                  <ReactSortable
                    list={item.slist}
                    animation={300}
                    delay={2}
                    className='s-list'
                    group='shared-group-name'
                    setList={(newState, sortable, store) => {
                      console.log(newState, index)
                      const s = [...this.state.data]
                      s[index].slist = newState
                      this.setState({
                        data: s
                      })
                    }}>
                    {item.slist.map((s) => (
                      <div className='s-item' key={s.id}>
                        <span className='title'>{s.name} </span>
                      </div>
                    ))}
                  </ReactSortable>
                </div>
                <div onClick={(e)=>{this.addCard(e, item.id)}} className="add-card">
                  <div id={item.id} className="card-h">
                    <div>
                      <textarea onChange={e => this.setState({elementValue: e.target.value})} style={{width: '98%'}}></textarea>
                      <div style={{display: 'flex'}}>
                        <button onClick={(e) => this.addCardElement(e, index, item.id)} className="add-card-button">ADD CARD</button>
                        <div style={{width:'2%'}}></div>
                        <button onClick={(e) => {return this.removeCard(e, item.id)}} style={{cursor: 'pointer'}}>Cancel</button>
                      </div>
                    </div>
                  </div>
                  <div>+ Add a card</div>
                </div>
              </div>
            </div>
          ))}
          </>
        </ReactSortable>
      </div>
    )
  }
}

export default Card
