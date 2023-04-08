type ServiceName = "github" | "slack"

type ActivityUser = {
  name: string
  imageUrl: string
}

type Activity = {
  id: string
  service: ServiceName
  user: ActivityUser
  description: string
  createdAt: string
}

type ActivityHistory = {
  previous?: Activity
  current: Activity
  next?: Activity
}
