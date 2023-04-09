type ServiceName = "github" | "slack"
type ActivityType = "issue_open" | "issue_closed" | "issue_comment" | 'pull_request' | 'review' | 'commit'

type ActivityUser = {
  login: string
  name: string
  avatarUrl: string
}

type Activity = {
  id: string
  service: ServiceName
  type: ActivityType
  user?: ActivityUser
  description: string
  createdAt: string
}

type ActivityHistory = {
  previous?: Activity
  current: Activity
  next?: Activity
}

