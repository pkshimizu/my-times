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
      const createdItems = response.data
        .filter(item => dayjs(item.created_at).format('YYYY-MM-DD') === date)
      const closedItems = response.data
        .filter(item => dayjs(item.closed_at).format('YYYY-MM-DD') === date)
      activities.push(
        ...createdItems.map(item => ({
          id: String(item.id),
          url: item.html_url,
          service: 'github' as ServiceName,
          type: 'issue_open' as ActivityType,
          description: item.title,
          user: item.user ? {
            login: item.user.login,
            name: item.user.login,
            avatarUrl: item.user.avatar_url
          } : undefined,
          createdAt: item.created_at
        }))
      )
      activities.push(
        ...closedItems.map(item => ({
          id: String(item.id),
          url: item.html_url,
          service: 'github' as ServiceName,
          type: 'issue_closed' as ActivityType,
          description: item.title,
          user: item.user ? {
            login: item.user.login,
            name: item.user.login,
            avatarUrl: item.user.avatar_url
          } : undefined,
          createdAt: item.closed_at!
        }))
      )
    }

    return activities
  }
  async findPullRequests(date: string) {
    const owner = this.owner()
    const repos = this.pullRequestRepositories()
    const datetime = `${date}T00:00:00+09:00`
    const activities: Activity[] = []
    if (owner) {
      for (const repo of repos) {
        const response = await this.client().rest.pulls.list({
          owner: owner,
          repo: repo,
          since: datetime,
          state: 'all',
          per_page: 100,
          sort: 'created',
          direction: 'desc'
        })
        const items = response.data
        const createdItems = items
          .filter(item => dayjs(item.created_at).format('YYYY-MM-DD') === date)
        const mergedItems = items
          .filter(item => dayjs(item.merged_at).format('YYYY-MM-DD') === date)
        const closedItems = items
          .filter(item => dayjs(item.closed_at).format('YYYY-MM-DD') === date)
        activities.push(
          ...createdItems.map(item => ({
            id: String(item.id),
            url: item.html_url,
            service: 'github' as ServiceName,
            type: 'pull_request_open' as ActivityType,
            description: item.title,
            user: item.user ? {
              login: item.user.login,
              name: item.user.login,
              avatarUrl: item.user.avatar_url
            } : undefined,
            createdAt: item.created_at
          }))
        )
        activities.push(
          ...mergedItems.map(item => ({
            id: String(item.id),
            url: item.html_url,
            service: 'github' as ServiceName,
            type: 'pull_request_merged' as ActivityType,
            description: item.title,
            user: item.user ? {
              login: item.user.login,
              name: item.user.login,
              avatarUrl: item.user.avatar_url
            } : undefined,
            createdAt: item.merged_at!
          }))
        )
        activities.push(
          ...closedItems.map(item => ({
            id: String(item.id),
            url: item.html_url,
            service: 'github' as ServiceName,
            type: 'pull_request_closed' as ActivityType,
            description: item.title,
            user: item.user ? {
              login: item.user.login,
              name: item.user.login,
              avatarUrl: item.user.avatar_url
            } : undefined,
            createdAt: item.closed_at!
          }))
        )
      }
    }
    return activities
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
  pullRequestRepositories(): string[] {
    const repositories = localStorage.getItem("my-times:github:pull-request-repository")
    return repositories?.split(",") ?? []
  }
  client() {
    const token = localStorage.getItem("my-times:github:token")
    return new Octokit({
      auth: token,
    });
  }
}