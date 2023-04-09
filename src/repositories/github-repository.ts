import {Octokit} from "octokit";
import dayjs from "dayjs";

export class GitHubRepository {
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
        .sort((item1, item2) => dayjs(item1.created_at).isAfter(dayjs(item2.created_at)) ? 1 : -1)
      activities.push(
        ...items.map(item => ({
          id: String(item.id),
          service: 'github' as ServiceName,
          type: 'create_issue' as ActivityType,
          description: item.title,
          user: item.user ? {
            name: item.user.login,
            imageUrl: item.user.avatar_url
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