const ProjectItem = props => {
  const {eachProject} = props
  const {name, imageUrl} = eachProject
  return (
    <li>
      <p>{name}</p>
      <img src={imageUrl} alt={name} />
    </li>
  )
}

export default ProjectItem
