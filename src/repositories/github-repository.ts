import {Octokit} from "octokit";

export class GitHubRepository {
  async findIssues(date: string) {
    const activities: Activity[] = []
    const response = await this.client().rest.issues.list({
      since: date,
      per_page: 100,
      state: 'all'
    })
    activities.push(
      ...response.data.map(item => ({
        id: String(item.id),
        service: 'github' as ServiceName,
        description: item.title,
        user: item.user ? {
          name: item.user.login,
          imageUrl: item.user.avatar_url
        } : undefined,
        createdAt: item.created_at
      }))
    )

    return activities
  }
  findPullRequests(date: string) {

  }
  findComments(date: string) {

  }
  findCommits(date: string) {

  }
  client() {
    const token = localStorage.getItem("my-times:github:token")
    return new Octokit({
      auth: token,
    });
  }
}