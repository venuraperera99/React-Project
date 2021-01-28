//import { ReactComponent } from '*.svg';
import React from "react"
import './App.css';
import axios from 'axios'


class App extends React.Component {
    constructor(){
      super()

      this.state = {
        persons: []
      }
      
      this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount(){
      //this.getData()
    }

    handleClick () {
      //this.getSchools();
      const firstname = document.getElementById("firstnameinput").value;
      const lastname = document.getElementById("lastnameinput").value;
      const schoolcode = document.getElementById("schoolinput").value;
      if(firstname !== "" && lastname !== "" && schoolcode !== ""){
        this.getTeachers();
        //this.registerTeacher(firstname, lastname, schoolcode);
        //this.getSchools(firstname, lastname, schoolcode);
      }
    }

    getData(){
        axios.get(`https://jsonplaceholder.typicode.com/users`)
          .then(res => {
            const persons = res.data;
            this.setState({persons});
          })
    }

    getTeachers(){
      axios.get('http://squigglepark-fullstack-project.us-east-1.elasticbeanstalk.com/api/teachers', {
        headers: {
          'Authorization': '​tf8P1869GRk2LVNej6YftLl95XNeWbFF'
        }
      })
      .then(res => {
        const persons = res.data;
        this.setState({persons});
      })
      //console.log(this.state.persons)
    }

    async registerTeacher(fn, ln, sc){
      const response = await axios.post(
        'http://squigglepark-fullstack-project.us-east-1.elasticbeanstalk.com/api/teachers',
        { firstName: fn , lastName: ln, schoolCode: sc},
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log(response.data)

    }

    getSchools(fn, ln, sc) {
      // create a new XMLHttpRequest
      var xhr = new XMLHttpRequest()
  
      // get a callback when the server responds
      xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
      })
      // open the request with the verb and the url
      
      xhr.open('POST', 'http://squigglepark-fullstack-project.us-east-1.elasticbeanstalk.com/api/teachers')
      xhr.setRequestHeader('Authorization','tf8P1869GRk2LVNej6YftLl95XNeWbFF')
      // send the request
      xhr.send(JSON.stringify({ firstName: fn , lastName: ln, schoolCode: sc}))
    }

    render() {
      return (
        <div id='main'>
          <form>
            <input name="firstname" type="text" id="firstnameinput" placeholder="First Name"/>
            <input name="lastname" type="text" id="lastnameinput" placeholder="Last Name"/>
            <input name="school" type="text" id="schoolinput" placeholder="School Code"/>
          </form>
          <div className='button__container'>
            <button className='button' onClick={this.handleClick}>
              Register
            </button>
          </div>
          <p>------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
          <div id='page2'>
            <h4>List Format: FirstName | LastName | SchoolCode</h4>
            <ul>
                { this.state.persons.map(person => <li>{person.name}, {person.username}, </li>)}
            </ul>
          </div>
        </div>
        
      );
    }
}

export default App;
