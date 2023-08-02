import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectItem from '../ProjectItem'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class App extends Component {
  state = {
    selectedCategory: categoriesList[0].id,
    projectsList: [],
    isLoading: false,
    isFailure: false,
  }

  componentDidMount() {
    this.fetchProjectsData()
  }

  fetchProjectsData = () => {
    const {selectedCategory} = this.state
    this.setState({isLoading: true})

    const projectsApiUrl = `https://apis.ccbp.in/ps/projects?category=${selectedCategory}`
    const options = {
      method: 'GET',
    }

    fetch(projectsApiUrl, options)
      .then(response => response.json())
      .then(data => {
        const fetchedData = data.projects
        const updatedData = fetchedData.map(project => ({
          id: project.id,
          name: project.name,
          imageUrl: project.image_url,
        }))
        this.setState({projectsList: updatedData, isLoading: false})
      })
      .catch(err => {
        console.log(err)
        this.setState({isFailure: true, isLoading: false})
      })
  }

  onChangeCategory = e => {
    const selectedCategory = e.target.value
    this.setState({selectedCategory}, () => {
      this.fetchProjectsData()
    })
  }

  onClickRetryBtn = () => {
    this.fetchProjectsData()
  }

  render() {
    const {projectsList, isLoading, isFailure} = this.state

    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
          alt="website logo"
        />
        <select onChange={this.onChangeCategory}>
          {categoriesList.map(({id, displayText}) => (
            <option key={id} value={id}>
              {displayText}
            </option>
          ))}
        </select>
        {isFailure && (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button type="button" onClick={this.onClickRetryBtn}>
              Retry
            </button>
          </div>
        )}
        {!isFailure && isLoading ? (
          <div data-testid="loader">
            <Loader />
          </div>
        ) : (
          !isFailure && (
            <ul>
              {projectsList.map(eachItem => (
                <ProjectItem key={eachItem.id} eachProject={eachItem} />
              ))}
            </ul>
          )
        )}
      </div>
    )
  }
}

export default App
