import dayjs from "dayjs";

export class SlackRepository {
  async findMessages(date: string): Promise<Activity[]> {
    const userId = this.userId()
    const before = dayjs(date).add(1, 'd').format('YYYY-MM-DD')
    const after = dayjs(date).subtract(1, 'd').format('YYYY-MM-DD')
    const token = localStorage.getItem("my-times:slack:token") ?? ""
    const imageUrl = localStorage.getItem("my-times:slack:image-url") ?? ""

    const response = await this.get(
      "/search.messages",
      `token=${token}&query=from: ${userId} before: ${before} after: ${after}`)

    const data = response as {
      ok: boolean
      messages: {
        matches: {
          iid: string
          permalink: string
          user: string
          username: string
          text: string
          ts: number
        }[]
      }
    }

    if (data.ok) {
      console.log(data.messages)
      return data.messages.matches.map(item => ({
        id: item.iid,
        url: item.permalink,
        service: "slack" as ServiceName,
        type: "message_post" as ActivityType,
        user: {
          login: item.user,
          name: item.username,
          avatarUrl: imageUrl
        },
        description: item.text,
        createdAt: dayjs(item.ts * 1000).format('YYYY-MM-DD HH:mm:ss')
      }))
    }
    return []
  }

  async get(path: string, data: string) {
    return new Promise((resolve) => {
      const request = new XMLHttpRequest();
      request.onload = () => {
        resolve(JSON.parse(request.response))
      }
      request.open('POST', `https://slack.com/api${path}`, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      request.send(data);
    })
  }

  userId() {
    return localStorage.getItem("my-times:slack:user-id") ?? ""
  }
}