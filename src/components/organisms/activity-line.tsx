import ActivityCard from "@/components/molecules/activity-card";
import Flex from "@/components/atoms/layouts/flex";
import {GitHubRepository} from "@/repositories/github-repository";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import Loading from "@/components/atoms/feedback/loading";
import {SlackRepository} from "@/repositories/slack-repository";

type ActivityLineProps = {
  date?: string
}

export default function ActivityLine({date}: ActivityLineProps) {
  const [activityHistories, setActivityHistories] = useState<ActivityHistory[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if (date) {
      setLoading(true)
      setActivityHistories([])
      const activities: Activity[] = []
      const githubRepository = new GitHubRepository()
      const slackRepository = new SlackRepository()
      const promises: Promise<any>[] = []
      githubRepository.getUser().then(user => {
        const authenticationUser = user
        promises.push(githubRepository.findIssues(date).then(issueActivities => {
          activities.push(...issueActivities.filter(activity => activity.user?.login === authenticationUser.login))
        }))
        promises.push(githubRepository.findPullRequests(date).then(pullRequestActivities => {
          activities.push(...pullRequestActivities.filter(activity => activity.user?.login === authenticationUser.login))
        }))
        promises.push(slackRepository.findMessages(date).then(messageActivities => {
          activities.push(...messageActivities)
        }))
        Promise.allSettled(promises).then(() => {
          setActivityHistories(
            activities
              .sort((activity1, activity2) => dayjs(activity1.createdAt).isAfter(dayjs(activity2.createdAt)) ? 1 : -1)
              .map(activity => ({
                current: activity
              }))
          )
          setLoading(false)
        })
      })
    }
  }, [date, setActivityHistories])
  if (loading) {
    return <Loading />
  }
  return (
    <>
      {activityHistories.map(history => (
        <Flex row gap={4} key={history.current.id}>
          {history.previous ? (
            <ActivityCard activity={history.previous} />
          ) : (
            <div style={{width: '360px'}}></div>
          )}
          <ActivityCard activity={history.current} />
          {history.next ? (
            <ActivityCard activity={history.next} />
          ) : (
            <div style={{width: '360px'}}></div>
          )}
        </Flex>
      ))}
    </>
  )
}