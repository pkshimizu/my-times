import {Octokit} from "octokit";
import dayjs from "dayjs";

export class GitHubRepository {
  async getUser(): Promise<ActivityUser> {
    const response = await this.client().rest.users.getAuthenticated()
    return {
      login: response.data.login,
      name: response.data.name ?? "",
      avatarUrl: response.data.avatar_url
    }
  }
  async findIssues(date: string) {
    const owner = this.owner()
    const issueRepository = this.issueRepository()
    const activities: Activity[] = []
    const datetime = `${date}T00:00:00+09:00`
    if (owner && issueRepository) {
      const response = await this.client().rest.issues.listForRepo({
        owner: owner,
        repo: issueRepository,
        since: datetime,
        per_page: 100,
        state: 'all',
        sort: 'created',
      })
      const items = response.data
        .filter(item => dayjs(item.created_at).format('YYYY-MM-DD') === date)
      const stateToType = (state: string): ActivityType => {
        switch(state) {
          case "open":
            return "issue_open"
          case "closed":
            return "issue_closed"
          default:
            return "issue_open"
        }
      }
      activities.push(
        ...items.map(item => ({
          id: String(item.id),
          service: 'github' as ServiceName,
          type: stateToType(item.state),
          description: item.title,
          user: item.user ? {
            login: item.user.login,
            name: item.user.login,
            avatarUrl: item.user.avatar_url
          } : undefined,
          createdAt: item.created_at
        }))
      )
    }

    return activities
  }
  findPullRequests(date: string) {

  }
  findComments(date: string) {

  }
  findCommits(date: string) {

  }
  owner() {
    return localStorage.getItem("my-times:github:owner")
  }
  issueRepository() {
    return localStorage.getItem("my-times:github:issue-repository")
  }
  client() {
    const token = localStorage.getItem("my-times:github:token")
    return new Octokit({
      auth: token,
    });
  }
}