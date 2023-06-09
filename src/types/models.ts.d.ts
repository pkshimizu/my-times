type ServiceName = "github" | "slack"
type ActivityType =
  | "issue_open"
  | "issue_closed"
  | "issue_comment"
  | 'pull_request_open'
  | 'pull_request_merged'
  | 'pull_request_closed'
  | 'review'
  | 'commit'
  | 'message_post'

type ActivityUser = {
  login: string
  name: string
  avatarUrl: string
}

type Activity = {
  id: string
  url: string
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

