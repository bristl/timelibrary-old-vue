// Helped class for Task
export default class Task {
  constructor (
    title,
    description,
    whatWatch,
    time,
    tags,
    completed,
    editing,
    date,
    contryShip,
    contryDel,
    cityDel,
    name,
    surname,
    weight,
    user = null,
    id = null
  ) {
    this.title = title
    this.description = description
    this.whatWatch = whatWatch
    this.time = time
    this.tags = tags
    this.completed = completed
    this.editing = editing
    this.date = date
    this.contryShip = contryShip
    this.contryDel = contryDel
    this.cityDel = cityDel
    this.name = name
    this.surname = surname
    this.weight = weight
    this.user = user
    this.id = id
  }
}
