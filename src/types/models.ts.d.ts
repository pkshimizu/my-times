type ServiceName = "github" | "slack"
type ActivityType = "create_issue" | "issue_comment" | 'pull_request' | 'review' | 'commit'

type ActivityUser = {
  name: string
  imageUrl: string
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
