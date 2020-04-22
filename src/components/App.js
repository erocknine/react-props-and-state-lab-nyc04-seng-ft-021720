import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  
  state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  
  onFindPetsClick = () => {
    let endpoint = '/api/pets'
    if(this.state.filters.type !== 'all') {
       endpoint += `?type=${this.state.filters.type}`
    }

    fetch(endpoint)
    .then(response => response.json())
    .then(pets => {
      this.setState({ pets: pets }, () => console.log(this.state.pets))
    })
  }

  onChangeType = (event) => {
    this.setState({ filters: {...this.state.filters, type: event.target.value}})
  }

  onAdoptPet = (updatedPet) => {
    updatedPet.isAdopted = "true"
    console.log(updatedPet.isAdopted)
    const updatedPets = this.state.pets.map(pet => {
      if (pet.id === updatedPet.id) {
        return updatedPet
      } else {
        return pet
      }
    })
    this.setState({ pets: updatedPets })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
                />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
